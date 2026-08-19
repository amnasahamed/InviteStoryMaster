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
    <section className="relative overflow-hidden px-6 py-28 sm:py-36">
      <img
        src={wedding.assets.mandap}
        alt=""
        className="pointer-events-none absolute left-1/2 top-16 w-[78%] max-w-xl -translate-x-1/2 opacity-[0.07]"
      />
      <SectionHeading kicker="Save the date" title="The Wedding" />

      <div className="mx-auto flex max-w-md flex-col gap-8">
        <Reveal>
          <article className="rounded-[2rem] border border-moon/20 bg-night/52 p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,0.32)]">
            <p className="text-[11px] uppercase tracking-[0.35em] text-glow-gold/80">
              {event.dayLabel}
            </p>
            <p className="font-display mt-2 text-6xl font-semibold text-glow-gold">
              {event.dayNum}
            </p>
            <p className="font-display mt-1 text-lg tracking-[0.15em] text-pearl/85">
              {event.monthLabel}
            </p>
            <div className="hairline-gold mx-auto my-5 w-24" />
            <p className="font-display text-xl text-pearl">{event.time}</p>
            <p className="mt-2 text-sm text-pearl/65">{event.venue}</p>
            <p className="mt-4 text-[13px] leading-relaxed text-pearl/55">
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
                  className="rounded-2xl border border-moon/15 bg-night/45 py-4 text-center"
                >
                  <p className="font-display text-2xl text-glow-gold sm:text-3xl">
                    {String(value).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-pearl/50">
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
          <ol className="relative space-y-3 before:absolute before:bottom-5 before:left-[7px] before:top-5 before:w-px before:bg-moon/18">
            {wedding.program.map((item) => (
              <li
                key={item.name}
                className="relative flex items-center justify-between gap-4 pl-8 text-sm"
              >
                <span className="absolute left-0 h-3.5 w-3.5 rounded-full border border-lotus-light/60 bg-ink" />
                <span className="text-pearl/85">{item.name}</span>
                <span className="font-display tracking-wide text-glow-gold">
                  {item.time}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
