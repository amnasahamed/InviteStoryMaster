import { useEffect, useMemo, useRef, useState } from "react";
const cloudA = "https://media.invitestory.in/ghibli-selfie/src/assets/cloud-a.png";
import { playChirp } from "./audio";
import { burstPetals } from "./effects";

type Cloud = {
  top: string;
  scale: number;
  duration: number;
  delay: number;
  opacity: number;
  src: string;
  depth: number;
};

const CLOUDS: Cloud[] = [
  { top: "4%", scale: 1.1, duration: 150, delay: -20, opacity: 0.85, src: cloudA, depth: 0.06 },
  { top: "13%", scale: 0.6, duration: 110, delay: -60, opacity: 0.6, src: cloudA, depth: 0.14 },
  { top: "26%", scale: 1.5, duration: 210, delay: -130, opacity: 0.5, src: cloudA, depth: 0.04 },
  { top: "41%", scale: 0.8, duration: 130, delay: -10, opacity: 0.7, src: cloudA, depth: 0.1 },
  { top: "58%", scale: 1.3, duration: 190, delay: -90, opacity: 0.45, src: cloudA, depth: 0.05 },
  { top: "72%", scale: 0.7, duration: 120, delay: -45, opacity: 0.6, src: cloudA, depth: 0.12 },
  { top: "86%", scale: 1.6, duration: 230, delay: -150, opacity: 0.4, src: cloudA, depth: 0.03 },
];

function Bird({ delay, top, dur }: { delay: number; top: string; dur: number }) {
  return (
    <button
      type="button"
      aria-label="A little bird"
      onClick={playChirp}
      className="pointer-events-auto absolute left-0 h-8 w-8 cursor-pointer border-0 bg-transparent p-0"
      style={{ top, animation: `bird-fly ${dur}s linear ${delay}s infinite` }}
    >
      <svg viewBox="0 0 40 20" className="h-full w-full text-foreground/50">
        <g style={{ animation: "wing 0.42s ease-in-out infinite", transformOrigin: "50% 60%" }}>
          <path
            d="M2 12 C 8 2, 14 2, 20 11 C 26 2, 32 2, 38 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </button>
  );
}

/** Living Ghibli backdrop: sky wash, drifting clouds, sun rays, dust, birds. */
export function Atmosphere() {
  const [cloudTaps, setCloudTaps] = useState(0);
  const tapReset = useRef<number | null>(null);

  const dust = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        top: `${(i * 61) % 100}%`,
        size: 2 + ((i * 7) % 5),
        dur: 4 + ((i * 3) % 7),
        delay: (i % 11) * 0.6,
      })),
    [],
  );

  const petalsUp = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        left: `${6 + ((i * 13) % 88)}%`,
        dur: 22 + ((i * 5) % 18),
        delay: -(i * 3.5),
        size: 10 + ((i * 4) % 14),
      })),
    [],
  );

  useEffect(() => {
    if (cloudTaps >= 5) {
      burstPetals({
        x: window.innerWidth / 2,
        y: window.innerHeight * 0.3,
        count: 60,
        kind: "confetti",
        spread: 1.4,
      });
      setCloudTaps(0);
    }
  }, [cloudTaps]);

  const tapCloud = () => {
    setCloudTaps((n) => n + 1);
    if (tapReset.current) window.clearTimeout(tapReset.current);
    tapReset.current = window.setTimeout(() => setCloudTaps(0), 2600);
  };

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-sky)" }} />

      {/* sun rays */}
      <div
        className="absolute -top-1/4 left-1/2 h-[140vh] w-[140vw] -translate-x-1/2 mix-blend-soft-light"
        style={{
          background:
            "conic-gradient(from 200deg at 50% 0%, transparent 0deg, var(--gold) 12deg, transparent 26deg, transparent 40deg, var(--gold) 52deg, transparent 66deg, transparent 92deg, var(--gold) 104deg, transparent 120deg)",
          animation: "sun-sweep 22s ease-in-out infinite",
          filter: "blur(18px)",
        }}
      />

      {/* clouds */}
      {CLOUDS.map((c, i) => (
        <button
          key={i}
          type="button"
          tabIndex={-1}
          aria-hidden
          onClick={tapCloud}
          className="pointer-events-auto absolute left-0 border-0 bg-transparent p-0"
          style={{
            top: c.top,
            opacity: c.opacity,
            width: `${34 * c.scale}vw`,
            animation: `drift-slow ${c.duration}s linear ${c.delay}s infinite`,
          }}
        >
          <img
            src={c.src}
            alt=""
            className="w-full select-none"
            loading="lazy"
            style={{
              maskImage:
                "radial-gradient(ellipse at 50% 55%, oklch(0 0 0) 38%, transparent 72%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at 50% 55%, oklch(0 0 0) 38%, transparent 72%)",
            }}
          />
        </button>
      ))}

      {/* rising petals */}
      {petalsUp.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-blush/60"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 0.7,
            filter: "blur(0.4px)",
            animation: `rise ${p.dur}s linear ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* dust motes */}
      {dust.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-cream"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animation: `twinkle ${d.dur}s ease-in-out ${d.delay}s infinite`,
            boxShadow: "0 0 8px oklch(1 0 0 / 0.8)",
          }}
        />
      ))}

      <div className="pointer-events-none absolute inset-0">
        <Bird delay={2} top="16%" dur={26} />
        <Bird delay={13} top="9%" dur={34} />
        <Bird delay={24} top="22%" dur={30} />
      </div>
    </div>
  );
}
