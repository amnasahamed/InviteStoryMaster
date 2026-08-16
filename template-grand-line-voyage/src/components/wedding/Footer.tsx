import { motion } from "motion/react";
import Aurora from "@/components/Aurora";
import { Reveal } from "./Reveal";
import { wedding } from "@/lib/wedding-config";
import { ArrowUp, Instagram, Sparkles, Anchor } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-ocean-deep px-5 pt-18 pb-14">
      {/* Background Deck Texture */}
      <img
        src="/op-deck-texture.png"
        alt=""
        width={1024}
        height={1024}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <Aurora amplitude={0.35} sparks={16} colorStops={["#f5c542", "#d94f2b", "#1e6fd9"]} />
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/70 to-transparent" />

      <div className="relative z-10 mx-auto max-w-lg text-center">
        {/* Animated Gold Coin */}
        <motion.div
          animate={{ rotateY: [0, 360], y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto inline-block"
        >
          <img
            src="/op-coin.png"
            alt=""
            width={512}
            height={512}
            loading="lazy"
            className="h-14 w-14 drop-shadow-[0_4px_12px_rgba(245,197,66,0.4)]"
          />
        </motion.div>

        <Reveal delay={0.05}>
          <h2 className="font-display gold-text mt-6 text-2xl leading-[1.15] uppercase sm:text-3xl tracking-tight">
            Together, We Conquer The Grand Line!
          </h2>
          <p className="font-accent mt-3 text-sm leading-relaxed text-parchment/90 sm:text-base">
            Thank you for being part of our greatest adventure. Every pirate crew needs its nakama &mdash; and ours is you.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 inline-flex flex-col items-center gap-1 rounded-2xl border border-gold/30 bg-ocean-deep/80 px-6 py-3.5 backdrop-blur-sm">
            <p className="font-display text-2xl text-parchment font-bold flex items-center justify-center gap-2">
              <span>{wedding.bride.name}</span>
              <span className="text-gold font-serif italic text-xl">&amp;</span>
              <span>{wedding.groom.name}</span>
            </p>
            <p className="font-accent text-[0.72rem] tracking-[0.24em] text-gold-soft uppercase font-semibold">
              {wedding.hashtag}
            </p>
          </div>
        </Reveal>

        {/* Nautical Separator */}
        <div className="mt-8 flex items-center justify-center gap-3 opacity-80">
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold/60" />
          <Anchor className="h-4 w-4 text-gold" />
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        {/* Back to Top Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-ocean-deep/90 px-4 py-2 text-xs font-accent tracking-widest text-gold-soft uppercase transition-all hover:border-gold hover:text-parchment hover:bg-gold/15 active:scale-95 cursor-pointer shadow-md"
          >
            <ArrowUp className="h-3.5 w-3.5 text-gold" />
            Back to Top
          </button>
        </div>

        <p className="mt-6 text-[0.68rem] tracking-[0.25em] text-parchment/60 uppercase font-sans">
          Made with love &middot; The Wedding Grand Fleet
        </p>

        {/* Instagram Credit */}
        <div className="mt-4">
          <a
            href="https://www.instagram.com/invitestory.in/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3.5 py-1.5 text-[11px] font-sans tracking-[0.2em] text-parchment/70 uppercase transition-all hover:text-gold hover:bg-black/60 border border-white/10"
          >
            <Instagram className="h-3 w-3 text-gold/80" />
            <span>Follow @invitestory.in</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
