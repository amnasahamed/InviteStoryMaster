import { useEffect, useRef, useState } from "react";

/** Long-press anywhere → a handwritten note from the couple. */
export function LongPressNote() {
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const start = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      if (el?.closest("button,a,input,textarea")) return;
      timer.current = window.setTimeout(() => setOpen(true), 620);
    };
    const cancel = () => {
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = null;
    };
    window.addEventListener("pointerdown", start);
    window.addEventListener("pointerup", cancel);
    window.addEventListener("pointercancel", cancel);
    window.addEventListener("pointermove", cancel);
    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("pointerup", cancel);
      window.removeEventListener("pointercancel", cancel);
      window.removeEventListener("pointermove", cancel);
      cancel();
    };
  }, []);

  if (!open) return null;

  return (
    <button
      type="button"
      aria-label="Close the note"
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: "oklch(0.3 0.04 40 / 0.35)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="max-w-md rounded-[2rem] px-9 py-12 text-center"
        style={{
          background: "var(--popover)",
          boxShadow: "var(--shadow-soft)",
          animation: "pop-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        }}
      >
        <p className="font-hand pb-[0.18em] text-2xl leading-relaxed text-ink">
          You found our little secret.
          <br />
          Some people you just want in every photo —
          <br />
          you&apos;re one of them.
        </p>
        <p className="mt-6 font-hand pb-[0.18em] text-xl leading-[1.5] text-primary">— Amaan &amp; Fatima</p>
        <p className="mt-6 text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">
          tap to close
        </p>
      </div>
    </button>
  );
}
