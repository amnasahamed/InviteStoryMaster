import { motion } from "motion/react";
import { Reveal, SectionTitle } from "./Reveal";
import { wedding } from "@/lib/wedding-config";
import { Heart, Sparkles } from "lucide-react";

type Person = {
  fullName: string;
  epithet: string;
  bounty: string;
  intro: string;
  image: string;
};

function BountyPanel({
  person,
  role,
  rotate,
  delay,
}: {
  person: Person;
  role: string;
  rotate: number;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <motion.article
        whileHover={{ y: -6, rotate: 0, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ rotate }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="parchment-panel relative overflow-hidden rounded-2xl border-[3px] border-[oklch(0.38_0.09_52)] p-4 sm:p-5 shadow-[0_20px_35px_-15px_rgba(0,0,0,0.8),inset_0_0_25px_rgba(120,60,20,0.2)]"
      >
        {/* Header Ribbon */}
        <div className="flex items-center justify-between border-b-2 border-[oklch(0.38_0.09_52)]/30 pb-2">
          <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[oklch(0.42_0.12_40)] font-sans">
            GRAND LINE RECORD
          </span>
          <div className="flex items-center gap-1 font-display text-[0.8rem] tracking-[0.2em] uppercase text-[oklch(0.32_0.1_45)] font-bold">
            <span>WANTED</span>
            <span className="text-[oklch(0.55_0.2_32)]">&bull;</span>
            <span>{role}</span>
          </div>
          <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-[oklch(0.42_0.12_40)] font-sans">
            NAVY FLEET
          </span>
        </div>

        {/* Character Portrait with Vintage Frame */}
        <div className="mt-3 overflow-hidden rounded-xl border-2 border-[oklch(0.35_0.08_50)] bg-black/10 shadow-inner">
          <img
            src={person.image}
            alt={`Anime-style illustration of ${person.fullName} in Indian wedding attire`}
            width={896}
            height={1152}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Name and Epithet */}
        <div className="mt-3 text-center">
          <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-[oklch(0.24_0.08_45)] uppercase sm:text-3xl">
            {person.fullName}
          </h3>
          <p className="font-accent mt-0.5 text-xs sm:text-sm font-semibold tracking-wide text-[oklch(0.48_0.15_38)]">
            &ldquo;{person.epithet}&rdquo;
          </p>
        </div>

        {/* Bounty Strip */}
        <div className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border-y-2 border-[oklch(0.38_0.09_52)]/40 bg-[oklch(0.88_0.06_78)]/50 py-1.5 shadow-sm">
          <img
            src="https://media.invitestory.in/grand-line-voyage/op-coin.png"
            alt=""
            width={512}
            height={512}
            loading="lazy"
            className="h-5 w-5 drop-shadow-sm"
          />
          <span className="font-display text-base font-bold text-[oklch(0.26_0.09_45)] tracking-wide">{person.bounty}</span>
          <span className="font-sans text-[0.65rem] font-bold tracking-[0.16em] uppercase text-[oklch(0.38_0.1_45)]">
            Berries of Love
          </span>
        </div>

        {/* Intro */}
        <p className="mt-3 text-center font-sans text-[0.82rem] sm:text-sm leading-relaxed text-[oklch(0.28_0.06_45)]">
          {person.intro}
        </p>
      </motion.article>
    </Reveal>
  );
}

export default function Couple() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-[oklch(0.22_0.08_250)] to-background px-5 py-18">
      <div className="mx-auto max-w-lg">
        <SectionTitle>The Crew of Two</SectionTitle>

        <div className="mt-8 space-y-7">
          <BountyPanel person={wedding.bride} role="The Bride" rotate={-2} delay={0} />
          <BountyPanel person={wedding.groom} role="The Groom" rotate={2} delay={0.1} />
        </div>

        <Reveal delay={0.15} className="mt-10">
          <figure className="group overflow-hidden rounded-3xl border-2 border-gold/40 shadow-[0_24px_50px_-20px_black] transition-all duration-300 hover:border-gold">
            <div className="overflow-hidden">
              <img
                src="https://media.invitestory.in/grand-line-voyage/op-couple-panel.png"
                alt="The couple holding hands on a floating temple ship at sunset"
                width={1152}
                height={896}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <figcaption className="font-accent bg-gradient-to-r from-ocean-deep via-[oklch(0.26_0.09_246)] to-ocean-deep px-5 py-3.5 text-center text-xs sm:text-sm leading-relaxed text-gold-soft border-t border-gold/30 flex items-center justify-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-gold shrink-0" />
              <span>Two navigators, one destiny. The grand voyage begins in Goa.</span>
              <Sparkles className="h-3.5 w-3.5 text-gold shrink-0" />
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
