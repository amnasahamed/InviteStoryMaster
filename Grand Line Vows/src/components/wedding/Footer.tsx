import { motion } from "motion/react";
import Aurora from "@/components/Aurora";
import { Reveal } from "./Reveal";
import { wedding } from "@/lib/wedding-config";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ocean-deep px-5 pt-16 pb-10">
      <img
        src="/op-deck-texture.png"
        alt=""
        width={1024}
        height={1024}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <Aurora amplitude={0.35} sparks={12} colorStops={["#f5c542", "#d94f2b", "#1e6fd9"]} />
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/60 to-transparent" />

      <div className="relative z-10 mx-auto max-w-md text-center">
        <motion.img
          src="/op-coin.png"
          alt=""
          width={512}
          height={512}
          loading="lazy"
          className="mx-auto h-12 w-12"
          animate={{ rotateY: [0, 360], y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <Reveal delay={0.05}>
          <h2 className="font-display gold-text mt-5 text-[1.5rem] leading-[1.15] uppercase sm:text-3xl">
            With us, you&rsquo;ll conquer the Grand Line of our lives!
          </h2>
          <p className="font-accent mt-4 text-sm leading-relaxed text-parchment/90">
            Thank you for being part of our adventure. Every crew needs its people
            &mdash; and ours is you.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="font-display mt-8 text-xl text-parchment">
            {wedding.bride.name}
            <span className="mx-2 text-gold">&</span>
            {wedding.groom.name}
          </p>
          <p className="mt-1 text-[0.72rem] tracking-[0.22em] text-gold-soft uppercase">
            {wedding.hashtag}
          </p>
        </Reveal>

        <div className="mt-10 flex items-center justify-center gap-3 opacity-80">
          <span className="h-px w-12 bg-gold/50" />
          <span aria-hidden="true" className="text-gold">
            &#9773;
          </span>
          <span className="h-px w-12 bg-gold/50" />
        </div>

        <p className="mt-4 text-[0.62rem] tracking-[0.24em] text-parchment/60 uppercase">
          Made with love by the Wedding Grand Fleet
        </p>
      </div>
    </footer>
  );
}
