import { useCallback, useEffect, useReducer } from "react";
import { AnimatePresence } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { introReducer, type IntroState } from "../lib/introMachine";
import CoverGate from "./CoverGate";
import VideoStage from "./VideoStage";
import FocusTap from "./FocusTap";
import InvitationReveal from "./InvitationReveal";

const initial: IntroState = { stage: "cover" };

export default function IntroExperience({
  onOpen,
}: {
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();
  const [state, dispatch] = useReducer(introReducer, initial);

  useEffect(() => {
    if (reduce) {
      dispatch({ type: "SKIP_MOTION" });
    }
  }, [reduce]);

  useEffect(() => {
    const locked = state.stage !== "open";
    document.documentElement.style.overflow = locked ? "hidden" : "";
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [state.stage]);

  useEffect(() => {
    if (state.stage === "open") onOpen();
  }, [state.stage, onOpen]);

  const onBegin = useCallback(() => dispatch({ type: "BEGIN" }), []);
  const onSkip = useCallback(() => dispatch({ type: "SKIP_MOTION" }), []);
  const onEnded = useCallback(() => dispatch({ type: "VIDEO_ENDED" }), []);
  const onFailed = useCallback(
    (reason: string) => dispatch({ type: "VIDEO_FAILED", reason }),
    [],
  );
  const onEnter = useCallback(() => dispatch({ type: "ENTER" }), []);
  const onReplay = useCallback(() => dispatch({ type: "REPLAY" }), []);
  const onRevealFinished = useCallback(
    () => dispatch({ type: "REVEAL_FINISHED" }),
    [],
  );

  if (state.stage === "open") return null;

  return (
    <>
      <AnimatePresence>
        {state.stage === "cover" && (
          <CoverGate visible onBegin={onBegin} onSkip={onSkip} />
        )}
      </AnimatePresence>

      <VideoStage
        active={state.stage === "playing"}
        onEnded={onEnded}
        onFailed={onFailed}
        onSkip={onSkip}
      />

      <AnimatePresence>
        {state.stage === "awaitTap" && (
          <FocusTap
            visible
            videoError={state.videoError}
            onEnter={onEnter}
            onReplay={onReplay}
          />
        )}
      </AnimatePresence>

      <InvitationReveal
        active={state.stage === "revealing"}
        onFinished={onRevealFinished}
      />
    </>
  );
}
