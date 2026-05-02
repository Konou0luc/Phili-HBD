import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import type { GalleryImage } from "@/types/media";

type Props = {
  images: readonly GalleryImage[];
  index: number;
  open: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function GalleryLightbox({
  images,
  index,
  open,
  onClose,
  onIndexChange,
}: Props) {
  const goPrev = useCallback(() => {
    if (images.length === 0) return;
    onIndexChange((index - 1 + images.length) % images.length);
  }, [images.length, index, onIndexChange]);

  const goNext = useCallback(() => {
    if (images.length === 0) return;
    onIndexChange((index + 1) % images.length);
  }, [images.length, index, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose, goPrev, goNext]);

  const current = images[index];

  const modal =
    open && current ? (
        <motion.div
          role="dialog"
          aria-modal
          aria-label="Aperçu photo"
          className="fixed inset-0 z-[100] flex flex-col bg-black/88 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={onClose}
        >
          <div className="flex items-center justify-between px-4 py-4 md:px-6">
            <p className="font-sans text-xs tabular-nums text-white/55">
              {index + 1} / {images.length}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Fermer"
            >
              <X className="h-6 w-6" weight="regular" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-2 pb-6 pt-2 md:px-10 md:pb-16">
            <button
              type="button"
              aria-label="Photo précédente"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-1 top-1/2 z-10 flex -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-2.5 text-white md:left-4 md:p-3"
            >
              <CaretLeft className="h-5 w-5 md:h-6 md:w-6" weight="regular" />
            </button>

            <motion.div
              key={current.id}
              className="relative flex max-h-[min(74vh,780px)] w-full max-w-4xl touch-pan-y items-center justify-center px-10 md:px-14"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.14}
              onDragEnd={(_, info) => {
                const t = info.offset.x;
                if (t < -64) goNext();
                else if (t > 64) goPrev();
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={current.src}
                alt={current.alt}
                className="max-h-[min(74vh,780px)] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                initial={{ opacity: 0.88, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                draggable={false}
              />
            </motion.div>

            <button
              type="button"
              aria-label="Photo suivante"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-1 top-1/2 z-10 flex -translate-y-1/2 rounded-full border border-white/15 bg-white/10 p-2.5 text-white md:right-4 md:p-3"
            >
              <CaretRight className="h-5 w-5 md:h-6 md:w-6" weight="regular" />
            </button>
          </div>

          <p className="pb-[max(1rem,env(safe-area-inset-bottom))] text-center font-sans text-[11px] text-white/45 md:hidden">
            Glisse gauche ou droite pour défiler
          </p>
        </motion.div>
    ) : null;

  return createPortal(
    <AnimatePresence mode="wait">{modal}</AnimatePresence>,
    document.body,
  );
}
