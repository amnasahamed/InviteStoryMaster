import { useEffect, useRef, useState } from "react";
import coupleImg from "@/assets/couple.png";
import { playShutter } from "./audio";
import { burstPetals } from "./effects";
import { useReveal } from "./useReveal";

function makeWallpaper(): string {
  const c = document.createElement("canvas");
  c.width = 1080;
  c.height = 1920;
  const g = c.getContext("2d");
  if (!g) return "";

  const grad = g.createLinearGradient(0, 0, 0, c.height);
  grad.addColorStop(0, "#cfe3f5");
  grad.addColorStop(0.45, "#f6efe2");
  grad.addColorStop(1, "#f3d9c9");
  g.fillStyle = grad;
  g.fillRect(0, 0, c.width, c.height);

  for (let i = 0; i < 240; i++) {
    g.beginPath();
    g.fillStyle = `rgba(255,255,255,${0.05 + Math.random() * 0.25})`;
    g.arc(Math.random() * c.width, Math.random() * c.height, Math.random() * 6, 0, Math.PI * 2);
    g.fill();
  }

  for (let i = 0; i < 26; i++) {
    g.beginPath();
    g.fillStyle = `rgba(233,167,166,${0.25 + Math.random() * 0.35})`;
    g.ellipse(
      Math.random() * c.width,
      Math.random() * c.height,
      14 + Math.random() * 18,
      8 + Math.random() * 10,
      Math.random() * Math.PI,
      0,
      Math.PI * 2,
    );
    g.fill();
  }

  g.textAlign = "center";
  g.fillStyle = "#5a4436";
  g.font = "300 96px 'Cormorant Garamond', Georgia, serif";
  g.fillText("Amaan  ♡  Fatima", c.width / 2, 880);

  g.font = "300 44px 'Jost', sans-serif";
  g.fillStyle = "#7d6553";
  g.fillText("12 · DECEMBER · 2026", c.width / 2, 970);

  g.font = "300 58px 'Cormorant Garamond', Georgia, serif";
  g.fillStyle = "#8a5b52";
  g.fillText("Thank you for being", c.width / 2, 1160);
  g.fillText("part of our story.", c.width / 2, 1240);

  g.strokeStyle = "rgba(138,91,82,0.35)";
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(c.width / 2 - 120, 1310);
  g.lineTo(c.width / 2 + 120, 1310);
  g.stroke();

  return c.toDataURL("image/png");
}

/** They walk away… then run back for one last selfie. */
export function Finale() {
  const { ref, shown } = useReveal<HTMLDivElement>(0.45);
  const [phase, setPhase] = useState<"idle" | "leaving" | "returning" | "count" | "flash" | "done">(
    "idle",
  );
  const [count, setCount] = useState(3);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!shown || phase !== "idle") return;
    const push = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
    push(() => setPhase("leaving"), 600);
    push(() => setPhase("returning"), 3200);
    push(() => setPhase("count"), 4600);
    push(() => setCount(2), 5500);
    push(() => setCount(1), 6400);
    push(() => {
      setPhase("flash");
      playShutter();
      burstPetals({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        count: 50,
        kind: "butterfly",
        spread: 1.6,
      });
    }, 7300);
    push(() => setPhase("done"), 8600);
    return () => {
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
    };
  }, [shown, phase]);

  const away = phase === "leaving";
  const back = phase === "returning" || phase === "count" || phase === "flash" || phase === "done";

  const download = () => {
    const url = makeWallpaper();
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = "amaan-fatima-thank-you.png";
    a.click();
  };

  return (
    <div ref={ref} className="relative flex min-h-[92vh] flex-col items-center justify-center gap-8">
      <div
        className="relative w-full max-w-[420px]"
        style={{
          transform: away
            ? "translate3d(18vw, -6vh, 0) scale(0.55) rotate(4deg)"
            : back
              ? "translate3d(0, 0, 0) scale(1)"
              : "translate3d(0, 0, 0) scale(0.95)",
          opacity: away ? 0.25 : 1,
          filter: away ? "blur(6px)" : "blur(0px)",
          transition:
            "transform 2.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 2.2s ease, filter 2.2s ease",
        }}
      >
        <img
          src={coupleImg}
          alt="Amaan and Fatima running back for one last selfie"
          width={1280}
          height={1280}
          loading="lazy"
          className="w-full select-none"
          style={{ filter: "drop-shadow(0 30px 50px oklch(0.4 0.06 40 / 0.25))" }}
        />
      </div>

      <div className="min-h-24 text-center">
        {phase === "leaving" && (
          <p className="font-hand animate-fade-in pb-[0.18em] text-3xl leading-[1.5] text-muted-foreground">
            walking into the clouds…
          </p>
        )}
        {phase === "returning" && (
          <p className="font-display animate-fade-in text-4xl text-ink">Wait!</p>
        )}
        {phase === "count" && (
          <p key={count} className="font-display text-6xl text-primary" style={{ animation: "pop-in 0.5s both" }}>
            {count}…
          </p>
        )}
        {(phase === "flash" || phase === "done") && (
          <p className="font-display text-3xl text-ink">One last selfie 📸</p>
        )}
      </div>

      {phase === "done" && (
        <div className="flex flex-col items-center gap-5 text-center" style={{ animation: "pop-in 0.9s both" }}>
          <p className="font-hand pb-[0.18em] leading-[1.5] text-3xl text-primary">
            Thank you for being part of our story.
          </p>
          <button
            type="button"
            onClick={download}
            className="rounded-full px-8 py-4 text-sm tracking-[0.16em] text-primary-foreground uppercase transition-transform duration-300 hover:scale-105"
            style={{ background: "var(--primary)", boxShadow: "var(--shadow-lift)" }}
          >
            Keep the photo
          </button>
        </div>
      )}

      {phase === "flash" && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-40 bg-cream"
          style={{ animation: "flash 1.1s ease-out both" }}
        />
      )}
    </div>
  );
}
