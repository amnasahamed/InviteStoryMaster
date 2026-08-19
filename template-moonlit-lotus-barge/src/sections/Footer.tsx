import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import { wedding } from "../config";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
    },
    [],
  );

  const copyHashtag = async () => {
    try {
      await navigator.clipboard.writeText(wedding.hashtag);
      setCopied(true);
      copyTimer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <footer className="relative flex min-h-[78svh] flex-col justify-end overflow-hidden">
      <img
        src={wedding.assets.environment}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-58"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/86 to-ink/20" />
      <img
        src={wedding.assets.foregroundLotus}
        alt=""
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] mx-auto w-[125%] max-w-5xl opacity-45"
      />

      <div className="pointer-events-none relative z-[3] -mb-5 flex select-none justify-center overflow-hidden">
        <span className="font-display whitespace-nowrap text-[12vw] font-semibold uppercase leading-none tracking-tight text-moon/12 sm:text-[8vw]">
          {wedding.groom} and {wedding.bride}
        </span>
      </div>

      <Reveal className="relative z-10 mx-auto mb-16 mt-5 flex max-w-md flex-col items-center gap-4 px-6 text-center">
        <p className="font-script text-5xl leading-snug text-lotus-light">
          {wedding.footer.title}
        </p>
        <p className="text-xs uppercase tracking-[0.28em] text-pearl/55">
          With love, {wedding.familySignoff}
        </p>
        <div className="hairline-gold mt-2 w-32" />
        <motion.button
          type="button"
          onClick={copyHashtag}
          whileTap={{ scale: 0.94 }}
          className={`rounded-full border px-5 py-2 text-[10px] tracking-[0.2em] transition-colors duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
            copied
              ? "border-glow-warm/60 bg-glow-warm/10 text-glow-warm"
              : "border-moon/25 text-pearl/45 hover:border-lotus-light/50 hover:text-pearl/75"
          }`}
        >
          {copied ? "Copied" : `${wedding.hashtag}, tap to copy`}
        </motion.button>
        <a
          href="https://www.instagram.com/invitestory.in/"
          target="_blank"
          rel="noreferrer"
          className="mt-3 text-[10px] uppercase tracking-[0.35em] text-glow-gold/70 transition-colors hover:text-glow-gold"
        >
          Follow @invitestory.in on Instagram
        </a>
      </Reveal>
    </footer>
  );
}
