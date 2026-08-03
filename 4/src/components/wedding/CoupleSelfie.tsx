import { useEffect, useMemo, useRef, useState } from "react";
import coupleImg from "@/assets/couple.png";
import { burstPetals } from "./effects";
import { usePointer, useTilt } from "./useReveal";

type Props = {
  /** 0 = tucked above the fold, 1 = fully arrived */
  arrival: number;
  showBubble: boolean;
};

/**
 * The selfie. Eyes follow the pointer, the reaching arm follows device tilt,
 * hovering each side changes the mood, and the bouquet explodes into petals.
 */
/**
 * A soft-edged crop of the illustration around one eye. Nudging it by a couple
 * of pixels makes the painted gaze follow the pointer with no visible seam.
 */
function EyePatch({
  cx,
  cy,
  w,
  h,
  eye,
  strength,
}: {
  cx: number;
  cy: number;
  w: number;
  h: number;
  eye: { x: number; y: number };
  strength: number;
}) {
  const mask = "radial-gradient(ellipse at center, oklch(0 0 0) 42%, transparent 74%)";
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute overflow-hidden"
      style={{
        left: `${cx - w / 2}%`,
        top: `${cy - h / 2}%`,
        width: `${w}%`,
        height: `${h}%`,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      <span
        className="block h-full w-full"
        style={{
          backgroundImage: `url(${coupleImg})`,
          backgroundSize: `${100 / (w / 100)}% auto`,
          backgroundPosition: `${((cx - w / 2) / (100 - w)) * 100}% ${((cy - h / 2) / (100 - h)) * 100}%`,
          transform: `translate(${eye.x * 0.55 * strength}px, ${eye.y * 0.55 * strength}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />
    </span>
  );
}

export function CoupleSelfie({ arrival, showBubble }: Props) {
  const pointer = usePointer();
  const tilt = useTilt();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [side, setSide] = useState<"none" | "groom" | "bride">("none");
  const [glassesFlash, setGlassesFlash] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    if (!note) return;
    const t = window.setTimeout(() => setNote(null), 4200);
    return () => window.clearTimeout(t);
  }, [note]);

  useEffect(() => {
    const onShake = (e: DeviceMotionEvent) => {
      const a = e.accelerationIncludingGravity;
      if (!a) return;
      const mag = Math.abs(a.x ?? 0) + Math.abs(a.y ?? 0) + Math.abs(a.z ?? 0);
      if (mag > 42) {
        const r = wrapRef.current?.getBoundingClientRect();
        burstPetals({
          x: (r?.left ?? 0) + (r?.width ?? window.innerWidth) / 2,
          y: (r?.top ?? 0) + (r?.height ?? window.innerHeight) / 2,
          count: 36,
          spread: 1.5,
        });
      }
    };
    window.addEventListener("devicemotion", onShake);
    return () => window.removeEventListener("devicemotion", onShake);
  }, []);

  const eye = useMemo(
    () => ({ x: pointer.x * 5, y: pointer.y * 3.5 }),
    [pointer.x, pointer.y],
  );

  const handShift = tilt.x * 16 + pointer.x * 6;
  const handLift = tilt.y * 10;

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full max-w-[640px] select-none"
      style={{
        transform: `translate3d(${pointer.x * -10}px, ${(1 - arrival) * -46}vh, 0) rotate(${pointer.x * 0.8}deg)`,
        transition: "transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        style={{
          animation: "float-soft 9s ease-in-out infinite",
          filter: "drop-shadow(0 40px 60px oklch(0.4 0.06 40 / 0.28))",
        }}
      >
        <div
          className="relative"
          style={{
            transform: `perspective(1200px) rotateY(${handShift * 0.28}deg) rotateX(${handLift * -0.25}deg)`,
            transition: "transform 0.5s ease-out",
            transformOrigin: "20% 60%",
          }}
        >
          <img
            src={coupleImg}
            alt="Amaan and Fatima taking a selfie together, smiling, in soft hand-painted wedding clothes"
            width={1280}
            height={1280}
            className="w-full"
          />

          {/* eyes that follow the cursor: soft-masked crops of the artwork itself */}
          <EyePatch cx={41.5} cy={20.2} w={6.5} h={4.6} eye={eye} strength={1} />
          <EyePatch cx={49.2} cy={20.2} w={6.5} h={4.6} eye={eye} strength={1} />
          <EyePatch cx={54.6} cy={33.4} w={5.6} h={4.2} eye={eye} strength={0.8} />
          <EyePatch cx={61.4} cy={33.4} w={5.6} h={4.2} eye={eye} strength={0.8} />


          {/* groom smile warmth */}
          <span
            aria-hidden
            className="absolute rounded-full transition-opacity duration-700"
            style={{
              left: "34%",
              top: "24%",
              width: "20%",
              height: "10%",
              background:
                "radial-gradient(circle, oklch(0.8 0.11 25 / 0.5), transparent 70%)",
              opacity: side === "groom" ? 1 : 0,
              filter: "blur(8px)",
            }}
          />

          {/* bride sparkle */}
          <span
            aria-hidden
            className="absolute transition-opacity duration-700"
            style={{
              left: "44%",
              top: "62%",
              width: "22%",
              height: "22%",
              opacity: side === "bride" ? 1 : 0,
              background:
                "radial-gradient(circle, oklch(1 0 0 / 0.75), oklch(0.9 0.1 90 / 0.25) 40%, transparent 70%)",
              filter: "blur(6px)",
              animation: "twinkle 1.8s ease-in-out infinite",
            }}
          />

          {/* glasses reflection easter egg */}
          <button
            type="button"
            aria-label="His glasses"
            onClick={() => {
              setGlassesFlash(true);
              window.setTimeout(() => setGlassesFlash(false), 1400);
            }}
            className="absolute cursor-pointer border-0 bg-transparent p-0"
            style={{ left: "36%", top: "17.5%", width: "20%", height: "7%" }}
          >
            <span
              className="block h-full w-full rounded-full transition-opacity duration-500"
              style={{
                opacity: glassesFlash ? 0.95 : 0,
                background:
                  "linear-gradient(100deg, transparent 10%, oklch(0.9 0.06 232 / 0.9) 35%, oklch(1 0 0 / 0.9) 50%, oklch(0.9 0.06 232 / 0.9) 65%, transparent 90%)",
                filter: "blur(1px)",
              }}
            />
          </button>

          {/* bouquet: click to explode */}
          <button
            type="button"
            aria-label="Her bouquet"
            onClick={(e) => {
              burstPetals({ x: e.clientX, y: e.clientY, count: 42, spread: 1.2 });
              setNote("Can't wait to celebrate with you.");
            }}
            onMouseEnter={() => setSide("bride")}
            className="absolute cursor-pointer border-0 bg-transparent p-0"
            style={{ left: "42%", top: "60%", width: "26%", height: "26%" }}
          />

          {/* hover zones */}
          <div
            className="absolute inset-y-0 left-0 w-1/2"
            onMouseEnter={() => setSide("groom")}
            onMouseLeave={() => setSide("none")}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/2"
            onMouseEnter={() => setSide("bride")}
            onMouseLeave={() => setSide("none")}
          />
        </div>
      </div>

      {/* speech bubble */}
      <div
        className="absolute top-[6%] left-[2%] origin-bottom-left sm:left-[-4%]"
        style={{
          opacity: showBubble ? 1 : 0,
          animation: showBubble ? "pop-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both" : undefined,
        }}
      >
        <div
          className="relative rounded-[1.4rem] px-5 py-3 font-body text-sm text-ink backdrop-blur-sm sm:text-base"
          style={{ background: "var(--popover)", boxShadow: "var(--shadow-lift)" }}
        >
          Hey! You&apos;re invited ❤️
          <span
            className="absolute -bottom-2 left-7 h-4 w-4 rotate-45"
            style={{ background: "var(--popover)" }}
          />
        </div>
      </div>

      {/* hidden message */}
      <div
        className="pointer-events-none absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 text-center transition-all duration-700"
        style={{ opacity: note ? 1 : 0, transform: `translate(-50%, ${note ? 0 : 12}px)` }}
      >
        <p className="font-hand pb-[0.18em] leading-[1.5] text-2xl text-primary">{note}</p>
      </div>
    </div>
  );
}
