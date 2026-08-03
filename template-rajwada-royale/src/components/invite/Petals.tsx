import { useEffect, useMemo, useState } from "react";

type Petal = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  hue: string;
  opacity: number;
};

const HUES = ["var(--petal-rose)", "var(--petal-blush)", "var(--petal-marigold)"];

/**
 * Lightweight falling rose / marigold petals.
 * Count scales down on small screens; disabled entirely for reduced motion.
 */
export function Petals() {
  const [enabled, setEnabled] = useState(false);
  const [count, setCount] = useState(14);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cores = navigator.hardwareConcurrency ?? 4;
    if (cores <= 2) return;
    setCount(window.innerWidth < 640 ? 12 : 22);
    setEnabled(true);
  }, []);

  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 12,
        delay: Math.random() * 14,
        duration: 13 + Math.random() * 12,
        drift: (Math.random() - 0.5) * 140,
        hue: HUES[i % HUES.length] as string,
        opacity: 0.3 + Math.random() * 0.35,
      })),
    [count],
  );

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size * 0.72}px`,
              background: p.hue,
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--petal-drift": `${p.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
