import { useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "../config";

const ease: [number, number, number, number] = [0.65, 0, 0.35, 1];

export default function IntroGate({
  onOpening,
  onOpened,
}: {
  onOpening: () => void;
  onOpened: () => void;
}) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    onOpening();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 overflow-hidden bg-[#1a0f1f]"
        animate={opening ? { x: "-105%" } : { x: 0 }}
        transition={{ duration: 1.55, delay: 0.25, ease }}
      >
        <img
          src="./assets/layers/intro-veil.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-right opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f1f] via-[#1a0f1f]/50 to-transparent" />
      </motion.div>

      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 overflow-hidden bg-[#1a0f1f]"
        animate={opening ? { x: "105%" } : { x: 0 }}
        transition={{ duration: 1.55, delay: 0.25, ease }}
        onAnimationComplete={() => opening && onOpened()}
      >
        <img
          src="./assets/layers/intro-veil.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-left opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#1a0f1f] via-[#1a0f1f]/50 to-transparent" />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-y-0 left-1/2 w-16 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(242,196,208,0.85), transparent)",
          filter: "blur(12px)",
        }}
        initial={{ opacity: 0, scaleX: 0.1 }}
        animate={opening ? { opacity: [0, 1, 0.85], scaleX: [0.1, 1, 2.4] } : {}}
        transition={{ duration: 1.55, delay: 0.25, ease }}
      />

      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
        animate={
          opening
            ? { opacity: 0, y: -24, scale: 0.98 }
            : { opacity: 1, y: 0 }
        }
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1 }}
          className="relative flex max-w-sm flex-col items-center gap-4 text-center"
        >
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1.1 }}
          >
            <div
              className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{
                background: "rgba(196,90,122,0.35)",
                animation: "glow-pulse 3s ease-in-out infinite",
              }}
            />
            <img
              src="./assets/layers/03-couple.png"
              alt=""
              className="relative h-32 w-auto object-contain sm:h-40"
              style={{ animation: "float-soft 5s ease-in-out infinite" }}
            />
          </motion.div>

          <span className="font-display text-sm tracking-[0.4em] text-[#f2c4d0]">
            {wedding.verse.blessing}
          </span>
          <p className="text-[11px] uppercase tracking-[0.45em] text-[#faf3eb]/65">
            You are cordially invited to
          </p>
          <h1 className="font-script text-5xl leading-tight text-[#faf3eb] sm:text-6xl">
            {wedding.bride}{" "}
            <span className="text-[#f2c4d0]">&</span> {wedding.groom}
          </h1>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#c9a86a]">
            {wedding.dateLabel}
          </p>

          <motion.button
            type="button"
            onClick={handleOpen}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            className="group relative mt-2 overflow-hidden rounded-full border border-[#f2c4d0]/55 px-10 py-4 text-[11px] uppercase tracking-[0.35em] text-[#faf3eb] transition-colors hover:bg-[#f2c4d0]/10"
          >
            <span
              className="absolute inset-0 rounded-full border border-[#f2c4d0]/35"
              style={{ animation: "glow-pulse 2.6s ease-in-out infinite" }}
            />
            Open Invitation
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
