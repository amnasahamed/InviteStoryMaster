import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import { wedding } from "../config";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyHashtag = async () => {
    try {
      await navigator.clipboard.writeText(wedding.hashtag);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <footer className="relative flex min-h-[70svh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dusk-deep via-[#061b20] to-[#031216]" />
      <img
        src=".https://media.invitestory.in/lakeview-lanterns/assets/hero-lakeview-teal-v1.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#031216] via-[#031216]/70 to-transparent" />

      <div className="relative z-10 mb-6 overflow-hidden border-y border-glow-gold/25 py-3">
        <div
          className="flex w-max whitespace-nowrap"
          style={{ animation: "marquee 22s linear infinite" }}
        >
          {[0, 1].map((n) => (
            <span
              key={n}
              className="font-display px-4 text-sm uppercase tracking-[0.4em] text-glow-gold"
            >
              {Array(6)
                .fill(`${wedding.hashtag} · ${wedding.dateLabel} · `)
                .join("")}
            </span>
          ))}
        </div>
      </div>

      <div className="pointer-events-none relative z-0 -mb-6 flex select-none justify-center overflow-hidden">
        <span className="font-display whitespace-nowrap text-[10vw] font-semibold uppercase leading-none tracking-tight text-glow-gold/20 sm:text-[7vw]">
          {wedding.groom} & {wedding.bride}
        </span>
      </div>

      <Reveal className="relative z-10 mx-auto mb-14 mt-4 flex max-w-sm flex-col items-center gap-4 px-6 text-center">
        <p className="font-display text-4xl italic leading-snug text-glow-gold">
          We can't wait to celebrate with you
        </p>
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#f7e9d2]/55">
          With love, the Menon & Nair families
        </p>
        <div className="hairline-gold mt-2 w-32" />
        <motion.button
          type="button"
          onClick={copyHashtag}
          whileTap={{ scale: 0.94 }}
          className={`rounded-full border px-5 py-2 text-[10px] tracking-[0.2em] transition-colors ${
            copied
              ? "border-glow-warm/60 bg-glow-warm/10 text-glow-warm"
              : "border-glow-gold/25 text-[#f7e9d2]/45 hover:border-glow-gold/50 hover:text-[#f7e9d2]/75"
          }`}
        >
          {copied ? "Copied" : `${wedding.hashtag} · tap to copy`}
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
