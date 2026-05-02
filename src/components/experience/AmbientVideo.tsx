import { motion } from "framer-motion";

type Props = {
  src: string;
  className?: string;
};

/**
 * Fond vidéo + léger « Ken Burns » (scale uniquement) pour éviter l’effet statique.
 */
export function AmbientVideo({ src, className = "" }: Props) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-[-8%] h-[116%] w-[116%] max-w-none"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.video
          className="h-full w-full object-cover"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          animate={{ scale: [1, 1.06, 1] }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: [0.45, 0, 0.55, 1],
          }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-void/85 via-void/35 to-void/92" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_55%_at_50%_18%,rgba(232,180,188,0.11),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(8,6,5,0.65)_100%)]" />
    </div>
  );
}
