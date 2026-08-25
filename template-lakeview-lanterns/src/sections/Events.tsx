import { useEffect, useState } from "react";
import Reveal, { SectionHeading } from "../components/Reveal";
import { wedding } from "../config";

type Remain = { days: number; hours: number; mins: number; secs: number };
const getRemain = (target: string): Remain => { const diff = Math.max(0, new Date(target).getTime() - Date.now()); return { days: Math.floor(diff / 86400000), hours: Math.floor((diff % 86400000) / 3600000), mins: Math.floor((diff % 3600000) / 60000), secs: Math.floor((diff % 60000) / 1000) }; };

export default function Events() {
  const [remain, setRemain] = useState(() => getRemain(wedding.dateISO));
  const event = wedding.events[0];
  useEffect(() => { if (wedding.sections?.countdown === false) return; const id = window.setInterval(() => setRemain(getRemain(wedding.dateISO)), 1000); return () => window.clearInterval(id); }, []);
  return <section id="details" className="relative bg-[#061b20] px-6 py-28 sm:px-10 sm:py-40"><div className="mx-auto max-w-6xl">
    <SectionHeading kicker="Save the date" title="One unforgettable evening" />
    <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
      <Reveal><article className="border-y border-glow-gold/25 py-10">
        <p className="section-kicker">{event.dayLabel}</p><p className="font-display mt-6 text-[8rem] font-medium leading-[0.75] tracking-[-0.07em] text-glow-gold sm:text-[11rem]">{event.dayNum}</p>
        <p className="font-display mt-8 text-2xl text-[#f7e9d2]/85">{event.monthLabel}</p><p className="font-display mt-8 text-xl text-[#f7e9d2]">{event.time}</p><p className="mt-2 text-sm text-[#f7e9d2]/60">{event.venue}</p><p className="mt-8 max-w-sm text-sm leading-7 text-[#f7e9d2]/45">{event.note}</p>
      </article></Reveal>
      <div className="flex flex-col gap-10">
        {wedding.sections?.countdown !== false && <Reveal delay={0.1}><div className="grid grid-cols-4 border-y border-white/10 py-6">{([['Days',remain.days],['Hours',remain.hours],['Mins',remain.mins],['Secs',remain.secs]] as const).map(([label,value]) => <div key={label} className="border-r border-white/10 py-2 text-center last:border-0"><p className="font-display text-2xl tabular-nums text-glow-gold sm:text-3xl">{String(value).padStart(2,'0')}</p><p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-[#f7e9d2]/45">{label}</p></div>)}</div></Reveal>}
        <Reveal delay={0.16}><p className="section-kicker">Ceremony flow</p><ul className="mt-5">{wedding.program.map((item,i) => <li key={item.name} className="flex items-center gap-5 border-b border-white/10 py-5 text-sm"><span className="font-display text-glow-gold/50">0{i+1}</span><span className="flex-1 text-[#f7e9d2]/80">{item.name}</span><span className="font-display tracking-wide text-glow-gold">{item.time}</span></li>)}</ul></Reveal>
      </div>
    </div>
  </div></section>;
}
