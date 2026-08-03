import { useEffect, useState } from "react";
import { playShutter } from "./audio";

/** Black screen → shutter → fade into the sky. */
export function Opening({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    const t1 = window.setTimeout(() => {
      setPhase(1);
      playShutter();
    }, 700);
    const t2 = window.setTimeout(() => setPhase(2), 1900);
    const t3 = window.setTimeout(() => {
      setPhase(3);
      onDone();
    }, 3400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-ink transition-opacity duration-[1600ms]"
      style={{ opacity: phase === 3 ? 0 : 1, pointerEvents: phase === 3 ? "none" : "auto" }}
    >
      <div
        className="h-16 w-16 rounded-full border border-cream/30"
        style={{
          animation: phase >= 1 ? "shutter-blink 0.5s ease-in-out 1" : undefined,
          background:
            "radial-gradient(circle at 40% 35%, oklch(1 0 0 / 0.25), oklch(0.3 0.02 260 / 0.9))",
        }}
      />
      <p
        className="font-display text-cream/85 text-2xl transition-opacity duration-1000"
        style={{ opacity: phase >= 1 ? 1 : 0 }}
      >
        One moment…
      </p>
      <p
        className="text-cream/55 text-xs tracking-[0.4em] uppercase transition-opacity duration-1000"
        style={{ opacity: phase >= 2 ? 1 : 0 }}
      >
        we&apos;re getting ready
      </p>
    </div>
  );
}
