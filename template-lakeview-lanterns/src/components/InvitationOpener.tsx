import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { wedding } from "../config";

type Phase = "waiting" | "lit" | "open";

export default function InvitationOpener() {
  const [phase, setPhase] = useState<Phase>("waiting");
  const reduce = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = phase === "open" ? "" : "hidden";
    if (phase === "waiting") buttonRef.current?.focus();
    return () => { document.body.style.overflow = ""; };
  }, [phase]);

  const lightInvitation = () => {
    if (phase !== "waiting") return;
    setPhase("lit");
    window.setTimeout(() => setPhase("open"), reduce ? 80 : 1250);
  };

  return (
    <AnimatePresence>
      {phase !== "open" && (
        <motion.div
          className="diya-opener fixed inset-0 z-[90] isolate overflow-hidden"
          initial={{ clipPath: "circle(150% at 50% 58%)" }}
          exit={{ clipPath: "circle(0% at 50% 58%)" }}
          transition={{ duration: reduce ? .01 : 1.35, ease: [0.76, 0, 0.24, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Light the lamp to open the wedding invitation"
        >
          <div className="diya-water absolute inset-0" />
          <div className="opener-grain pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute inset-5 border border-glow-gold/10 sm:inset-8" />

          <header className="absolute inset-x-0 top-[9vh] z-20 px-6 text-center">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: phase === "lit" ? 0 : 1 }} transition={{ duration: .7 }} className="text-[8px] uppercase tracking-[0.5em] text-[#f4e7d0]/35">A light awaits you</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: .15 }} className="mt-4 font-display text-4xl italic tracking-[-0.03em] text-[#f4e7d0] sm:text-5xl">{wedding.groom} <span className="mx-2 text-xl text-glow-gold">&amp;</span> {wedding.bride}</motion.h1>
          </header>

          <div className="absolute inset-x-0 top-[29vh] z-10 flex flex-col items-center sm:top-[27vh]">
            <div className="relative flex h-64 w-full max-w-2xl items-center justify-center sm:h-80">
              {[0, 1, 2].map((ring) => (
                <motion.span key={ring} className="diya-ripple absolute rounded-[50%] border border-glow-gold/25" initial={{ width: 80, height: 24, opacity: 0 }} animate={phase === "lit" ? { width: [80, 320 + ring * 130], height: [24, 82 + ring * 28], opacity: [0, .55, 0] } : { width: 80, height: 24, opacity: 0 }} transition={{ duration: 1.4, delay: ring * .12, ease: "easeOut" }} />
              ))}

              <motion.div className="diya-aura pointer-events-none absolute h-36 w-36 rounded-full" animate={phase === "lit" ? { scale: [0.5, 2.4], opacity: [0, .9, .15] } : { scale: 1, opacity: .08 }} transition={{ duration: 1.15, ease: "easeOut" }} />

              <button ref={buttonRef} type="button" onClick={lightInvitation} className="diya-button group relative z-10 flex h-64 w-[22rem] items-center justify-center sm:h-80 sm:w-[31rem]" aria-label={`Light the lamp and open ${wedding.groom} and ${wedding.bride}'s invitation`}>
                <motion.img src=".https://media.invitestory.in/lakeview-lanterns/assets/opener-diya-v1.png" alt="An unlit handcrafted brass lamp" className="absolute w-full select-none mix-blend-screen transition-transform duration-700 group-hover:scale-[1.025]" draggable={false} animate={phase === "lit" ? { scale: 1.035, filter: "brightness(1.18) saturate(1.1)" } : { scale: 1, filter: "brightness(.82) saturate(.78)" }} />
                <motion.span className="diya-flame absolute top-[25%] sm:top-[24%]" initial={{ opacity: 0, scale: .2, y: 10 }} animate={phase === "lit" ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: .2, y: 10 }} transition={{ duration: .55, ease: [0.34, 1.56, 0.64, 1] }} />
              </button>
            </div>

            <motion.div animate={phase === "lit" ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }} className="mt-2 text-center">
              <p className="text-[9px] uppercase tracking-[0.42em] text-glow-gold/80">Tap the flame to open</p>
              <p className="mt-3 font-display text-sm italic text-[#f4e7d0]/35">Let the evening begin</p>
            </motion.div>
          </div>

          <motion.div className="absolute inset-x-0 bottom-[7vh] z-20 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .65, duration: .8 }}>
            <p className="font-display text-base text-[#f4e7d0]/55">16 · 11 · 2026</p>
            <p className="mt-2 text-[8px] uppercase tracking-[0.34em] text-[#f4e7d0]/25">Kumarakom, Kerala</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
