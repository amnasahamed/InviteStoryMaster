import { describe, expect, it } from "vitest";
import { introReducer, type IntroState } from "./introMachine";

describe("introReducer", () => {
  it("moves through the two-tap cinematic journey", () => {
    let state: IntroState = { stage: "landing" };

    state = introReducer(state, { type: "BEGIN" });
    expect(state.stage).toBe("playing");

    state = introReducer(state, { type: "VIDEO_ENDED" });
    expect(state.stage).toBe("awaitTap");

    state = introReducer(state, { type: "ENTER" });
    expect(state.stage).toBe("revealing");

    state = introReducer(state, { type: "REVEAL_FINISHED" });
    expect(state.stage).toBe("open");
  });

  it("falls back to the interactive end frame when video playback fails", () => {
    const state = introReducer(
      { stage: "playing" },
      { type: "VIDEO_FAILED", reason: "decode" },
    );

    expect(state).toEqual({ stage: "awaitTap", videoError: "decode" });
  });

  it("moves directly to the end frame when no video is configured", () => {
    const state = introReducer(
      { stage: "landing" },
      { type: "BEGIN_WITHOUT_VIDEO" },
    );

    expect(state.stage).toBe("awaitTap");
  });

  it("replays the film from the interactive end frame", () => {
    const state = introReducer(
      { stage: "awaitTap" },
      { type: "REPLAY" },
    );

    expect(state).toEqual({ stage: "playing" });
  });

  it("opens directly when reduced motion is requested", () => {
    const state = introReducer(
      { stage: "landing" },
      { type: "SKIP_MOTION" },
    );

    expect(state.stage).toBe("open");
  });

  it("ignores events that do not belong to the current stage", () => {
    const state: IntroState = { stage: "landing" };
    expect(introReducer(state, { type: "VIDEO_ENDED" })).toBe(state);
  });
});
