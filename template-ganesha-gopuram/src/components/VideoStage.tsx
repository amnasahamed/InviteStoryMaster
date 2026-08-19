import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { wedding } from "../config";

type Props = {
  active: boolean;
  onEnded: () => void;
  onFailed: (reason: string) => void;
  onSkip: () => void;
};

export default function VideoStage({
  active,
  onEnded,
  onFailed,
  onSkip,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    const video = videoRef.current;
    if (!video) return;

    const play = async () => {
      try {
        video.currentTime = 0;
        video.muted = true;
        setMuted(true);
        await video.play();
      } catch {
        onFailed("autoplay-blocked");
      }
    };

    void play();
  }, [active, onFailed]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
  }, [muted]);

  if (!active) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Wedding blessing video"
        className="fixed inset-0 z-[80] flex items-center justify-center bg-temple-ink"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={wedding.intro.videoSrc}
          poster={wedding.intro.posterSrc}
          playsInline
          muted={muted}
          preload="auto"
          onTimeUpdate={(e) => {
            const el = e.currentTarget;
            if (!el.duration) return;
            setProgress(el.currentTime / el.duration);
          }}
          onEnded={onEnded}
          onError={() => onFailed("decode")}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-temple-ink/55 via-transparent to-temple-ink/25" />

        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))]">
          <button
            type="button"
            onClick={onSkip}
            className="min-h-11 rounded-full border border-white/25 bg-black/25 px-4 text-[10px] uppercase tracking-[0.28em] text-white/90 backdrop-blur-md transition hover:bg-black/40"
          >
            {wedding.intro.skipLabel}
          </button>
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className="min-h-11 rounded-full border border-white/25 bg-black/25 px-4 text-[10px] uppercase tracking-[0.28em] text-white/90 backdrop-blur-md transition hover:bg-black/40"
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? "Sound off" : "Sound on"}
          </button>
        </div>

        <div className="absolute inset-x-8 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-10">
          <div className="h-[2px] overflow-hidden rounded-full bg-white/20">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-gold-soft to-gold-bright"
              style={{ scaleX: progress }}
            />
          </div>
          {!reduce && (
            <p className="mt-3 text-center text-[10px] uppercase tracking-[0.32em] text-white/70">
              An auspicious beginning
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
