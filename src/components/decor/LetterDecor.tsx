import { motion } from "framer-motion";

/** Guillemets illustrés + filet — editorial luxury */
export function LetterDecor() {
  return (
    <>
      <motion.div
        className="pointer-events-none absolute -left-2 -top-4 font-display text-[clamp(4rem,14vw,7rem)] leading-none text-rose-glow/25 md:-left-6 md:-top-8"
        initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden
      >
        «
      </motion.div>
      <motion.div
        className="pointer-events-none absolute -bottom-10 -right-2 font-display text-[clamp(4rem,14vw,7rem)] leading-none text-rose-glow/20 md:-bottom-12 md:-right-8"
        initial={{ opacity: 0, scale: 0.92, rotate: 4 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.95,
          delay: 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        aria-hidden
      >
        »
      </motion.div>
      <motion.div
        className="pointer-events-none absolute left-[12%] top-[28%] h-24 w-px bg-gradient-to-b from-rose-glow/35 to-transparent md:left-[8%]"
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{ originY: 0 }}
        aria-hidden
      />
    </>
  );
}
