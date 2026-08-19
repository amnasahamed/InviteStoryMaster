import { describe, expect, it } from "vitest";
import { introReducer, type IntroState } from "./introMachine";

describe("introReducer", () => {
  it("moves through the cover → video → tap → reveal journey", () => {
    let state: IntroState = { stage: "cover" };

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

  it("opens directly when reduced motion is requested", () => {
    const state = introReducer(
      { stage: "cover" },
      { type: "SKIP_MOTION" },
    );

    expect(state.stage).toBe("open");
  });

  it("allows replay from the await-tap stage", () => {
    const state = introReducer(
      { stage: "awaitTap", videoError: "decode" },
      { type: "REPLAY" },
    );
    expect(state).toEqual({ stage: "playing" });
  });

  it("ignores events that do not belong to the current stage", () => {
    const state: IntroState = { stage: "cover" };
    expect(introReducer(state, { type: "VIDEO_ENDED" })).toBe(state);
  });
});
