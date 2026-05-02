import { ArrowDown } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { HeroDecor } from "@/components/decor/HeroDecor";
import { AmbientVideo } from "@/components/experience/AmbientVideo";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { useLenisScroll } from "@/context/LenisProvider";

type Props = {
  videoSrc: string;
};

/** Vidéo + grain uniquement dans cette section ; le bas fond vers le fond nuage. */
export function LandingHero({ videoSrc }: Props) {
  const { scrollTo } = useLenisScroll();

  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-void pb-14 pt-24 md:pb-24 md:pt-28 lg:pb-28"
    >
      <div className="absolute inset-0 z-0">
        <AmbientVideo src={videoSrc} />
      </div>
      <GrainOverlay />
      <HeroDecor />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-40 bg-gradient-to-t from-cloud via-cloud/70 to-transparent md:h-48"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col px-6 md:px-10 lg:px-12">
        <motion.p
          className="mb-6 inline-flex w-fit rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-rose-soft"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          Ton anniversaire · 3 mai 2026
        </motion.p>

        <motion.h1
          className="max-w-[20ch] font-display text-[clamp(3rem,11vw,6rem)] font-normal leading-[0.94] tracking-tight text-mist"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.95,
            delay: 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          Il n’y a que nos souvenirs.
        </motion.h1>

        <motion.p
          className="mt-8 max-w-[48ch] font-sans text-lg leading-relaxed text-white/58 md:text-xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.85,
            delay: 0.18,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          Pas une liste sans fin : nous, les photos que j’ai réussi à rassembler,
          et un mot pour ton anniversaire. Pour ce jour-là, je voulais te montrer
          uniquement nos souvenirs — rien de plus.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.85,
            delay: 0.28,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <button
            type="button"
            onClick={() => scrollTo("#fil")}
            className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/14 bg-white/[0.08] px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-mist shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/[0.12] active:scale-[0.98]"
          >
            La suite pour toi
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-1">
              <ArrowDown className="h-4 w-4 text-rose-soft" weight="regular" />
            </span>
          </button>
          <button
            type="button"
            onClick={() => scrollTo("#moments")}
            className="font-sans text-sm text-white/45 underline-offset-8 transition-colors duration-300 hover:text-white/75"
          >
            Voir nos photos
          </button>
        </motion.div>

        <motion.div
          className="mt-12 flex items-center gap-3 md:mt-20 lg:mt-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-white/35">
            Encore un peu plus bas pour le reste
          </span>
          <span className="h-px w-12 bg-gradient-to-r from-white/25 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
