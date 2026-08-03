import { motion } from "framer-motion";
import Reveal, { SectionHeading } from "../components/Reveal";
import { wedding } from "../config";

export default function Couple() {
  return (
    <section className="relative px-6 py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(142,40,86,0.22),transparent_55%)]" />
      <SectionHeading kicker="The Couple" title="Two hearts, one vow" />

      <div className="relative mx-auto grid max-w-3xl gap-8 sm:grid-cols-2">
        {[
          {
            name: wedding.groomFull,
            role: wedding.groomParents,
            side: "left" as const,
          },
          {
            name: wedding.brideFull,
            role: wedding.brideParents,
            side: "right" as const,
          },
        ].map((person, i) => (
          <Reveal key={person.name} delay={i * 0.1}>
            <motion.article
              whileHover={{ y: -4 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[1.75rem] border border-glow-gold/25 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 text-center backdrop-blur-sm"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-glow-gold/40 bg-dusk-purple/60 font-script text-3xl text-glow-gold">
                {person.name.trim().charAt(0)}
              </div>
              <h3 className="font-display text-2xl text-glow-gold">{person.name}</h3>
              <p className="mt-2 text-[12px] leading-relaxed text-[#f7e9d2]/65">
                {person.role}
              </p>
            </motion.article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10 flex justify-center">
        <p className="font-script text-gold text-4xl">{wedding.hashtag}</p>
      </Reveal>
    </section>
  );
}
