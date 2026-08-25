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
    <section className="paper-section relative overflow-hidden px-6 py-28 sm:py-40">
      <img
        src={wedding.assets.mandap}
        alt=""
        className="pointer-events-none absolute left-1/2 top-16 w-[78%] max-w-xl -translate-x-1/2 opacity-[0.07]"
      />
      <div className="[&_.section-heading_h2]:!text-ink"><SectionHeading kicker="Save the date" title="One moonlit evening" /></div>

      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[1.1fr_.9fr] md:items-start">
        <Reveal>
          <article className="border-l border-gold/45 px-7 py-2 text-left sm:px-10">
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold">
              {event.dayLabel}
            </p>
            <p className="font-display mt-2 text-8xl font-medium leading-none text-ink">
              {event.dayNum}
            </p>
            <p className="font-display mt-1 text-xl tracking-[0.12em] text-ink/75">
              {event.monthLabel}
            </p>
            <div className="hairline-gold mx-auto my-5 w-24" />
            <p className="font-display text-2xl text-ink">{event.time}</p>
            <p className="mt-2 text-sm text-ink/65">{event.venue}</p>
            <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-ink/55">
              {event.note}
            </p>
          </article>
        </Reveal>

        <div className="space-y-8">{wedding.sections?.countdown !== false && (
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
                  className="border-t border-gold/30 py-4 text-center"
                >
                  <p className="font-display text-3xl text-ink sm:text-4xl">
                    {String(value).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-ink/45">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <Reveal delay={0.16} className="flex flex-col gap-3">
          <p className="text-left text-[11px] uppercase tracking-[0.3em] text-gold">
            Ceremony flow
          </p>
          <ol className="relative space-y-4 before:absolute before:bottom-5 before:left-[7px] before:top-5 before:w-px before:bg-gold/25">
            {wedding.program.map((item) => (
              <li
                key={item.name}
                className="relative flex items-center justify-between gap-4 pl-8 text-sm"
              >
                <span className="absolute left-0 h-3.5 w-3.5 rounded-full border border-gold/60 bg-[var(--paper)]" />
                <span className="text-ink/80">{item.name}</span>
                <span className="font-display tracking-wide text-gold">
                  {item.time}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
