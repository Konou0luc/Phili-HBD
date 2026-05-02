import { motion } from "framer-motion";

/** Courbe douce sous la zone de lecture — respiration visuelle */
export function IntroFloorArc() {
  return (
    <motion.svg
      aria-hidden
      className="pointer-events-none absolute bottom-[14%] left-1/2 h-16 w-[min(90vw,420px)] -translate-x-1/2 text-rose-soft/35 md:bottom-[18%]"
      viewBox="0 0 400 60"
      fill="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      <motion.path
        d="M 0 45 Q 200 -5 400 45"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
      />
    </motion.svg>
  );
}
