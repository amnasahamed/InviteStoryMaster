import { useCallback, useEffect, useRef, useState } from "react";
import { Phone, ChevronRight } from "lucide-react";

export function SlideToAnswer({ onAnswer }: { onAnswer: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  const [max, setMax] = useState(0);
  const [dragging, setDragging] = useState(false);
  const done = useRef(false);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (el) setMax(Math.max(0, el.clientWidth - 72));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const start = (clientX: number) => {
    if (done.current) return;
    setDragging(true);
    const rect = trackRef.current!.getBoundingClientRect();
    const offset = clientX - rect.left - 36;
    move(clientX, offset);
  };

  const move = (clientX: number, offsetOverride?: number) => {
    const rect = trackRef.current!.getBoundingClientRect();
    const next = Math.min(max, Math.max(0, offsetOverride ?? clientX - rect.left - 36));
    setX(next);
    if (next >= max - 2 && !done.current) {
      done.current = true;
      setDragging(false);
      // Haptic feedback on supported devices
      if (navigator.vibrate) navigator.vibrate(30);
      onAnswer();
    }
  };

  const end = () => {
    setDragging(false);
    if (!done.current) setX(0);
  };

  const progress = max > 0 ? x / max : 0;

  return (
    <div className="flex w-full max-w-[340px] flex-col items-center gap-3">
      <div
        ref={trackRef}
        className="relative h-[72px] w-full select-none overflow-hidden rounded-full glass-panel-strong"
        style={{
          boxShadow: `
            0 20px 60px -20px oklch(0 0 0 / 50%),
            inset 0 1px 0 oklch(1 0 0 / 10%),
            0 0 ${20 + progress * 30}px -4px oklch(0.72 0.19 148 / ${progress * 40}%)
          `,
        }}
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          start(e.clientX);
        }}
        onPointerMove={(e) => dragging && move(e.clientX)}
        onPointerUp={end}
        onPointerCancel={end}
        role="button"
        tabIndex={0}
        aria-label="Slide to answer the wedding call"
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !done.current) {
            done.current = true;
            setX(max);
            onAnswer();
          }
        }}
      >
        {/* Animated progress fill */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, oklch(0.72 0.19 148 / ${progress * 15}%), oklch(0.72 0.19 148 / ${progress * 8}%))`,
            transition: dragging ? "none" : "all 420ms cubic-bezier(0.22,1,0.36,1)",
          }}
        />

        {/* Hint text with shimmer */}
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center pl-16 text-[14px] font-medium tracking-[0.24em] uppercase slide-hint"
          style={{ opacity: max ? 1 - progress * 1.5 : 1 }}
        >
          slide to answer
        </span>

        {/* Animated arrow hints */}
        <div
          className="pointer-events-none absolute right-5 top-1/2 flex -translate-y-1/2 items-center gap-0.5"
          style={{ opacity: max ? Math.max(0, 1 - progress * 3) : 1 }}
        >
          {[0, 1, 2].map((i) => (
            <ChevronRight
              key={i}
              className="h-3.5 w-3.5 text-foreground/30"
              strokeWidth={2}
              style={{ animation: `bounce-arrow 1.5s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>

        {/* Draggable thumb */}
        <div
          className="absolute top-[4px] left-[4px] flex h-16 w-16 items-center justify-center rounded-full"
          style={{
            background: "linear-gradient(135deg, oklch(0.78 0.2 148), oklch(0.68 0.18 148))",
            transform: `translateX(${x}px)`,
            transition: dragging ? "none" : "transform 420ms cubic-bezier(0.22,1,0.36,1)",
            boxShadow: `
              0 8px 24px -4px oklch(0.72 0.19 148 / 50%),
              0 2px 8px oklch(0.72 0.19 148 / 30%),
              inset 0 1px 0 oklch(1 0 0 / 20%)
            `,
          }}
        >
          {/* Pulse rings */}
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(135deg, oklch(0.78 0.2 148), oklch(0.68 0.18 148))",
              animation: "ring-pulse 2.2s ease-out infinite",
            }}
          />
          <span
            className="absolute -inset-2 rounded-full border border-ios-green/30"
            style={{ animation: "ring-pulse-outer 2.2s ease-out 0.3s infinite" }}
          />
          <Phone className="relative h-6 w-6 text-white drop-shadow-sm" strokeWidth={2.2} />
        </div>
      </div>
    </div>
  );
}
