"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { wedding } from "@/lib/wedding";

/** Fine gold arabesque used as foil on the envelope paper. */
const foil =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23b98b3f' stroke-width='0.8'%3E%3Crect x='16' y='16' width='48' height='48'/%3E%3Crect x='16' y='16' width='48' height='48' transform='rotate(45 40 40)'/%3E%3Ccircle cx='40' cy='40' r='9'/%3E%3C/g%3E%3C/svg%3E\")";

/** Ornate gilded corner flourish for the outer frame. */
function FrameCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 64 64"
      className={`pointer-events-none absolute h-16 w-16 text-gold/70 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M2 62V22C2 11 11 2 22 2h40" />
      <path d="M8 62V24c0-9 7-16 16-16h38" opacity="0.55" />
      <path d="M14 30c8 0 14-6 14-14" opacity="0.8" />
      <circle cx="21" cy="21" r="2.4" fill="currentColor" stroke="none" />
      <path d="M28 16c5-4 11-4 16 0-5 4-11 4-16 0Z" opacity="0.9" />
      <path d="M16 28c-4 5-4 11 0 16 4-5 4-11 0-16Z" opacity="0.9" />
    </svg>
  );
}

/**
 * Full-screen "sealed invitation" intro, painted as a Ghibli dawn meadow.
 * Tap the wax seal -> the flap swings open, the card lifts out, petals burst,
 * then the whole scene lifts away like a curtain.
 */
export function EnvelopeIntro({
  open,
  onOpen,
}: {
  open: boolean;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();
  const [breaking, setBreaking] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleOpen = () => {
    if (breaking) return;
    if (reduce) {
      onOpen();
      return;
    }
    setBreaking(true);
    window.setTimeout(onOpen, 1150);
  };

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          key="envelope"
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center overflow-hidden bg-sky-mist px-8"
          exit={{ opacity: 0, scale: 1.12, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* painted dawn meadow */}
          <motion.img
            src="/wedding/envelope.jpg"
            alt=""
            aria-hidden
            width={1024}
            height={1536}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            initial={reduce ? {} : { scale: 1.14, opacity: 0 }}
            animate={{ scale: breaking ? 1.06 : 1, opacity: 1 }}
            transition={{ duration: breaking ? 1.2 : 2.2, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* light wash so type stays legible */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--sky-mist) 62%, transparent) 0%, transparent 34%, color-mix(in oklab, var(--background) 40%, transparent) 100%)",
            }}
          />
          {/* painterly vignette to focus the centre */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(78% 58% at 50% 48%, transparent 42%, color-mix(in oklab, var(--foreground) 24%, transparent) 100%)",
            }}
          />
          {/* warm sun bloom behind the envelope */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(48% 34% at 50% 47%, color-mix(in oklab, var(--gold) 34%, transparent), transparent 72%)",
            }}
            animate={reduce ? {} : { opacity: [0.6, 0.95, 0.6] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* slow god-rays sweeping across the meadow */}
          {!reduce && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-y-24 inset-x-0 origin-top"
              style={{
                background:
                  "repeating-linear-gradient(102deg, transparent 0px, transparent 46px, color-mix(in oklab, var(--gold) 16%, transparent) 52px, transparent 70px)",
                maskImage: "radial-gradient(70% 60% at 50% 10%, black, transparent 80%)",
                WebkitMaskImage: "radial-gradient(70% 60% at 50% 10%, black, transparent 80%)",
              }}
              animate={{ opacity: [0.25, 0.6, 0.25], rotate: [-1.5, 1.5, -1.5] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* gilded outer frame */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-4 rounded-[1.75rem] border border-gold/45"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: breaking ? 0 : 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="absolute inset-[7px] rounded-[1.4rem] border border-gold/25" />
            <FrameCorner className="-left-1 -top-1" />
            <FrameCorner className="-right-1 -top-1 scale-x-[-1]" />
            <FrameCorner className="-bottom-1 -left-1 scale-y-[-1]" />
            <FrameCorner className="-bottom-1 -right-1 scale-[-1]" />
          </motion.div>

          {/* drifting light motes */}
          {!reduce &&
            Array.from({ length: 22 }, (_, i) => (
              <motion.span
                key={i}
                aria-hidden
                className="pointer-events-none absolute rounded-full bg-gold/60 blur-[1px]"
                style={{
                  left: `${(i * 61) % 100}%`,
                  top: `${(i * 37) % 100}%`,
                  width: 3 + (i % 4),
                  height: 3 + (i % 4),
                }}
                animate={{ y: [0, -34, 0], opacity: [0, 0.9, 0] }}
                transition={{
                  duration: 7 + (i % 5),
                  delay: (i * 0.6) % 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

          {/* bismillah plaque */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: breaking ? 0 : 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9 }}
            className="relative flex flex-col items-center"
          >
            <p
              className="font-display text-[1.7rem] leading-relaxed text-[color-mix(in_oklab,var(--gold)_78%,black)] drop-shadow-[0_1px_10px_rgba(255,255,255,0.9)]"
              dir="rtl"
              lang="ar"
            >
              {wedding.bismillah}
            </p>
            <span className="mt-3 flex items-center gap-2 text-gold/80">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/70" />
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M8 1.5 9.6 6.4 14.5 8 9.6 9.6 8 14.5 6.4 9.6 1.5 8 6.4 6.4Z"
                  stroke="currentColor"
                  strokeWidth="0.9"
                />
              </svg>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/70" />
            </span>
            <p className="mt-3 text-[0.55rem] uppercase tracking-[0.5em] text-foreground/70">
              A wedding invitation
            </p>
          </motion.div>

          <motion.button
            type="button"
            onClick={handleOpen}
            aria-label="Open the invitation"
            className="group relative mt-9 outline-none"
            style={{ perspective: 900 }}
            initial={{ opacity: 0, y: 30, rotateX: -14 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ scale: 0.97 }}
          >
            {/* soft shadow the envelope floats above */}
            <motion.span
              aria-hidden
              className="absolute -bottom-6 left-1/2 h-5 w-56 -translate-x-1/2 rounded-[100%] bg-foreground/25 blur-lg"
              animate={reduce ? {} : { scaleX: [1, 0.88, 1], opacity: [0.5, 0.32, 0.5] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="relative h-52 w-[19rem]"
              animate={
                breaking && !reduce
                  ? { y: -26, scale: 1.06, rotateX: 8 }
                  : reduce
                    ? {}
                    : { y: [0, -6, 0] }
              }
              transition={
                breaking
                  ? { duration: 1.1, ease: [0.22, 1, 0.36, 1] }
                  : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
              }
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* envelope body (front) */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl border border-gold/45 bg-[color-mix(in_oklab,var(--card)_92%,var(--gold))] shadow-soft">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.14]"
                  style={{ backgroundImage: foil, backgroundSize: "80px 80px" }}
                />
                {/* folded paper edges */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, transparent 48%, color-mix(in oklab, var(--gold) 18%, transparent) 50%, transparent 52%), linear-gradient(225deg, transparent 48%, color-mix(in oklab, var(--gold) 18%, transparent) 50%, transparent 52%)",
                  }}
                />
                {/* gentle gold sheen travelling across the paper */}
                {!reduce && !breaking && (
                  <motion.div
                    aria-hidden
                    className="absolute inset-y-0 w-1/3 -skew-x-12"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, color-mix(in oklab, white 65%, transparent), transparent)",
                    }}
                    animate={{ x: ["-140%", "420%"] }}
                    transition={{ duration: 5.5, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
                  />
                )}
                <div className="absolute inset-3 rounded-xl border border-gold/25" />
                {/* addressed to line */}
                <p className="absolute inset-x-0 bottom-5 text-center text-[0.5rem] uppercase tracking-[0.42em] text-muted-foreground">
                  To our dearest guest
                </p>
              </div>

              {/* flap */}
              <motion.div
                aria-hidden
                className="absolute inset-x-0 top-0 h-28 origin-top"
                style={{
                  background:
                    "linear-gradient(180deg, color-mix(in oklab, var(--gold) 26%, var(--card)), color-mix(in oklab, var(--gold) 8%, var(--card)))",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
                animate={breaking && !reduce ? { rotateX: -168 } : { rotateX: 0 }}
                transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
              />

              {/* wax seal */}
              <motion.span
                className="absolute left-1/2 top-[40%] z-20 flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 items-center justify-center rounded-full font-display text-xl text-gold-foreground shadow-soft"
                style={{
                  background:
                    "radial-gradient(circle at 34% 28%, color-mix(in oklab, var(--gold) 60%, white), var(--gold) 58%, color-mix(in oklab, var(--gold) 70%, black))",
                }}
                animate={
                  breaking && !reduce
                    ? { scale: 1.5, opacity: 0, rotate: 18 }
                    : reduce
                      ? {}
                      : { scale: [1, 1.05, 1] }
                }
                transition={
                  breaking
                    ? { duration: 0.55, ease: "easeOut" }
                    : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
                }
              >
                {/* stamped ring detail */}
                <span
                  aria-hidden
                  className="absolute inset-[6px] rounded-full border border-dashed border-[color-mix(in_oklab,var(--gold)_45%,black)]/40"
                />
                {wedding.bride.name[0]}
                <span className="mx-0.5 text-xs italic">&amp;</span>
                {wedding.groom.name[0]}
              </motion.span>

              {/* seal halo */}
              <motion.span
                aria-hidden
                className="absolute left-1/2 top-[40%] z-10 h-[4.5rem] w-[4.5rem] -translate-x-1/2 rounded-full ring-1 ring-gold/60"
                animate={reduce || breaking ? { opacity: 0 } : { scale: [1, 2], opacity: [0.55, 0] }}
                transition={{ duration: 2.6, repeat: breaking ? 0 : Infinity, ease: "easeOut" }}
              />

              {/* inner card lifting out */}
              <motion.div
                className={`absolute inset-x-5 bottom-6 top-8 rounded-lg border border-gold/35 bg-[color-mix(in_oklab,var(--background)_94%,var(--gold))] px-4 pt-5 text-center shadow-soft`}
                initial={{ opacity: 0, y: 0 }}
                animate={breaking && !reduce ? { y: -84, opacity: 1 } : { y: 0, opacity: 0 }}
                transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[0.55rem] uppercase tracking-[0.38em] text-muted-foreground">
                  Together with their families
                </p>
                <p className="mt-3 font-display text-2xl text-foreground">
                  {wedding.bride.name} <span className="italic text-gold">&amp;</span>{" "}
                  {wedding.groom.name}
                </p>
                <p className="mt-2 text-[0.55rem] uppercase tracking-[0.3em] text-gold">
                  {wedding.dateLabel}
                </p>
              </motion.div>


              {/* petal burst on unsealing */}
              {breaking &&
                !reduce &&
                Array.from({ length: 18 }, (_, i) => (
                  <motion.span
                    key={i}
                    aria-hidden
                    className={`absolute left-1/2 top-[42%] h-2 w-2 rounded-[100%_0_100%_0] ${
                      i % 3 === 0 ? "bg-blossom" : i % 3 === 1 ? "bg-gold/80" : "bg-sky"
                    }`}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                    animate={{
                      x: Math.cos((i / 18) * Math.PI * 2) * 165,
                      y: Math.sin((i / 18) * Math.PI * 2) * 130 - 30,
                      rotate: 240,
                      opacity: 0,
                      scale: 1.2,
                    }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                  />
                ))}
            </motion.div>
          </motion.button>

          {/* couple names + prompt */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: breaking ? 0 : 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9 }}
            className="relative mt-9 flex flex-col items-center"
          >
            <p className="font-display text-[2.1rem] leading-none text-[color-mix(in_oklab,var(--gold)_72%,black)] drop-shadow-[0_2px_12px_rgba(255,255,255,0.85)]">
              {wedding.bride.name} <span className="italic">&amp;</span> {wedding.groom.name}
            </p>
            <p className="mt-3 text-[0.55rem] uppercase tracking-[0.42em] text-foreground drop-shadow-[0_1px_8px_rgba(255,255,255,0.9)]">
              {wedding.dateLabel}
            </p>

            <motion.p
              className="mt-6 flex flex-col items-center gap-2 rounded-full border border-gold/40 bg-card/70 px-5 py-2 text-[0.6rem] uppercase tracking-[0.42em] text-foreground backdrop-blur-sm"

              animate={reduce ? {} : { opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              Tap the seal to open
              <motion.svg
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
                aria-hidden
                className="text-gold"
                animate={reduce ? {} : { y: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M1 1l8 7 8-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </motion.svg>
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
