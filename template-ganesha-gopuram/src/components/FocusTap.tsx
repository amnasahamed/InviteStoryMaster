import { motion, useReducedMotion } from "framer-motion";
import { wedding } from "../config";

type Props = {
  visible: boolean;
  videoError?: string;
  onEnter: () => void;
  onReplay: () => void;
};

export default function FocusTap({
  visible,
  videoError,
  onEnter,
  onReplay,
}: Props) {
  const reduce = useReducedMotion();
  if (!visible) return null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Enter the invitation"
      className="fixed inset-0 z-[85] flex flex-col items-center justify-center bg-temple-ink/40 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src={wedding.intro.posterSrc}
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-80 blur-[2px]"
      />
      <div className="absolute inset-0 -z-10 bg-temple-ink/45" />

      <button
        type="button"
        onClick={onEnter}
        className="relative flex h-28 w-28 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-bright"
        aria-label={wedding.intro.focusHint}
      >
        {!reduce && (
          <>
            <span className="absolute inset-0 rounded-full border border-gold-soft/70 pulse-ring" />
            <span
              className="absolute inset-[-10px] rounded-full border border-gold-bright/40 pulse-ring"
              style={{ animationDelay: "0.7s" }}
            />
          </>
        )}
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-gold-soft/80 bg-black/30 shadow-gilded backdrop-blur-md">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
            <path
              d="M10 7.5v13l11-6.5L10 7.5Z"
              fill="#F4E4B8"
              stroke="#D4AF37"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <p className="mt-6 text-[11px] uppercase tracking-[0.38em] text-gold-pale">
        ✦ {wedding.intro.focusHint}
      </p>
      <p className="mt-2 font-display text-sm tracking-wide text-ivory-soft/75">
        You are warmly invited
      </p>

      {videoError && (
        <p className="mt-4 max-w-xs text-center text-[11px] text-ivory-soft/55">
          Video could not play — continue into the invitation.
        </p>
      )}

      <button
        type="button"
        onClick={onReplay}
        className="mt-8 min-h-11 rounded-full border border-white/20 px-5 text-[10px] uppercase tracking-[0.28em] text-white/70 transition hover:border-gold-soft/50 hover:text-gold-pale"
      >
        Replay blessing
      </button>
    </motion.div>
  );
}
