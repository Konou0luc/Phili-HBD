import type { Variants } from "framer-motion";

/** Courbe type expo — pas de linear */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeSoft = [0.32, 0.72, 0, 1] as const;

export const fadeUpBlur: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: easeOutExpo },
  },
};

export const staggerChildren: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.06 },
  },
};

export const cardLift: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.78, ease: easeOutExpo },
  },
};
