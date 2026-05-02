import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

type Props = {
  onComplete: () => void;
};

const ease = [0.16, 1, 0.3, 1] as const;

export function BirthdayCountdown({ onComplete }: Props) {
  const reduce = useReducedMotion();
  const tickMs = reduce ? 350 : 950;
  const ringDuration = (11 * tickMs) / 1000;
  const [value, setValue] = useState(10);

  useEffect(() => {
    if (value < 0) return;
    const t = window.setTimeout(() => {
      if (value === 0) {
        onComplete();
        setValue(-1);
        return;
      }
      setValue((v) => v - 1);
    }, tickMs);
    return () => clearTimeout(t);
  }, [value, onComplete, tickMs]);

  const display = value >= 0 ? value : null;

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-atomic
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-void"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease }}
    >
      <GrainOverlay fixed />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_45%,rgba(232,180,188,0.2),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(120vw,720px)] w-[min(120vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,138,150,0.14)_0%,transparent_55%)]"
      />

      <div className="relative flex h-[min(42vw,280px)] w-full max-w-2xl items-center justify-center px-6">
        <svg
          className="pointer-events-none absolute inset-0 m-auto h-full w-full max-w-[min(90vw,320px)] text-rose-soft/20"
          viewBox="0 0 200 200"
          aria-hidden
        >
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.35"
          />
          <motion.circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="url(#cdGrad)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeDasharray={552.9}
            initial={{ strokeDashoffset: 552.9 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: ringDuration, ease: "linear" }}
            style={{ transform: "rotate(-90deg)", transformOrigin: "100px 100px" }}
          />
          <defs>
            <linearGradient id="cdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(232, 180, 188)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="rgb(201, 138, 150)" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>

        <AnimatePresence mode="popLayout">
          {display !== null && (
            <motion.span
              key={display}
              className="relative z-[1] select-none bg-gradient-to-b from-mist via-rose-soft/90 to-rose-glow/80 bg-clip-text font-display text-[min(28vw,11rem)] font-medium leading-none tabular-nums text-transparent drop-shadow-[0_0_60px_rgba(232,180,188,0.25)] md:text-[min(22vw,12rem)]"
              initial={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.5, y: 24, filter: "blur(12px)" }
              }
              animate={
                reduce
                  ? { opacity: 1 }
                  : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
              }
              exit={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 1.2, y: -20, filter: "blur(8px)" }
              }
              transition={{ duration: reduce ? 0.2 : 0.45, ease }}
            >
              {display}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-10 font-sans text-[10px] uppercase tracking-[0.35em] text-white/40">
        Presque…
      </p>

    </motion.div>
  );
}
