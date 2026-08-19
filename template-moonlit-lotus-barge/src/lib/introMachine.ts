export type IntroStage =
  | "landing"
  | "playing"
  | "awaitTap"
  | "revealing"
  | "open";

export type IntroState = {
  stage: IntroStage;
  videoError?: string;
};

export type IntroEvent =
  | { type: "BEGIN" }
  | { type: "BEGIN_WITHOUT_VIDEO" }
  | { type: "VIDEO_ENDED" }
  | { type: "VIDEO_FAILED"; reason: string }
  | { type: "REPLAY" }
  | { type: "ENTER" }
  | { type: "REVEAL_FINISHED" }
  | { type: "SKIP_MOTION" };

export function introReducer(
  state: IntroState,
  event: IntroEvent,
): IntroState {
  if (event.type === "SKIP_MOTION") return { stage: "open" };

  switch (state.stage) {
    case "landing":
      if (event.type === "BEGIN") return { stage: "playing" };
      if (event.type === "BEGIN_WITHOUT_VIDEO") {
        return { stage: "awaitTap", videoError: "not-configured" };
      }
      return state;
    case "playing":
      if (event.type === "VIDEO_ENDED") return { stage: "awaitTap" };
      if (event.type === "VIDEO_FAILED") {
        return { stage: "awaitTap", videoError: event.reason };
      }
      return state;
    case "awaitTap":
      if (event.type === "REPLAY") return { stage: "playing" };
      return event.type === "ENTER"
        ? { ...state, stage: "revealing" }
        : state;
    case "revealing":
      return event.type === "REVEAL_FINISHED"
        ? { ...state, stage: "open" }
        : state;
    case "open":
      return state;
  }
}
