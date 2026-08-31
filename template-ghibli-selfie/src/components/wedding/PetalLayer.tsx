import { useEffect, useState } from "react";
const petalImg = "https://media.invitestory.in/ghibli-selfie/src/assets/petal.png";
const butterflyImg = "https://media.invitestory.in/ghibli-selfie/src/assets/butterfly.png";
import { PETAL_EVENT, type PetalBurst } from "./effects";

type Particle = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rot: number;
  size: number;
  dur: number;
  kind: "petal" | "butterfly" | "confetti";
  hue: number;
};

let seq = 0;

/** Global particle layer: petal explosions, butterflies, confetti. */
export function PetalLayer() {
  const [parts, setParts] = useState<Particle[]>([]);

  useEffect(() => {
    const onBurst = (e: Event) => {
      const d = (e as CustomEvent<PetalBurst>).detail;
      const count = d.count ?? 24;
      const spread = d.spread ?? 1;
      const kind = d.kind ?? "petal";
      const made: Particle[] = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const power = (140 + Math.random() * 420) * spread;
        return {
          id: seq++,
          x: d.x,
          y: d.y,
          dx: Math.cos(angle) * power,
          dy: Math.sin(angle) * power - 160,
          rot: Math.random() * 720 - 360,
          size: kind === "confetti" ? 8 + Math.random() * 8 : 16 + Math.random() * 30,
          dur: 2.4 + Math.random() * 2.6,
          kind,
          hue: Math.round(Math.random() * 60),
        };
      });
      setParts((prev) => [...prev.slice(-160), ...made]);
      const ids = new Set(made.map((m) => m.id));
      window.setTimeout(() => setParts((prev) => prev.filter((p) => !ids.has(p.id))), 5200);
    };

    window.addEventListener(PETAL_EVENT, onBurst as EventListener);
    return () => window.removeEventListener(PETAL_EVENT, onBurst as EventListener);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {parts.map((p) => (
        <span
          key={p.id}
          className="absolute"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            transform: "translate(-50%, -50%)",
          }}
        >
          <span
            className="block h-full w-full"
            style={
              {
                "--fx": `${p.dx}px`,
                "--fy": `${p.dy}px`,
                animation: `flutter ${p.dur}s cubic-bezier(0.2, 0.6, 0.3, 1) forwards`,
                rotate: `${p.rot}deg`,
              } as React.CSSProperties
            }
          >
            {p.kind === "confetti" ? (
              <span
                className="block h-full w-full rounded-[2px]"
                style={{
                  background: `oklch(0.8 0.14 ${p.hue * 6})`,
                  height: p.size * 0.45,
                }}
              />
            ) : (
              <img
                src={p.kind === "butterfly" ? butterflyImg : petalImg}
                alt=""
                className="h-full w-full select-none"
                loading="lazy"
              />
            )}
          </span>
        </span>
      ))}
    </div>
  );
}
