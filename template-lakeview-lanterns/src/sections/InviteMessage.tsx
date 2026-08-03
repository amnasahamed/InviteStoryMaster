import Reveal from "../components/Reveal";
import { wedding } from "../config";

export default function InviteMessage() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dusk-deep via-dusk-purple to-dusk-deep" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-dusk-magenta/20 blur-[100px]" />

      <div className="relative mx-auto flex max-w-lg flex-col items-center gap-6 text-center">
        <Reveal>
          <p className="font-display text-sm tracking-[0.35em] text-glow-gold/80">
            {wedding.verse.hindi}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="font-display text-2xl leading-relaxed text-[#f7e9d2]/90 sm:text-3xl">
            {wedding.verse.text}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="hairline-gold mt-2 w-28" />
        </Reveal>
        <Reveal delay={0.22} className="flex flex-col gap-1 text-[12px] tracking-wide text-[#f7e9d2]/65">
          <p>{wedding.groomParents}</p>
          <p>{wedding.brideParents}</p>
        </Reveal>
      </div>
    </section>
  );
}
