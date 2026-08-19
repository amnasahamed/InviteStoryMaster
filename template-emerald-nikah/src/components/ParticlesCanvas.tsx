import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
  growing: boolean;
  baseRadius: number;
}

export function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const count = Math.min(40, Math.floor(width / 25));
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const baseRadius = Math.random() * 1.5 + 0.6;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: baseRadius,
        baseRadius,
        speedY: -(Math.random() * 0.4 + 0.15),
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.7 + 0.2,
        fadeSpeed: Math.random() * 0.008 + 0.003,
        growing: Math.random() > 0.5,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // Pulsing glow
        if (p.growing) {
          p.opacity += p.fadeSpeed;
          if (p.opacity >= 0.85) p.growing = false;
        } else {
          p.opacity -= p.fadeSpeed;
          if (p.opacity <= 0.15) p.growing = true;
        }

        // Float movement
        p.y += p.speedY;
        p.x += p.speedX;

        // Wrap around screen
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Draw golden particle with subtle soft halo
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.8);
        gradient.addColorStop(0, `rgba(245, 215, 130, ${p.opacity})`);
        gradient.addColorStop(0.5, `rgba(218, 165, 32, ${p.opacity * 0.5})`);
        gradient.addColorStop(1, "rgba(218, 165, 32, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.8, 0, Math.PI * 2);
        ctx.fill();

        // Inner bright spark
        ctx.fillStyle = `rgba(255, 248, 220, ${Math.min(1, p.opacity + 0.2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 h-full w-full opacity-60"
    />
  );
}

export default ParticlesCanvas;
