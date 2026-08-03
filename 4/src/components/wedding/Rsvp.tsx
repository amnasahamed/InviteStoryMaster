import { useState } from "react";
import { burstPetals } from "./effects";

/** "Will you come?" — asked by the groom, answered with two soft buttons. */
export function Rsvp() {
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <p className="font-display text-3xl text-ink sm:text-4xl">Will you come?</p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={(e) => {
            setAnswer("yes");
            burstPetals({ x: e.clientX, y: e.clientY, count: 46, spread: 1.3 });
          }}
          className="rounded-full px-8 py-4 font-body text-sm tracking-[0.16em] text-primary-foreground uppercase transition-transform duration-300 hover:scale-105"
          style={{ background: "var(--primary)", boxShadow: "var(--shadow-lift)" }}
        >
          Absolutely ❤️
        </button>
        <button
          type="button"
          onClick={() => setAnswer("no")}
          className="rounded-full px-8 py-4 font-body text-sm tracking-[0.16em] text-ink uppercase transition-transform duration-300 hover:scale-105"
          style={{ background: "var(--popover)", boxShadow: "var(--shadow-lift)" }}
        >
          Wouldn&apos;t miss it
        </button>
      </div>

      <div
        className="min-h-16 transition-all duration-700"
        style={{ opacity: answer ? 1 : 0, transform: `translateY(${answer ? 0 : 10}px)` }}
      >
        {answer === "yes" && (
          <p className="font-hand pb-[0.18em] leading-[1.5] text-3xl text-primary">
            You just made our whole year ♡
          </p>
        )}
        {answer === "no" && (
          <p className="font-hand pb-[0.18em] leading-[1.5] text-3xl text-primary">
            🥺 We&apos;ll miss you… save us a hug anyway
          </p>
        )}
      </div>
    </div>
  );
}
