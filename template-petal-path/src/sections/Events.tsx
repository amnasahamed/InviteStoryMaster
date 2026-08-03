import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import { wedding } from "../config";

function useCountdown(iso: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, new Date(iso).getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return { days, hours, mins, secs };
}

export default function Events() {
  const e = wedding.events[0];
  const c = useCountdown(wedding.dateISO);

  return (
    <section className="relative overflow-hidden px-6 py-24">
      <Reveal className="mb-12 flex flex-col items-center gap-3 text-center">
        <span className="text-[11px] uppercase tracking-[0.4em] text-[#f2c4d0]/70">
          The ceremony
        </span>
        <h2 className="font-script text-5xl text-[#faf3eb] sm:text-6xl">The Wedding</h2>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#c9a86a]/50 to-transparent" />
      </Reveal>

      {wedding.sections?.countdown !== false && (
        <Reveal className="mx-auto mb-14 grid max-w-sm grid-cols-4 gap-3">
          {[
            ["Days", c.days],
            ["Hrs", c.hours],
            ["Min", c.mins],
            ["Sec", c.secs],
          ].map(([label, value]) => (
            <div
              key={label as string}
              className="flex flex-col items-center rounded-2xl bg-white/[0.04] px-2 py-4 ring-1 ring-white/10"
            >
              <span className="font-display text-3xl text-[#faf3eb]">
                {String(value).padStart(2, "0")}
              </span>
              <span className="mt-1 text-[9px] uppercase tracking-[0.28em] text-[#e8dcc8]/60">
                {label}
              </span>
            </div>
          ))}
        </Reveal>
      )}

      <Reveal className="relative mx-auto max-w-md">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#3a2240]/80 to-[#2a1830]/90 px-6 pb-10 pt-12 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)] ring-1 ring-[#f2c4d0]/15">
          <div className="pointer-events-none absolute inset-3 rounded-[1.55rem] ring-1 ring-[#f2c4d0]/08" />
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#f2c4d0]/70">
            {e.dayLabel}
          </p>
          <p className="mt-2 font-display text-8xl font-medium leading-none text-[#faf3eb]">
            {e.dayNum}
          </p>
          <p className="mt-2 font-display text-xl tracking-[0.18em] text-[#e8dcc8]">
            {e.monthLabel}
          </p>
          <div className="mx-auto mt-7 h-px w-20 bg-[#f2c4d0]/25" />
          <p className="mt-7 font-display text-2xl text-[#faf3eb]">{e.time}</p>
          <p className="mt-2 text-sm tracking-wide text-[#e8dcc8]/75">{e.venue}</p>
          <p className="mx-auto mt-4 max-w-xs font-display text-base italic leading-relaxed text-[#f2c4d0]/75">
            {e.note}
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-xs">
          <p className="mb-7 text-center text-[11px] uppercase tracking-[0.4em] text-[#f2c4d0]/65">
            The day unfolds
          </p>
          <div className="relative">
            <div className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-[#f2c4d0]/40 via-[#f2c4d0]/15 to-transparent" />
            <div className="flex flex-col gap-6">
              {wedding.program.map((step, i) => (
                <motion.div
                  key={step.name}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-start gap-4 pl-1"
                >
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#c45a7a] ring-4 ring-[#1a0f1f]" />
                  <div className="flex flex-1 items-baseline justify-between gap-3">
                    <p className="font-display text-lg text-[#faf3eb]">{step.name}</p>
                    <p className="shrink-0 text-[11px] uppercase tracking-[0.18em] text-[#e8dcc8]/65">
                      {step.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
