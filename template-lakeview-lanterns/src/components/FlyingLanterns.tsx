import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Lantern = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  opacity: number;
  bottom: number;
  launched?: boolean;
};

const SPRITE = "./assets/layers/lantern-sprite.png";

function makeAmbient(count: number): Lantern[] {
  return Array.from({ length: count }, (_, i) => {
    const depth = Math.random();
    return {
      id: i,
      left: 4 + Math.random() * 92,
      size: 28 + depth * 70,
      duration: 18 + Math.random() * 22,
      delay: Math.random() * -24,
      sway: 10 + Math.random() * 28,
      opacity: 0.35 + depth * 0.55,
      bottom: -5 - Math.random() * 25,
    };
  });
}

function LanternEl({ lantern }: { lantern: Lantern }) {
  return (
    <motion.div
      className="pointer-events-none absolute will-change-transform"
      style={
        {
          left: `${lantern.left}%`,
          bottom: `${lantern.bottom}%`,
          width: lantern.size,
          opacity: lantern.opacity,
          animation: `lantern-float ${lantern.duration}s linear ${lantern.delay}s infinite`,
          zIndex: Math.round(lantern.size),
        } as CSSProperties
      }
      initial={lantern.launched ? { opacity: 0, scale: 0.6 } : undefined}
      animate={lantern.launched ? { opacity: lantern.opacity, scale: 1 } : undefined}
    >
      <img
        src={SPRITE}
        alt=""
        draggable={false}
        className="h-auto w-full select-none drop-shadow-[0_0_18px_rgba(255,179,71,0.55)]"
        style={{
          animation: `candle-flicker ${2 + (lantern.id % 5) * 0.35}s ease-in-out infinite`,
        }}
      />
    </motion.div>
  );
}

export default function FlyingLanterns({
  enabled = true,
}: {
  enabled?: boolean;
}) {
  const ambient = useMemo(() => makeAmbient(16), []);
  const [launched, setLaunched] = useState<Lantern[]>([]);
  const nextId = useRef(1000);

  const releaseLantern = useCallback(() => {
    const id = nextId.current++;
    const lantern: Lantern = {
      id,
      left: 20 + Math.random() * 60,
      size: 56 + Math.random() * 40,
      duration: 14 + Math.random() * 8,
      delay: 0,
      sway: 16 + Math.random() * 20,
      opacity: 0.95,
      bottom: -8,
      launched: true,
    };
    setLaunched((prev) => [...prev.slice(-8), lantern]);
    window.setTimeout(() => {
      setLaunched((prev) => prev.filter((l) => l.id !== id));
    }, lantern.duration * 1000);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "l") releaseLantern();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, releaseLantern]);

  if (!enabled) return null;

  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <AnimatePresence>
          {ambient.map((l) => (
            <LanternEl key={l.id} lantern={l} />
          ))}
          {launched.map((l) => (
            <LanternEl key={l.id} lantern={l} />
          ))}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={releaseLantern}
        className="group pointer-events-auto fixed bottom-6 right-5 z-50 flex items-center gap-2 rounded-full border border-glow-gold/35 bg-dusk-deep/55 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-glow-gold backdrop-blur-md transition-all duration-500 hover:border-glow-gold/70 hover:bg-dusk-deep/75 active:scale-[0.97] sm:bottom-8 sm:right-8"
        aria-label="Release a sky lantern"
      >
        <span className="inline-block h-2 w-2 rounded-full bg-glow-warm shadow-lantern transition-transform group-hover:scale-125" />
        Release a lantern
      </button>
    </>
  );
}
