import Reveal from "../components/Reveal";
import { wedding } from "../config";

export default function InviteMessage() {
  return <section id="story" className="relative overflow-hidden px-6 pb-28 pt-32 sm:px-10 sm:pb-40 sm:pt-44">
    <div className="ambient-orb pointer-events-none absolute -right-44 top-10 h-[34rem] w-[34rem] rounded-full" />
    <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.72fr_1.28fr] md:items-start">
      <div className="md:sticky md:top-28">
        <Reveal><p className="section-kicker">{wedding.verse.hindi}</p></Reveal>
        <Reveal delay={0.12}><p className="mt-6 font-display text-2xl italic leading-snug text-glow-gold/85">Two families,<br />one moonlit promise.</p></Reveal>
      </div>
      <div>
        <Reveal delay={0.08}><p className="font-display text-[2.1rem] leading-[1.2] tracking-[-0.025em] text-[#f4e7d0] sm:text-5xl">{wedding.verse.text}</p></Reveal>
        <Reveal delay={0.22} className="mt-10 border-l border-glow-gold/40 pl-6 text-sm leading-7 text-[#f4e7d0]/55"><p>{wedding.groomParents}</p><p>{wedding.brideParents}</p></Reveal>
      </div>
    </div>
  </section>;
}
