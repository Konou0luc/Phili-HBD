import { motion } from "framer-motion";
import { useState } from "react";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import type { GalleryImage } from "@/types/media";

type Props = {
  images: readonly GalleryImage[];
  /** Ancre pour navigation landing (#moments) */
  id?: string;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export function GalleryStrip({ images, id }: Props) {
  const [first, ...rest] = images;
  const [second, third, ...bottom] = rest;

  const ordered = images;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  function openAt(i: number) {
    setLightboxIndex(i);
    setLightboxOpen(true);
  }

  if (!first) {
    return null;
  }

  return (
    <>
      <section
        id={id}
        className="relative z-10 scroll-mt-24 px-6 py-20 md:px-12 md:py-32 lg:py-40"
      >
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-400/35 to-transparent" />

        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <motion.p
                className="mb-4 font-sans text-[10px] uppercase tracking-[0.28em] text-rose-glow"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                Nos photos
              </motion.p>
              <motion.h3
                className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] text-zinc-900"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.85,
                  delay: 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Tout ce que j’ai rassemblé
                <span className="block font-display italic text-rose-glow">
                  pour toi
                </span>
              </motion.h3>
            </div>
            <motion.p
              className="max-w-[36ch] font-sans text-sm leading-relaxed text-zinc-600 md:text-right"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              Tu touches une image pour la voir en grand ; tu peux passer de l’une à
              l’autre comme dans un album.
            </motion.p>
          </div>

          <motion.div
            className="mt-16 md:mt-24"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-5 md:gap-y-6">
              <motion.article
                variants={item}
                className="group md:col-span-7 md:row-span-2"
              >
                <GalleryCard
                  img={first}
                  index={1}
                  listIndex={0}
                  onOpen={() => openAt(0)}
                  tall
                />
              </motion.article>

              {second ? (
                <motion.article variants={item} className="md:col-span-5">
                  <GalleryCard
                    img={second}
                    index={2}
                    listIndex={1}
                    onOpen={() => openAt(1)}
                  />
                </motion.article>
              ) : null}
              {third ? (
                <motion.article variants={item} className="md:col-span-5">
                  <GalleryCard
                    img={third}
                    index={3}
                    listIndex={2}
                    onOpen={() => openAt(2)}
                  />
                </motion.article>
              ) : null}

              {bottom.map((img, i) => {
                const wideBottom = bottom.length === 2;
                const listIndex = i + 3;
                return (
                  <motion.article
                    key={img.id}
                    variants={item}
                    className={wideBottom ? "md:col-span-6" : "md:col-span-4"}
                  >
                    <GalleryCard
                      img={img}
                      index={i + 4}
                      listIndex={listIndex}
                      onOpen={() => openAt(listIndex)}
                    />
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      <GalleryLightbox
        images={ordered}
        index={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
}

function GalleryCard({
  img,
  index,
  listIndex,
  onOpen,
  tall,
}: {
  img: GalleryImage;
  index: number;
  listIndex: number;
  onOpen: () => void;
  tall?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Agrandir la photo ${listIndex + 1}`}
      className={`gallery-card-shell w-full rounded-[2rem] border border-zinc-300/50 bg-white/55 p-2 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-[0_24px_70px_-28px_rgba(200,130,150,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-soft ${tall ? "" : ""}`}
    >
      <div className="gallery-card-inner relative overflow-hidden rounded-[calc(2rem-0.5rem)] ring-1 ring-zinc-300/40">
        <div
          className={`relative w-full overflow-hidden ${tall ? "aspect-[4/5] md:min-h-[min(72vh,560px)] md:aspect-auto" : "aspect-[4/5]"}`}
        >
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            decoding="async"
            className="gallery-img h-full w-full object-cover transition-[transform,filter] duration-[1100ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95" />
          <div className="gallery-shine pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="absolute bottom-0 left-0 right-0 flex translate-y-2 items-end justify-between gap-4 p-5 opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0 group-hover:opacity-100">
            <span className="font-display text-lg italic text-white md:text-xl">
              Aperçu
            </span>
            <span className="font-sans text-[10px] tabular-nums tracking-[0.2em] text-white/70">
              {String(index).padStart(2, "0")}
            </span>
          </div>

          <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-black/45 px-3 py-1 font-sans text-[10px] uppercase tracking-wider text-white/90 backdrop-blur-sm">
            Voir
          </span>
        </div>
      </div>
    </button>
  );
}
