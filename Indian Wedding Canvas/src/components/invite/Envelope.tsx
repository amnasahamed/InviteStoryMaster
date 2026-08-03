import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import paper from "@/assets/paper.jpg";
import { invite } from "@/config/invite";
import { lockScroll, unlockScroll } from "@/lib/lenis";
import { PetalBurst } from "./PetalBurst";

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * The "wow" moment: the page opens as a sealed paper envelope. Tapping the
 * gold wax seal cracks it, showers marigold petals and parts the paper to
 * reveal the invitation underneath.
 */
export function Envelope({ onOpen }: { onOpen?: () => void }) {
  const reduced = useReducedMotion();
  const [state, setState] = useState<"sealed" | "breaking" | "gone">("sealed");
  const monogram = `${invite.groom[0]} ${invite.bride[0]}`;

  useEffect(() => {
    lockScroll();
    return () => unlockScroll();
  }, []);

  const open = () => {
    if (state !== "sealed") return;
    setState("breaking");
    if (navigator.vibrate) navigator.vibrate([12, 40, 18]);
    window.setTimeout(
      () => {
        setState("gone");
        unlockScroll();
        onOpen?.();
      },
      reduced ? 200 : 1500,
    );
  };

  const parted = state !== "sealed";
  const paperStyle = { backgroundImage: `url(${paper})`, backgroundSize: "480px" };

  const half = (position: "top" | "bottom") => (
    <motion.div
      className={`absolute inset-x-0 h-1/2 overflow-hidden ${position === "top" ? "top-0" : "bottom-0"}`}
      initial={false}
      animate={
        parted
          ? { y: position === "top" ? "-102%" : "102%", rotate: position === "top" ? -1.2 : 1.2 }
          : { y: "0%", rotate: 0 }
      }
      transition={{ duration: reduced ? 0.2 : 1.25, ease: EASE, delay: parted && !reduced ? 0.35 : 0 }}
    >
      <div
        className="grain absolute inset-x-0 h-[100svh] bg-paper"
        style={{ ...paperStyle, [position === "top" ? "top" : "bottom"]: 0 }}
      >
        <div className="flex h-full flex-col items-center justify-center px-8 text-center">
          <p className="caps text-[0.58rem] text-sepia">Save the date</p>
          <p className="script mt-4 text-[2.75rem] leading-tight text-ink">You&apos;re invited</p>
          {/* reserved space for the wax seal that sits on the split line */}
          <div aria-hidden="true" className="h-64 shrink-0" />
          <p className="caps text-[0.6rem] text-olive">{invite.dateLabel}</p>
          <p className="caps mt-4 text-[0.5rem] text-sepia/80">{invite.venue.name}</p>
        </div>
      </div>
      {/* soft fold shadow along the tear line */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 h-6 ${position === "top" ? "bottom-0 bg-gradient-to-b from-transparent to-ink/8" : "top-0 bg-gradient-to-t from-transparent to-ink/5"}`}
      />

    </motion.div>
  );

  return (
    <AnimatePresence>
      {state !== "gone" && (
        <motion.div
          className="fixed inset-0 z-50"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {half("top")}
          {half("bottom")}

          {/* seal + call to action sit above the split line */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-7">
            <AnimatePresence>
              {state === "sealed" && (
                <motion.button
                  type="button"
                  onClick={open}
                  aria-label="Tap the seal to open the invitation"
                  className="relative grid size-28 shrink-0 place-items-center rounded-full"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.9, opacity: 0, rotate: 18 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  whileTap={{ scale: 0.92 }}
                >
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-gold/50"
                    animate={reduced ? {} : { scale: [1, 1.35], opacity: [0.6, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                  />
                  <span
                    aria-hidden="true"
                    className="grid size-20 place-items-center rounded-full bg-gold text-paper shadow-[0_10px_30px_-12px_oklch(0.55_0.12_70)]"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 68% 8%, 88% 6%, 94% 26%, 100% 50%, 94% 74%, 88% 94%, 68% 92%, 50% 100%, 32% 92%, 12% 94%, 6% 74%, 0% 50%, 6% 26%, 12% 6%, 32% 8%)",
                    }}
                  >
                    <span className="script text-2xl tracking-tight">{monogram}</span>
                  </span>
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {state === "sealed" && (
                <motion.span
                  className="caps text-[0.55rem] text-sepia"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.45, 1, 0.45] }}
                  exit={{ opacity: 0, transition: { duration: 0.25, repeat: 0 } }}

                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  Tap to open
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {state === "breaking" && !reduced && (
            <PetalBurst count={34} spread={300} seed={3} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
