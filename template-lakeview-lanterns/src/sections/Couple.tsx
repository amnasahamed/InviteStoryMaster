import { motion } from "framer-motion";
import Reveal, { SectionHeading } from "../components/Reveal";
import { wedding } from "../config";

export default function Couple() {
  const people = [
    { name: wedding.groomFull, role: wedding.groomParents, label: "The groom" },
    { name: wedding.brideFull, role: wedding.brideParents, label: "The bride" },
  ];
  return <section className="relative px-6 py-28 sm:px-10 sm:py-40">
    <div className="section-rule mx-auto max-w-6xl" />
    <div className="mx-auto max-w-6xl pt-20">
      <SectionHeading kicker="The couple" title="Two hearts, one vow" />
      <div className="relative grid gap-4 sm:grid-cols-2">
        {people.map((person, i) => <Reveal key={person.name} delay={i * 0.1}>
          <motion.article whileHover={{ y: -4 }} transition={{ duration: 0.45 }} className={`person-panel relative min-h-[25rem] overflow-hidden p-8 sm:p-12 ${i === 1 ? "sm:mt-24" : ""}`}>
            <div className="mb-20 flex h-14 w-14 items-center justify-center border border-glow-gold/35 font-display text-2xl italic text-glow-gold">{person.name.trim().charAt(0)}</div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.26em] text-glow-gold/60">{person.label}</p>
            <h3 className="font-display text-4xl tracking-[-0.02em] text-[#f4e7d0] sm:text-5xl">{person.name}</h3>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#f7e9d2]/55">{person.role}</p>
          </motion.article>
        </Reveal>)}
      </div>
      <Reveal delay={0.2} className="mt-14 flex justify-end"><p className="font-display text-xl italic text-glow-gold/80">{wedding.hashtag}</p></Reveal>
    </div>
  </section>;
}
