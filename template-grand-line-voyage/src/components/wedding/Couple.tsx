import { motion } from "motion/react";
import { Reveal, SectionTitle } from "./Reveal";
import { wedding } from "@/lib/wedding-config";

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
        whileTap={{ scale: 0.97, rotate: 0 }}
        style={{ rotate }}
        className="parchment-panel relative overflow-hidden rounded-xl border-4 border-[oklch(0.35_0.08_50)] p-3"
      >
        <p className="font-display text-center text-[0.68rem] tracking-[0.2em] uppercase">
          Wanted &mdash; {role}
        </p>
        <div className="mt-2 overflow-hidden rounded-md border-2 border-[oklch(0.35_0.08_50)]/70">
          <img
            src={person.image}
            alt={`Anime-style illustration of ${person.fullName} in Indian wedding attire`}
            width={896}
            height={1152}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
        <h3 className="font-display mt-3 text-center text-xl leading-tight uppercase">
          {person.fullName}
        </h3>
        <p className="font-accent text-center text-xs text-[oklch(0.42_0.14_35)]">
          {person.epithet}
        </p>
        <div className="mt-2 flex items-center justify-center gap-1 border-y border-[oklch(0.35_0.08_50)]/40 py-1">
          <img
            src="/op-coin.png"
            alt=""
            width={512}
            height={512}
            loading="lazy"
            className="h-4 w-4"
          />
          <span className="font-display text-sm">{person.bounty}</span>
          <span className="text-[0.65rem] tracking-widest uppercase">berries of love</span>
        </div>
        <p className="mt-2 text-center text-[0.78rem] leading-relaxed">{person.intro}</p>
      </motion.article>
    </Reveal>
  );
}

export default function Couple() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-[oklch(0.22_0.08_250)] to-background px-5 py-16">
      <div className="mx-auto max-w-md">
        <SectionTitle>The Crew of Two</SectionTitle>

        <div className="mt-8 space-y-6">
          <BountyPanel person={wedding.bride} role="The Bride" rotate={-2.5} delay={0} />
          <BountyPanel person={wedding.groom} role="The Groom" rotate={2.5} delay={0.1} />
        </div>

        <Reveal delay={0.15} className="mt-8">
          <figure className="overflow-hidden rounded-2xl border-2 border-gold/40 shadow-[0_20px_45px_-25px_black]">
            <img
              src="/op-couple-panel.png"
              alt="The couple holding hands on a floating temple ship at sunset"
              width={1152}
              height={896}
              loading="lazy"
              className="w-full object-cover"
            />
            <figcaption className="font-accent bg-ocean-deep px-4 py-3 text-center text-xs leading-relaxed text-gold-soft">
              Two navigators, one map. The voyage begins in Goa.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
