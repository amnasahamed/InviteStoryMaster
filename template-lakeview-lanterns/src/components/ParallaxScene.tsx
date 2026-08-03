import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import FlyingLanterns from "./FlyingLanterns";
import { wedding } from "../config";

type Offset = { x: number; y: number };

const LAYERS = {
  sky: "./assets/layers/layer-01-sky.png",
  lake: "./assets/layers/layer-02-lake-resort.png",
  deck: "./assets/layers/layer-03-deck.png",
  couple: "./assets/layers/layer-05-couple.png",
  frame: "./assets/layers/layer-06-frame.png",
};

/** Gentle pointer parallax — depths stay small so motion feels cinematic, not floaty. */
function usePointerParallax() {
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const target = useRef<Offset>({ x: 0, y: 0 });
  const current = useRef<Offset>({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.06;
      current.current.y += (target.current.y - current.current.y) * 0.06;
      const dx = current.current.x;
      const dy = current.current.y;
      setOffset((prev) =>
        Math.abs(prev.x - dx) < 0.05 && Math.abs(prev.y - dy) < 0.05
          ? prev
          : { x: dx, y: dy }
      );
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [reduce]);

  const onMove = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (reduce) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      // Cap motion to ~12px / ~8px at max depth factor 1
      target.current = { x: nx * 12, y: ny * 8 };
    },
    [reduce]
  );

  const onLeave = useCallback(() => {
    target.current = { x: 0, y: 0 };
  }, []);

  return { offset, onMove, onLeave, reduce };
}

/** depth: 0 = static, 1 = full foreground shift. No scale — that was making layers feel drunk. */
function layerStyle(offset: Offset, depth: number): CSSProperties {
  return {
    transform: `translate3d(${offset.x * depth}px, ${offset.y * depth}px, 0)`,
  };
}

