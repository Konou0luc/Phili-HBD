import { Confetti } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { CelebrationBurst } from "@/components/decor/CelebrationBurst";

export function BirthdayCta() {
  return (
    <div className="relative mx-auto max-w-[920px] overflow-visible text-center">
      <CelebrationBurst />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 rounded-full border border-zinc-300/50 bg-white/60 px-4 py-2 font-sans text-[10px] uppercase tracking-[0.28em] text-rose-glow"
      >
        <Confetti className="h-4 w-4" weight="regular" />
        Le jour J
      </motion.div>

      <motion.h2
        className="mt-8 font-display text-[clamp(2.25rem,6vw,4rem)] leading-[1.05] text-zinc-900"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.85,
          delay: 0.06,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        3 mai 2026
      </motion.h2>

      <motion.p
        className="mx-auto mt-6 max-w-[42ch] font-sans text-lg leading-relaxed text-zinc-600 md:text-xl"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: 0.12,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        J’espère que ce 3 mai te ressemble : doux, lumineux, et entourée des gens que
        tu aimes. Joyeux anniversaire — avec tout ce qu’on a déjà vécu, et tout ce
        qu’il nous reste à vivre.
      </motion.p>

      <motion.div
        className="mt-14 flex justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.7 }}
      >
        <span className="h-16 w-px bg-gradient-to-b from-rose-soft via-zinc-400/60 to-transparent" />
      </motion.div>
    </div>
  );
}
