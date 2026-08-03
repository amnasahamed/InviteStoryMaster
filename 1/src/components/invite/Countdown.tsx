import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CalendarPlus, CalendarDays } from "lucide-react";
import { invitation } from "@/config/invitation";
import { downloadIcs, googleCalendarUrl } from "@/lib/invite-utils";

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Mins" },
  { key: "seconds", label: "Secs" },
] as const;

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function remainingFrom(target: number): Remaining {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown() {
  const target = new Date(invitation.mainEvent.startsAt).getTime();
  const [left, setLeft] = useState<Remaining | null>(null);

  useEffect(() => {
    setLeft(remainingFrom(target));
    const id = setInterval(() => setLeft(remainingFrom(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const calendarEntry = {
    title: invitation.mainEvent.title,
    startsAt: invitation.mainEvent.startsAt,
    durationMinutes: invitation.mainEvent.durationMinutes,
    location: `${invitation.venue.name}, ${invitation.venue.address}`,
    description: invitation.invitationNote,
  };

  return (
    <section id="countdown" className="relative px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-kicker text-[0.7rem] tracking-[0.42em] text-gold uppercase">Save the date</p>
        <h2 className="font-display mt-3 text-3xl text-maroon sm:text-4xl">
          {invitation.mainEvent.dateLabel}
        </h2>
        <p className="font-body text-ink/70 mt-1 text-sm">{invitation.mainEvent.timeLabel}</p>

        <div className="mt-8 grid grid-cols-4 gap-2 sm:gap-3">
          {UNITS.map((unit, i) => (
            <motion.div
              key={unit.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="border-gold/35 bg-paper/70 rounded-2xl border px-1 py-4 shadow-[0_10px_30px_-22px_var(--shadow-gold)] backdrop-blur-sm"
            >
              <div className="font-display text-maroon text-3xl tabular-nums sm:text-4xl">
                {left ? String(left[unit.key]).padStart(2, "0") : "--"}
              </div>
              <div className="font-kicker text-ink/55 mt-1 text-[0.6rem] tracking-[0.24em] uppercase">
                {unit.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={googleCalendarUrl(calendarEntry)}
            target="_blank"
            rel="noreferrer"
            className="btn-gold inline-flex items-center justify-center gap-2 px-6 py-3 text-sm"
          >
            <CalendarPlus className="size-4" aria-hidden />
            Add to Google Calendar
          </a>
          <button
            type="button"
            onClick={() => downloadIcs(calendarEntry, "rizwan-ayesha-wedding.ics")}
            className="btn-outline inline-flex items-center justify-center gap-2 px-6 py-3 text-sm"
          >
            <CalendarDays className="size-4" aria-hidden />
            Apple / Outlook (.ics)
          </button>
        </div>
      </div>
    </section>
  );
}