export default function ParallaxScene() {
  const { offset, onMove, onLeave, reduce } = usePointerParallax();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setEntered(true), 120);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      className="relative isolate min-h-[100dvh] w-full overflow-hidden bg-dusk-deep"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {/* 1 sky — slowest */}
      <div
        className="absolute inset-[-4%] z-0 will-change-transform"
        style={layerStyle(offset, 0.15)}
      >
        <img
          src={LAYERS.sky}
          alt=""
          className="h-full w-full object-cover object-center"
          draggable={false}
        />
      </div>

      {/* 2 lake + resort */}
      <div
        className="absolute inset-[-3%] z-[1] will-change-transform"
        style={layerStyle(offset, 0.35)}
      >
        <img
          src={LAYERS.lake}
          alt=""
          className="h-full w-full object-cover object-[center_45%]"
          draggable={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dusk-purple/15 via-transparent to-dusk-deep/50" />
        {/* shimmer on an INNER node so it doesn't fight parallax transform */}
        <div className="pointer-events-none absolute inset-0 water-shimmer opacity-40 mix-blend-soft-light" />
      </div>

      {/* pavilion glow */}
      <div
        className="pointer-events-none absolute bottom-[32%] right-[6%] z-[2] h-44 w-44 rounded-full bg-glow-warm/30 blur-3xl candle-flicker sm:h-64 sm:w-64"
        style={layerStyle(offset, 0.4)}
      />

      {/* 3 flying lanterns */}
      <div
        className="absolute inset-0 z-[3] will-change-transform"
        style={layerStyle(offset, 0.55)}
      >
        <FlyingLanterns enabled={entered && !reduce} />
      </div>

      {/* 4 deck */}
      <div
        className="absolute inset-x-[-2%] bottom-[-1%] top-[45%] z-[4] will-change-transform"
        style={layerStyle(offset, 0.75)}
      >
        <img
          src={LAYERS.deck}
          alt=""
          className="deck-mask h-full w-full object-cover object-[center_92%]"
          draggable={false}
        />
      </div>

      {/* candle glows */}
      <div
        className="pointer-events-none absolute bottom-[10%] left-[10%] z-[5] h-24 w-24 rounded-full bg-glow-flame/30 blur-2xl candle-flicker"
        style={layerStyle(offset, 0.8)}
      />
      <div
        className="pointer-events-none absolute bottom-[8%] right-[16%] z-[5] h-16 w-16 rounded-full bg-glow-warm/25 blur-2xl candle-flicker"
        style={{ ...layerStyle(offset, 0.8), animationDelay: "0.8s" }}
      />

      {/* vignette under UI */}
      <div className="pointer-events-none absolute inset-0 z-[6] bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(26,11,36,0.55)_100%)]" />

      {/* 5 gold frame */}
      <div className="pointer-events-none absolute inset-2 z-[10] sm:inset-4">
        <img
          src={LAYERS.frame}
          alt=""
          className="h-full w-full object-fill opacity-90"
          draggable={false}
        />
        <div className="absolute inset-[10px] rounded-[2px] border border-glow-gold/25 sm:inset-[14px]" />
      </div>

      {/* 6 invitation typography */}
      <div className="relative z-[20] flex min-h-[100dvh] flex-col items-center justify-start px-6 pb-[32vh] pt-[10vh] text-center sm:justify-center sm:pb-[28vh] sm:pt-8">
        <motion.div
          className="flex max-w-md flex-col items-center gap-3 rounded-3xl bg-dusk-deep/35 px-5 py-6 backdrop-blur-[3px] sm:bg-dusk-deep/20"
          initial={{ opacity: 0, y: 28 }}
          animate={entered ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[10px] uppercase tracking-[0.42em] text-glow-gold/90 sm:text-[11px]">
            Together with their families
          </p>

          <div className="my-1 opacity-80">
            <Flourish />
          </div>

          <p className="font-display max-w-xs text-[11px] uppercase leading-relaxed tracking-[0.22em] text-[#f7e9d2]/80 sm:text-xs">
            We joyfully invite you to celebrate the wedding of
          </p>

          <h1 className="font-script text-gold mt-1 text-[3.4rem] leading-none drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] sm:text-7xl">
            {wedding.groom} and {wedding.bride}
          </h1>

          <div className="mt-4 flex items-center gap-4 text-glow-gold">
            <span className="h-px w-10 bg-glow-gold/50" />
            <div className="flex flex-col items-center gap-0.5">
              <div className="font-display flex items-baseline gap-3 text-sm uppercase tracking-[0.28em] sm:text-base">
                <span>{wedding.dayLabel}</span>
                <span className="text-2xl font-semibold tracking-normal sm:text-3xl">
                  {wedding.dayNum}
                </span>
                <span>{wedding.monthLabel}</span>
              </div>
              <span className="font-display text-lg tracking-[0.2em]">
                {wedding.yearLabel}
              </span>
            </div>
            <span className="h-px w-10 bg-glow-gold/50" />
          </div>

          <p className="font-display mt-2 text-[11px] uppercase tracking-[0.28em] text-[#f7e9d2]/75">
            {wedding.timeLabel}
          </p>

          <div className="mt-3 flex flex-col items-center gap-1">
            <MapPinIcon />
            <p className="font-display text-base uppercase tracking-[0.22em] text-glow-gold sm:text-lg">
              {wedding.venue.name}
            </p>
            <p className="font-display text-sm italic text-[#f7e9d2]/70">
              {wedding.venue.address}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-glow-gold/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: entered ? 1 : 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <span className="text-[9px] uppercase tracking-[0.35em]">Scroll</span>
          <motion.span
            className="block h-8 w-px bg-gradient-to-b from-glow-gold to-transparent"
            animate={{ scaleY: [0.6, 1, 0.6], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* 7 couple — TOPMOST layer (above text + frame) */}
      <div
        className="pointer-events-none absolute bottom-[2%] left-[2%] z-[40] w-[48%] max-w-[300px] will-change-transform sm:bottom-[3%] sm:left-[3%] sm:w-[36%] md:max-w-[340px]"
        style={layerStyle(offset, 1)}
      >
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: entered ? 1 : 0, y: entered ? 0 : 36 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            src={LAYERS.couple}
            alt={`${wedding.groom} and ${wedding.bride}`}
            className="h-auto w-full select-none drop-shadow-[0_18px_40px_rgba(0,0,0,0.55)]"
            draggable={false}
            animate={reduce ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function Flourish() {
  return (
    <svg width="72" height="14" viewBox="0 0 72 14" fill="none" aria-hidden>
      <path
        d="M2 7c8-6 14-6 22 0s14 6 22 0 14-6 24 0"
        stroke="url(#g)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="36" cy="7" r="2.2" fill="#D4AF37" opacity="0.9" />
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="72" y2="0">
          <stop stopColor="#D4AF37" stopOpacity="0" />
          <stop offset="0.5" stopColor="#D4AF37" />
          <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden>
      <path
        d="M7 1.5c-2.9 0-5.25 2.3-5.25 5.15C1.75 10.4 7 16.5 7 16.5s5.25-6.1 5.25-9.85C12.25 3.8 9.9 1.5 7 1.5Z"
        stroke="#D4AF37"
        strokeWidth="1.2"
      />
      <circle cx="7" cy="6.5" r="1.7" fill="#D4AF37" />
    </svg>
  );
}
