import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import doorPanel from "@/assets/door-panel.png";
import { invitation } from "@/config/invitation";

type Props = {
  onOpen: () => void;
};

const DOOR_THICKNESS = 26;

/** Full-screen Mughal doors shown on first paint; tapping the ring opens the invite. */
export function DoorGate({ onOpen }: Props) {
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);

  /* Hard scroll lock: html + body + touch, so nothing moves behind the doors. */
  useEffect(() => {
    if (gone) return;
    const html = document.documentElement;
    const body = document.body;
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      position: body.style.position,
      width: body.style.width,
      touch: body.style.touchAction,
      overscroll: html.style.overscrollBehavior,
    };

    window.scrollTo(0, 0);
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.width = "100%";
    body.style.touchAction = "none";

    const block = (e: TouchEvent) => {
      if (!(e.target as HTMLElement)?.closest?.("[data-gate-scrollable]")) e.preventDefault();
    };
    window.addEventListener("touchmove", block, { passive: false });

    return () => {
      html.style.overflow = prev.htmlOverflow;
      html.style.overscrollBehavior = prev.overscroll;
      body.style.overflow = prev.bodyOverflow;
      body.style.position = prev.position;
      body.style.width = prev.width;
      body.style.touchAction = prev.touch;
      window.removeEventListener("touchmove", block);
      window.scrollTo(0, 0);
    };
  }, [gone]);

  function handleOpen() {
    if (opening) return;
    setOpening(true);
    onOpen();
    window.setTimeout(() => setGone(true), 1500);
  }

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* light spilling through as the doors part */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--color-gold) 55%, white) 0%, var(--color-paper) 45%, var(--color-paper) 100%)",
            }}
            initial={{ opacity: 0.2 }}
            animate={opening ? { opacity: 1 } : { opacity: 0.2 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          />

          {/* brown wood-textured wall behind the doors; fades out with them */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundColor: "#3a2415",
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(0,0,0,0.28) 0px, rgba(0,0,0,0) 3px, rgba(255,255,255,0.045) 7px, rgba(0,0,0,0) 12px), repeating-linear-gradient(0deg, rgba(0,0,0,0.16) 0px, rgba(0,0,0,0) 9px, rgba(120,72,36,0.18) 18px, rgba(0,0,0,0) 26px), radial-gradient(circle at 50% 45%, rgba(196,138,62,0.35), rgba(0,0,0,0.55) 75%)",
            }}
            initial={{ opacity: 1 }}
            animate={opening ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.72, ease: "easeOut" }}
          />

          {/* 3D stage — gives the doors real depth and thickness */}
          <div
            className="absolute inset-0"
            style={{
              perspective: "max(1500px, 220vw)",
              perspectiveOrigin: "50% 45%",
            }}
          >
            {[0, 1].map((side) => {
              const left = side === 0;
              return (
                <motion.div
                  key={side}
                  className="absolute top-0 bottom-0 w-1/2"
                  style={{
                    left: left ? 0 : "50%",
                    transformOrigin: left ? "left center" : "right center",
                    transformStyle: "preserve-3d",
                  }}
                  initial={{ rotateY: 0, opacity: 1 }}
                  animate={
                    opening
                      ? {
                          rotateY: left ? 74 : -74,
                          x: left ? "-14%" : "14%",
                          opacity: 0,
                        }
                      : { rotateY: 0, x: "0%", opacity: 1 }
                  }
                  transition={{
                    rotateY: { duration: 1.35, ease: [0.42, 0, 0.25, 1] },
                    x: { duration: 1.35, ease: [0.42, 0, 0.25, 1] },
                    opacity: { duration: 0.6, delay: 0.72, ease: "easeOut" },
                  }}
                >

                  {/* door face — fills its half exactly: seam meets in the centre,
                      outer edge flush to the screen side, art scales with the viewport */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={doorPanel}
                      alt=""
                      width={640}
                      height={1280}
                      className="h-full w-full object-cover object-center"
                      style={{
                        transform: left ? undefined : "scaleX(-1)",
                      }}
                    />


                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background: left
                          ? "linear-gradient(to right, rgba(0,0,0,0.34), rgba(0,0,0,0) 55%, rgba(0,0,0,0.18))"
                          : "linear-gradient(to left, rgba(0,0,0,0.34), rgba(0,0,0,0) 55%, rgba(0,0,0,0.18))",
                      }}
                    />
                  </div>

                  {/* inner edge — the visible thickness of the door slab */}
                  <div
                    aria-hidden
                    className="absolute top-0 bottom-0"
                    style={{
                      width: DOOR_THICKNESS,
                      [left ? "right" : "left"]: 0,
                      transformOrigin: left ? "right center" : "left center",
                      transform: `rotateY(${left ? -90 : 90}deg)`,
                      background: left
                        ? "linear-gradient(to right, #2b1a10, #6b4a2a 45%, #3a2415)"
                        : "linear-gradient(to left, #2b1a10, #6b4a2a 45%, #3a2415)",
                      boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)",
                    }}
                  />

                  {/* brass handle */}
                  <div
                    aria-hidden
                    className="border-gold/60 absolute top-1/2 size-7 -translate-y-1/2 rounded-full border-2 bg-gradient-to-br from-amber-200/70 to-amber-700/60 shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                    style={{ [left ? "right" : "left"]: 18 }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* centre invitation prompt */}
          <motion.div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
            animate={opening ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-kicker text-[0.6rem] tracking-[0.4em] text-white/80 uppercase">
              You are invited
            </p>
            <p className="font-script mt-2 text-4xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
              {invitation.couple.monogram}
            </p>

            <motion.button
              type="button"
              onClick={handleOpen}
              className="border-gold/70 text-gold pointer-events-auto mt-8 flex h-24 w-24 items-center justify-center rounded-full border-2 bg-black/30 backdrop-blur-[2px]"
              aria-label="Open the invitation"
              animate={{ scale: [1, 1.07, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              whileTap={{ scale: 0.92 }}
            >
              <span className="font-kicker text-[0.55rem] tracking-[0.25em] uppercase">Open</span>
            </motion.button>

            <p className="font-body mt-5 text-xs text-white/70">Tap the ring to open the doors</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
