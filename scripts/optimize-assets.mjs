/**
 * Optimise les médias dans /assets pour le déploiement :
 * - JPEG → WebP (qualité ~82, effort 6)
 * - MP4 → H.264 CRF 28, largeur max 1280px, sans piste audio (hero en muted)
 *
 * Usage : npm run optimize-assets
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { rename as renameAsync, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import ffmpegPath from "ffmpeg-static";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const assetsDir = path.join(root, "assets");

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} Ko`;
}

function runFfmpeg(args) {
  if (!ffmpegPath || !existsSync(ffmpegPath)) {
    throw new Error("ffmpeg-static introuvable. Lance npm install.");
  }
  return new Promise((resolve, reject) => {
    const child = spawn(ffmpegPath, args, {
      stdio: ["ignore", "inherit", "inherit"],
      cwd: assetsDir,
    });
    child.on("error", reject);
    child.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`ffmpeg exit ${code}`)),
    );
  });
}

async function optimizeImages() {
  const { readdir, stat } = await import("node:fs/promises");
  const files = await readdir(assetsDir);
  const jpegs = files.filter((f) => /\.jpe?g$/i.test(f));

  for (const file of jpegs) {
    const input = path.join(assetsDir, file);
    const base = file.replace(/\.jpe?g$/i, "");
    const output = path.join(assetsDir, `${base}.webp`);
    const before = (await stat(input)).size;

    let pipeline = sharp(input).webp({
      quality: 82,
      effort: 6,
      smartSubsample: true,
    });
    await pipeline.toFile(`${output}.tmp`);
    let after = (await stat(`${output}.tmp`)).size;

    // Si WebP est plus lourd, réessayer en qualité plus basse (photos très détaillées)
    if (after >= before) {
      await sharp(input)
        .webp({ quality: 72, effort: 6, smartSubsample: true })
        .toFile(`${output}.tmp`);
      after = (await stat(`${output}.tmp`)).size;
    }

    await renameAsync(`${output}.tmp`, output);
    await unlink(input);
    console.log(
      `[img] ${file} → ${base}.webp  ${formatKb(before)} → ${formatKb(after)} (${(((1 - after / before) * 100).toFixed(1))}% économisé)`,
    );
  }
}

async function optimizeVideos() {
  const { readdir, stat } = await import("node:fs/promises");
  const files = await readdir(assetsDir);
  const mp4s = files.filter((f) => f.endsWith(".mp4"));

  for (const file of mp4s) {
    const inputPath = path.join(assetsDir, file);
    const tmpPath = path.join(assetsDir, `.optim-${file.replace(/\s/g, "_")}.mp4`);
    const before = (await stat(inputPath)).size;

    await runFfmpeg([
      "-hide_banner",
      "-loglevel",
      "error",
      "-y",
      "-i",
      inputPath,
      "-an",
      "-vf",
      "scale=min(1280\\,iw):-2",
      "-c:v",
      "libx264",
      "-crf",
      "28",
      "-preset",
      "medium",
      "-movflags",
      "+faststart",
      "-pix_fmt",
      "yuv420p",
      tmpPath,
    ]);

    const after = (await stat(tmpPath)).size;
    await unlink(inputPath);
    await renameAsync(tmpPath, inputPath);
    console.log(
      `[vid] ${file}  ${formatKb(before)} → ${formatKb(after)} (${(((1 - after / before) * 100).toFixed(1))}% économisé)`,
    );
  }
}

async function main() {
  console.log("Optimisation des assets dans", assetsDir, "\n");
  await optimizeImages();
  await optimizeVideos();
  console.log("\nTerminé. Pense à vérifier media.ts (imports .webp) puis npm run build.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
