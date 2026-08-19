import { useEffect, useRef } from "react";

type Petal = {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  rot: number;
  rotSpeed: number;
  alpha: number;
  hue: number;
};

export default function FallingPetals({
  count = 28,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const petals: Petal[] = [];
    const reduce =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = reduce ? Math.min(8, count) : count;

    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const spawn = (fromTop = false): Petal => ({
      x: Math.random() * window.innerWidth,
      y: fromTop ? -20 - Math.random() * 80 : Math.random() * window.innerHeight,
      r: 3 + Math.random() * 6,
      speed: 0.35 + Math.random() * 0.85,
      drift: (Math.random() - 0.5) * 0.55,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      alpha: 0.35 + Math.random() * 0.45,
      hue: 330 + Math.random() * 25,
    });

    for (let i = 0; i < n; i++) petals.push(spawn());

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const p of petals) {
        p.y += p.speed;
        p.x += p.drift + Math.sin(p.y * 0.012) * 0.35;
        p.rot += p.rotSpeed;
        if (p.y > window.innerHeight + 30) {
          Object.assign(p, spawn(true));
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha;
        const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, p.r);
        grd.addColorStop(0, `hsla(${p.hue}, 70%, 78%, 1)`);
        grd.addColorStop(1, `hsla(${p.hue}, 55%, 55%, 0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r * 1.3, p.r * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-40 ${className}`}
    />
  );
}
