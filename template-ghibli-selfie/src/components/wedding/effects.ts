export type PetalBurst = {
  x: number;
  y: number;
  count?: number;
  kind?: "petal" | "butterfly" | "confetti";
  spread?: number;
};

export const PETAL_EVENT = "wedding:petals";

export function burstPetals(detail: PetalBurst) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<PetalBurst>(PETAL_EVENT, { detail }));
}
