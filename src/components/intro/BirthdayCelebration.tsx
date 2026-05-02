import { Pause, Play } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { happyBirthdaySources } from "@/data/audio";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

type Props = {
  onContinue: () => void;
};

const ease = [0.16, 1, 0.3, 1] as const;

export function BirthdayCelebration({ onContinue }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [unlockHint, setUnlockHint] = useState(false);

  const syncPlaying = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    setPlaying(!a.paused);
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("ended", onPause);
    const tryPlay = () => {
      a.volume = 0.92;
      a.play()
        .then(() => {
          setUnlockHint(false);
        })
        .catch(() => {
          setUnlockHint(true);
        });
    };
    tryPlay();
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("ended", onPause);
    };
  }, []);

  function toggleMusic() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      void a.play().catch(() => setUnlockHint(true));
    } else {
      a.pause();
    }
    syncPlaying();
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-void px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.65, ease }}
    >
      <audio ref={audioRef} preload="auto" playsInline>
        {happyBirthdaySources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </audio>

      <GrainOverlay fixed />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_35%,rgba(232,180,188,0.18),transparent_58%)]"
      />

      <motion.div
        className="relative max-w-[900px] text-center"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.15, ease }}
      >
        <motion.h2
          className="font-display text-[clamp(2.25rem,8vw,4.5rem)] font-normal leading-[1.08] tracking-tight text-mist"
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2, ease }}
        >
          Joyeux anniversaire{" "}
          <span className="bg-gradient-to-r from-rose-soft via-mist to-rose-soft bg-clip-text italic text-transparent">
            Phili
          </span>
        </motion.h2>

        <motion.p
          className="mx-auto mt-8 max-w-[40ch] font-sans text-base leading-relaxed text-white/50 md:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.7 }}
        >
          Profite de ce moment — la suite t&apos;attend quand tu veux.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
        >
          {unlockHint ? (
            <button
              type="button"
              onClick={() => {
                void audioRef.current?.play().then(() => setUnlockHint(false));
              }}
              className="rounded-full border border-rose-soft/35 bg-white/[0.06] px-6 py-3 font-sans text-sm font-medium text-rose-soft shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition-colors hover:bg-white/[0.1]"
            >
              Activer la musique
            </button>
          ) : (
            <button
              type="button"
              onClick={toggleMusic}
              aria-pressed={playing}
              className="inline-flex items-center gap-3 rounded-full border border-white/14 bg-white/[0.06] px-6 py-3 font-sans text-sm font-medium tracking-wide text-mist shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-[transform,background-color] hover:bg-white/[0.1] active:scale-[0.98]"
            >
              {playing ? (
                <Pause className="h-5 w-5 text-rose-soft" weight="fill" />
              ) : (
                <Play className="h-5 w-5 text-rose-soft" weight="fill" />
              )}
              {playing ? "Pause la musique" : "Lancer la musique"}
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              audioRef.current?.pause();
              onContinue();
            }}
            className="rounded-full border border-white/12 bg-white/[0.08] px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-mist transition-[transform,background-color] hover:bg-white/[0.12] active:scale-[0.98]"
          >
            Découvrir la surprise
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
