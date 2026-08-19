import { motion, useReducedMotion } from "framer-motion";
import { wedding } from "../config";

type Props = {
  visible: boolean;
  onBegin: () => void;
  onSkip: () => void;
};

export default function CoverGate({ visible, onBegin, onSkip }: Props) {
  const reduce = useReducedMotion();
  if (!visible) return null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation cover"
      className="fixed inset-0 z-[70] overflow-hidden bg-ivory-paper"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src="./assets/layers/cover-welcome.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ivory-paper/45 via-ivory-paper/15 to-ivory-paper/55" />
      <div className="paper-grain absolute inset-0 opacity-40" />

      <div className="relative z-10 flex h-full flex-col items-center px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(2.5rem,env(safe-area-inset-top))]">
        <div className="flex flex-1 flex-col items-center justify-center gap-7 text-center">
          <div className="flex flex-col items-center gap-3">
            <img
              src="./assets/layers/ganesha-icon.png"
              alt=""
              className="h-16 w-16 object-contain drop-shadow-sm sm:h-20 sm:w-20"
              draggable={false}
            />
            <p className="text-[11px] uppercase tracking-[0.45em] text-gold-antique">
              {wedding.cover.kicker}
            </p>
            <h1 className="font-display text-2xl font-semibold uppercase tracking-[0.18em] text-temple-ink sm:text-3xl">
              {wedding.cover.title}
            </h1>
          </div>

          <div className="flex max-w-sm flex-col items-center gap-4">
            <motion.h2
              className="font-script text-bronze text-[2.5rem] leading-tight sm:text-5xl"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {wedding.cover.headline}
            </motion.h2>
            <p className="max-w-[17rem] font-display text-[11px] uppercase leading-relaxed tracking-[0.18em] text-temple-bronze/75">
              {wedding.cover.gratitude}
            </p>
          </div>

          <div className="flex w-full max-w-xs flex-col items-center gap-3">
            <motion.button
              type="button"
              onClick={onBegin}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              className="group relative flex min-h-12 w-full items-center justify-center rounded-2xl border border-gold-antique/55 bg-ivory-soft/90 px-6 py-3 text-[12px] uppercase tracking-[0.32em] text-temple-ink shadow-gilded backdrop-blur-sm transition"
            >
              {!reduce && (
                <span className="pointer-events-none absolute inset-0 rounded-2xl border border-gold-bright/40 pulse-ring" />
              )}
              <span className="relative">{wedding.cover.cta}</span>
            </motion.button>
          </div>
        </div>

        <button
          type="button"
          onClick={onSkip}
          className="min-h-11 rounded-full bg-ivory-paper/75 px-5 text-[10px] uppercase tracking-[0.3em] text-temple-bronze/80 backdrop-blur-sm transition hover:text-temple-bronze"
        >
          {wedding.intro.skipLabel} intro
        </button>
      </div>
    </motion.div>
  );
}
