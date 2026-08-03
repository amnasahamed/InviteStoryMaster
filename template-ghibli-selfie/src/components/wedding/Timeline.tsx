import { Moon, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useReveal } from "./useReveal";

// Single Wedding day — one muhurtham (the Nikah) only.
const STOPS = [
  { icon: Moon, label: "Nikah", time: "3:30 pm" },
  { icon: Heart, label: "Two become one", time: "till late" },
];

function Stop({ icon: Icon, label, time, i }: { icon: LucideIcon; label: string; time: string; i: number }) {
  const { ref, shown } = useReveal<HTMLLIElement>(0.5);
  const left = i % 2 === 0;

  return (
    <li
      ref={ref}
      className={`reveal relative flex items-center gap-5 ${shown ? "reveal-in" : ""} ${
        left ? "sm:flex-row" : "sm:flex-row-reverse sm:text-right"
      }`}
      style={{ transitionDelay: `${(i % 3) * 90}ms` }}
    >
      <div className="flex-1 sm:block">
        <p className="font-display text-2xl text-ink sm:text-3xl">{label}</p>
        <p className="text-[0.68rem] tracking-[0.32em] text-muted-foreground uppercase">{time}</p>
      </div>
      <span
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl backdrop-blur-sm"
        style={{ background: "var(--popover)", boxShadow: "var(--shadow-lift)" }}
      >
        <Icon className="h-5 w-5 text-ink/70" strokeWidth={1.4} />
      </span>
      <div className="hidden flex-1 sm:block" />
    </li>
  );
}

/** The guest journey, drawn as a drifting thread rather than a table. */
export function Timeline() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-[3.4rem] w-px sm:left-1/2"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.7 0.06 30 / 0.45) 12%, oklch(0.7 0.06 30 / 0.45) 88%, transparent)",
        }}
      />
      <ul className="flex flex-col gap-12">
        {STOPS.map((s, i) => (
          <Stop key={s.label} {...s} i={i} />
        ))}
      </ul>
    </div>
  );
}
