import { useEffect, useRef, useState } from "react";

/** Reveals an element once it enters the viewport (camera-pull feel). */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold, rootMargin: "-8% 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, shown };
}

/** Normalized pointer position (-1..1) for parallax + eye tracking. */
export function usePointer() {
  const [p, setP] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      setP({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return p;
}

/** Device tilt (-1..1) so the groom's hand follows the phone. */
export function useTilt() {
  const [t, setT] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onOrient = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0; // left/right
      const beta = e.beta ?? 0; // front/back
      setT({
        x: Math.max(-1, Math.min(1, gamma / 35)),
        y: Math.max(-1, Math.min(1, (beta - 45) / 45)),
      });
    };
    window.addEventListener("deviceorientation", onOrient);
    return () => window.removeEventListener("deviceorientation", onOrient);
  }, []);

  return t;
}

/** Scroll progress of the whole document, 0..1. */
export function useScrollProgress() {
  const [y, setY] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return y;
}
