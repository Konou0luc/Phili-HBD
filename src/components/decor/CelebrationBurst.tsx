import { motion, useReducedMotion } from "framer-motion";

const N = 22;

/** Confettis légers : petits carrés arrondis, trajectoires courtes — GPU-friendly */
export function CelebrationBurst() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 -top-16 bottom-0 overflow-visible md:-top-24"
    >
      {Array.from({ length: N }, (_, i) => {
        const left = `${(i * 47 + 13) % 92}%`;
        const delay = i * 0.045;
        const hue = i % 3 === 0 ? "bg-rose-soft/45" : i % 3 === 1 ? "bg-white/50" : "bg-rose-glow/35";
        const w = i % 4 === 0 ? "w-2 h-3" : "w-2.5 h-2";
        return (
          <motion.span
            key={i}
            className={`absolute bottom-[20%] rounded-sm ${hue} ${w}`}
            style={{ left }}
            initial={{ opacity: 0, y: 0, rotate: 0 }}
            whileInView={{
              opacity: [0, 1, 1, 0],
              y: [0, -28 - (i % 8) * 10, -55 - (i % 6) * 8],
              rotate: [0, (i % 2 === 0 ? 1 : -1) * (45 + (i % 5) * 12)],
            }}
            transition={{
              duration: 2.4,
              delay,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.15, 0.75, 1],
            }}
            viewport={{ once: true, amount: 0.3 }}
          />
        );
      })}
    </div>
  );
}
