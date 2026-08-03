import { useEffect, useState } from "react";
import Reveal, { SectionHeading } from "../components/Reveal";
import { wedding } from "../config";

type Remain = { days: number; hours: number; mins: number; secs: number };

function getRemain(target: string): Remain {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return { days, hours, mins, secs };
}

export default function Events() {
  const [remain, setRemain] = useState<Remain>(() => getRemain(wedding.dateISO));
  const event = wedding.events[0];

  useEffect(() => {
    if (wedding.sections?.countdown === false) return;
    const id = window.setInterval(() => setRemain(getRemain(wedding.dateISO)), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative px-6 py-24">
      <SectionHeading kicker="Save the Date" title="The Wedding" />

      <div className="mx-auto flex max-w-md flex-col gap-8">
        <Reveal>
          <article className="rounded-[1.75rem] border border-glow-gold/30 bg-dusk-purple/40 p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-[0.35em] text-glow-gold/80">
              {event.dayLabel}
            </p>
            <p className="font-display mt-2 text-6xl font-semibold text-glow-gold">
              {event.dayNum}
            </p>
            <p className="font-display mt-1 text-lg tracking-[0.15em] text-[#f7e9d2]/85">
              {event.monthLabel}
            </p>
            <div className="hairline-gold mx-auto my-5 w-24" />
            <p className="font-display text-xl text-[#f7e9d2]">{event.time}</p>
            <p className="mt-2 text-sm text-[#f7e9d2]/65">{event.venue}</p>
            <p className="mt-4 text-[13px] leading-relaxed text-[#f7e9d2]/55">
              {event.note}
            </p>
          </article>
        </Reveal>

        {wedding.sections?.countdown !== false && (
          <Reveal delay={0.1}>
            <div className="grid grid-cols-4 gap-3">
              {(
                [
                  ["Days", remain.days],
                  ["Hours", remain.hours],
                  ["Mins", remain.mins],
                  ["Secs", remain.secs],
                ] as const
              ).map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-glow-gold/20 bg-white/[0.04] py-4 text-center"
                >
                  <p className="font-display text-2xl text-glow-gold sm:text-3xl">
                    {String(value).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-[#f7e9d2]/50">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <Reveal delay={0.16} className="flex flex-col gap-3">
          <p className="text-center text-[11px] uppercase tracking-[0.3em] text-glow-gold/70">
            Ceremony flow
          </p>
          <ul className="space-y-2">
            {wedding.program.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between rounded-full border border-glow-gold/15 bg-white/[0.03] px-5 py-3 text-sm"
              >
                <span className="text-[#f7e9d2]/85">{item.name}</span>
                <span className="font-display tracking-wide text-glow-gold">
                  {item.time}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
