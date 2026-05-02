import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { useState } from "react";
import { IntroFloorArc } from "@/components/decor/IntroFloorArc";
import { BirthdayCelebration } from "@/components/intro/BirthdayCelebration";
import { BirthdayCountdown } from "@/components/intro/BirthdayCountdown";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

type Props = {
  onBegin: () => void;
};

type Phase = "welcome" | "countdown" | "celebration";

const lineParent = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.4 },
  },
};

const lineChild = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function IntroGate({ onBegin }: Props) {
  const [phase, setPhase] = useState<Phase>("welcome");

  return (
    <motion.section
      className="relative z-10 flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-void px-6 py-16 md:px-12"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.85, ease: [0.32, 0.72, 0, 1] },
      }}
    >
      <GrainOverlay />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(232,180,188,0.12),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1/4 top-1/4 h-[60vmin] w-[60vmin] rounded-full bg-[radial-gradient(circle,rgba(201,138,150,0.12)_0%,transparent_65%)]"
      />
      {phase === "countdown" ? (
        <BirthdayCountdown onComplete={() => setPhase("celebration")} />
      ) : null}
      {phase === "celebration" ? (
        <BirthdayCelebration onContinue={onBegin} />
      ) : null}

      {phase === "welcome" ? (
      <div className="relative mx-auto w-full max-w-4xl">
        <IntroFloorArc />
        <motion.p
          className="mb-6 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-rose-soft/90"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          3 mai
        </motion.p>

        <motion.div variants={lineParent} initial="hidden" animate="show">
          <motion.h1
            variants={lineChild}
            className="font-display text-[clamp(2.75rem,9vw,5.5rem)] font-normal leading-[0.95] tracking-tight text-mist"
          >
            Une surprise
          </motion.h1>
          <motion.h1
            variants={lineChild}
            className="mt-2 font-display text-[clamp(2.75rem,9vw,5.5rem)] font-normal italic leading-[0.95] tracking-tight text-rose-soft"
          >
            t&apos;attend
          </motion.h1>
        </motion.div>

        <motion.p
          className="mt-10 max-w-[52ch] font-sans text-base leading-relaxed text-white/55"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Quelques souvenirs et un mot pour ton anniversaire. Quand tu es prête,
          ouvre la surprise.
        </motion.p>

        <motion.div
          className="mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            type="button"
            onClick={() => setPhase("countdown")}
            className="group inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.06] px-7 py-3.5 font-sans text-sm font-medium tracking-wide text-mist shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/[0.1] active:scale-[0.98]"
          >
            <span>Commencer</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105">
              <ArrowRight className="h-4 w-4 text-rose-soft" weight="regular" />
            </span>
          </button>
        </motion.div>
      </div>
      ) : null}
    </motion.section>
  );
}
