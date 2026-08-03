import Countdown from "@/components/Countdown";
import Reveal from "@/components/Reveal";
import { wedding } from "@/config";

export default function CountdownSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#7b1e1e] via-[#6d1717] to-[#5a1010] px-6 py-20 text-center">
      {/* subtle glow */}
      <div className="anim-glow absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d9b36a]/15 blur-3xl" />

      <Reveal className="relative">
        <p className="text-[11px] uppercase tracking-[0.42em] text-[#d9b36a]">ముహూర్తానికి</p>
        <h2 className="font-script mt-2 text-5xl text-[#f3e3c3]">Counting the moments</h2>
        <p className="mx-auto mt-3 max-w-xs text-[13px] leading-relaxed tracking-wide text-[#f3e3c3]/70">
          until {wedding.brideFirst} & {wedding.groomFirst} tie the sacred knot
        </p>
      </Reveal>

      <Reveal delay={0.15} className="relative mt-9">
        <Countdown />
      </Reveal>

      <Reveal delay={0.25} className="relative mt-8">
        <div className="hairline-gold mx-auto w-40 opacity-70" />
        <p className="font-display mt-4 text-xs uppercase tracking-[0.3em] text-[#d9b36a]/90">
          {wedding.weekdayLabel} · {wedding.dateLabel}
        </p>
      </Reveal>
    </section>
  );
}
