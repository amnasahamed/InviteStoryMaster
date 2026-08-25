import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useReducer, useRef, useState } from "react";
import { wedding } from "../config";
import { introReducer } from "../lib/introMachine";

type Props = {
  onOpened: () => void;
};

export default function IntroJourney({ onOpened }: Props) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [state, dispatch] = useReducer(introReducer, { stage: "landing" });
  const isLocked = state.stage !== "open";

  useEffect(() => {
    if (state.stage === "open") onOpened();
  }, [onOpened, state.stage]);

  useEffect(() => {
    if (state.stage !== "revealing") return;
    const id = window.setTimeout(
      () => dispatch({ type: "REVEAL_FINISHED" }),
      1150,
    );
    return () => window.clearTimeout(id);
  }, [state.stage]);

  useEffect(() => {
    if (state.stage !== "playing") return;
    const id = window.setTimeout(
      () => dispatch({ type: "VIDEO_FAILED", reason: "timeout" }),
      wedding.intro.videoTimeoutMs,
    );
    return () => window.clearTimeout(id);
  }, [state.stage]);

  useEffect(() => {
    if (state.stage !== "playing") videoRef.current?.pause();
  }, [state.stage]);

  useEffect(() => {
    if (!isLocked) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous;
    };
  }, [isLocked]);

  const playVideo = () => {
    const video = videoRef.current;
    if (!video) {
      dispatch({ type: "VIDEO_FAILED", reason: "unavailable" });
      return;
    }

    video.muted = muted;
    video.currentTime = 0;
    video.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "AbortError") return;
      dispatch({ type: "VIDEO_FAILED", reason: "playback" });
    });
  };

  const begin = () => {
    if (reduceMotion) {
      dispatch({ type: "SKIP_MOTION" });
      return;
    }
    if (!wedding.intro.videoEnabled) {
      dispatch({ type: "BEGIN_WITHOUT_VIDEO" });
      return;
    }

    dispatch({ type: "BEGIN" });
    playVideo();
  };

  const replay = () => {
    videoRef.current?.pause();
    dispatch({ type: "REPLAY" });
    playVideo();
  };

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  };

  return (
    <AnimatePresence>
      {state.stage !== "open" && (
        <motion.section
          className="fixed inset-0 z-40 isolate overflow-hidden bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Wedding invitation opening"
          role="dialog"
          aria-modal="true"
        >
          <img
            src={wedding.assets.introPoster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,12,29,.22),rgba(4,12,29,.04)_38%,rgba(4,12,29,.88))]" />

          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              state.stage === "playing" ? "opacity-100" : "opacity-0"
            }`}
            src={
              wedding.intro.videoEnabled
                ? wedding.assets.introVideo
                : undefined
            }
            poster={wedding.assets.introPoster}
            playsInline
            muted={muted}
            preload={wedding.intro.videoEnabled ? "auto" : "none"}
            onEnded={() => dispatch({ type: "VIDEO_ENDED" })}
            onError={() =>
              dispatch({ type: "VIDEO_FAILED", reason: "unavailable" })
            }
          />

          {(state.stage === "awaitTap" || state.stage === "revealing") && (
            <motion.img
              src={wedding.assets.introEnd}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          )}

          <img
            src={wedding.assets.frame}
            alt=""
            className="pointer-events-none absolute inset-2 z-20 h-[calc(100%-1rem)] w-[calc(100%-1rem)] object-fill opacity-80 sm:inset-4 sm:h-[calc(100%-2rem)] sm:w-[calc(100%-2rem)]"
          />

          {state.stage === "landing" && (
            <motion.div
              className="absolute inset-x-0 bottom-[6vh] z-30 mx-auto flex max-w-lg flex-col items-center px-8 text-center text-pearl [text-shadow:0_2px_18px_rgba(4,12,29,.9)]"
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="eyebrow">
                {wedding.intro.eyebrow}
              </p>
              <h1 className="font-display mt-3 max-w-md text-[3rem] font-medium leading-[.9] tracking-[-.035em] sm:text-6xl">
                {wedding.intro.title}
              </h1>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-pearl/82">
                {wedding.intro.body}
              </p>
              <button
                type="button"
                onClick={begin}
                className="journey-button mt-7"
              >
                <span>{wedding.intro.beginLabel}</span>
                <span className="journey-button__mark" aria-hidden>
                  ✦
                </span>
              </button>
            </motion.div>
          )}

          {state.stage === "playing" && (
            <div className="absolute inset-x-0 bottom-8 z-30 flex items-center justify-center gap-2">
              <span className="rounded-full bg-ink/55 px-4 py-2 text-[9px] uppercase tracking-[0.3em] text-pearl/70 backdrop-blur-md">
                {wedding.intro.playingLabel}
              </span>
              <button
                type="button"
                onClick={toggleSound}
                className="rounded-full border border-moon/25 bg-ink/55 px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-pearl/70 backdrop-blur-md"
              >
                {muted ? "Sound off" : "Sound on"}
              </button>
              <button
                type="button"
                onClick={() => dispatch({ type: "VIDEO_ENDED" })}
                className="rounded-full border border-moon/25 bg-ink/55 px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-pearl/70 backdrop-blur-md"
              >
                Skip
              </button>
            </div>
          )}

          {state.stage === "awaitTap" && (
            <motion.div
              className="absolute inset-0 z-30 flex flex-col items-center justify-center pt-[8vh] text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <button
                type="button"
                onClick={() => dispatch({ type: "ENTER" })}
                className="tap-ripple"
                aria-label={wedding.intro.enterLabel}
              >
                <span className="tap-ripple__ring" />
                <span className="tap-ripple__core">✦</span>
              </button>
              <p className="mt-5 rounded-full bg-ink/50 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-pearl/80 backdrop-blur-md">
                {wedding.intro.tapHint}
              </p>
              {state.videoError && state.videoError !== "not-configured" && (
                <p className="sr-only" aria-live="polite">
                  The opening film was unavailable. Continue with the still
                  invitation.
                </p>
              )}
              {wedding.intro.videoEnabled && (
                <button
                  type="button"
                  onClick={replay}
                  className="mt-3 text-[9px] uppercase tracking-[0.22em] text-pearl/62 underline decoration-moon/35 underline-offset-4"
                >
                  Replay opening film
                </button>
              )}
            </motion.div>
          )}

          {state.stage === "revealing" && (
            <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
              <motion.div
                className="absolute inset-0 origin-left bg-lotus/95"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.div
                className="absolute inset-0 bg-moon"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.05, times: [0, 0.45, 1] }}
              />
              <motion.img
                src={wedding.assets.foregroundLotus}
                alt=""
                className="absolute bottom-[-2%] left-1/2 w-[150%] max-w-none"
                style={{ x: "-50%" }}
                initial={{ y: "70%", scale: 0.8, opacity: 0 }}
                animate={{ y: "-8%", scale: 1.35, opacity: [0, 1, 0] }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
}
