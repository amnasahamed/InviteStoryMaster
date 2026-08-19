export type IntroStage =
  | "cover"
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
  | { type: "VIDEO_ENDED" }
  | { type: "VIDEO_FAILED"; reason: string }
  | { type: "ENTER" }
  | { type: "REVEAL_FINISHED" }
  | { type: "SKIP_MOTION" }
  | { type: "REPLAY" };

export function introReducer(
  state: IntroState,
  event: IntroEvent,
): IntroState {
  if (event.type === "SKIP_MOTION") return { stage: "open" };

  switch (state.stage) {
    case "cover":
      if (event.type === "BEGIN") return { stage: "playing" };
      return state;
    case "playing":
      if (event.type === "VIDEO_ENDED") return { stage: "awaitTap" };
      if (event.type === "VIDEO_FAILED") {
        return { stage: "awaitTap", videoError: event.reason };
      }
      return state;
    case "awaitTap":
      if (event.type === "ENTER") return { ...state, stage: "revealing" };
      if (event.type === "REPLAY") return { stage: "playing", videoError: undefined };
      return state;
    case "revealing":
      return event.type === "REVEAL_FINISHED"
        ? { ...state, stage: "open" }
        : state;
    case "open":
      if (event.type === "REPLAY") return { stage: "cover" };
      return state;
  }
}
