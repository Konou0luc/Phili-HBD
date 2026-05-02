import { motion } from "framer-motion";
import { LetterDecor } from "@/components/decor/LetterDecor";

export function LetterSection() {
  return (
    <div className="relative mx-auto max-w-[820px] overflow-visible">
      <LetterDecor />
      <motion.div
        className="rounded-[2rem] border border-zinc-300/45 bg-white/65 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] md:p-14"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-rose-glow">
          Petit mot
        </p>
        <p className="mt-10 font-display text-[clamp(1.45rem,3.5vw,2.15rem)] leading-[1.5] italic text-zinc-900">
          Philippine, pour ton anniversaire je voulais te dire les choses comme je
          les dirais en vrai : merci d’être là, merci pour nous. Ce petit recueil,
          ce sont nos souvenirs — pas plus, pas moins — et ils me suffisent
          pour te souhaiter une belle journée et une belle année avec moi.
        </p>
        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-zinc-400/45 to-transparent" />
        <p className="mt-8 font-sans text-sm leading-relaxed text-zinc-600">
          Si plus tard on en ajoute d’autres ensemble, on les rangera au même endroit.
        </p>
      </motion.div>
    </div>
  );
}
