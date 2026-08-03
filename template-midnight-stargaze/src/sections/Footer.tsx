import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import { wedding } from "../config";

// Grand footer: navy texture behind, hanging garland over the top,
// giant outlined names, marquee strip, closing message
export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyHashtag = async () => {
    try {
      await navigator.clipboard.writeText(wedding.hashtag);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };
  return (
    <footer className="relative flex min-h-[80svh] flex-col justify-end overflow-hidden">
      {/* background texture */}
      <img
        src="/assets/navy-texture.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a24] via-[#0c0a24]/40 to-[#060514]/90" />

      {/* hanging garland overlay — drapes over the footer top */}
      <div className="pointer-events-none absolute left-1/2 top-0 z-20 w-[150%] max-w-none -translate-x-1/2 sm:w-full">
        <img
          src="/assets/garland-top.webp"
          alt=""
          className="w-full object-cover object-top"
          style={{
            transformOrigin: "top center",
            animation: "hang-sway 11s ease-in-out infinite",
          }}
        />
      </div>

      {/* marquee strip */}
      <div className="relative z-10 mb-6 overflow-hidden border-y border-[#e2c88f]/25 py-3">
        <div
          className="flex w-max whitespace-nowrap"
          style={{ animation: "marquee 22s linear infinite" }}
        >
          {[0, 1].map((n) => (
            <span
              key={n}
              className="font-display px-4 text-sm uppercase tracking-[0.4em] text-[#e2c88f]"
            >
              {Array(6).fill(`${wedding.hashtag} ✦ ${wedding.dateLabel} ✦ `).join("")}
            </span>
          ))}
        </div>
      </div>

      {/* giant outlined names in the flow */}
      <div className="pointer-events-none relative z-0 -mb-8 flex select-none justify-center overflow-hidden">
        <span className="font-display text-outline-gold whitespace-nowrap text-[9vw] font-semibold uppercase leading-none tracking-tight opacity-45 sm:text-[8vw]">
          {wedding.bride} ♥ {wedding.groom}
        </span>
      </div>

      {/* closing message */}
      <Reveal className="relative z-10 mx-auto mb-14 mt-4 flex max-w-sm flex-col items-center gap-4 px-6 text-center">
        <img src="/assets/mandala.png" alt="" className="w-14 opacity-80" />
        <p className="font-script text-gold text-4xl leading-snug">
          We can't wait to celebrate with you
        </p>
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#f5eee2]/60">
          With love, the Verma & Kapoor families
        </p>
        <div className="hairline-gold mt-2 w-32" />
        <motion.button
          onClick={copyHashtag}
          whileTap={{ scale: 0.92 }}
          className={`rounded-full border px-5 py-2 text-[10px] tracking-[0.2em] transition-colors ${
            copied
              ? "border-[#eeb2c0]/60 bg-[#eeb2c0]/10 text-[#eeb2c0]"
              : "border-[#e2c88f]/25 text-[#f5eee2]/40 hover:border-[#e2c88f]/50 hover:text-[#f5eee2]/70"
          }`}
        >
          {copied ? "Copied ✓" : `${wedding.hashtag} · tap to copy`}
        </motion.button>
        <a
          href="https://www.instagram.com/invitestory.in/"
          target="_blank"
          rel="noreferrer"
          className="mt-3 text-[10px] uppercase tracking-[0.35em] text-[#e2c88f]/70 transition-colors hover:text-[#e2c88f]"
        >
          Follow @invitestory.in on Instagram
        </a>
      </Reveal>
    </footer>
  );
}
