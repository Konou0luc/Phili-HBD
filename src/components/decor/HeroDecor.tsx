import { motion, useReducedMotion } from "framer-motion";

/**
 * Lignes organiques + halos discrets — uniquement transform/opacity en anim (perf).
 */
export function HeroDecor() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[3] overflow-hidden"
    >
      <motion.svg
        className="absolute -right-[8%] top-[12%] h-[min(38vw,280px)] w-[min(55vw,420px)] text-rose-soft/35 md:right-0 md:top-[15%]"
        viewBox="0 0 320 200"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <motion.path
          d="M 0 160 Q 80 40 160 100 T 320 60"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        />
      </motion.svg>

      <motion.svg
        className="absolute -left-[5%] bottom-[18%] h-[min(30vw,220px)] w-[min(48vw,340px)] text-white/18 md:left-0"
        viewBox="0 0 280 180"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      >
        <motion.path
          d="M 280 120 Q 180 20 80 80 Q 40 100 0 140"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
        />
      </motion.svg>

      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-rose-soft/25"
          style={{
            width: 3 + (i % 3),
            height: 3 + (i % 3),
            left: `${12 + i * 18}%`,
            top: `${22 + (i % 4) * 12}%`,
          }}
          animate={
            reduce
              ? { opacity: 0.35, scale: 1 }
              : {
                  opacity: [0.15, 0.55, 0.15],
                  scale: [1, 1.35, 1],
                }
          }
          transition={
            reduce
              ? { duration: 0 }
              : {
                  duration: 3.2 + i * 0.4,
                  repeat: Infinity,
                  ease: [0.45, 0, 0.55, 1],
                  delay: i * 0.35,
                }
          }
        />
      ))}
    </div>
  );
}
