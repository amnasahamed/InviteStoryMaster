import { CalendarHeart, Check, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { burstPetals } from "./effects";

/** Wedding day, 12 Dec 2026 — single Nikah ceremony. */
const EVENT = {
  title: "Amaan & Fatima — Wedding",
  start: "20261212T100000Z",
  end: "20261212T120000Z",
  location: "Noor Bagh, Masjid-e-Noor & Garden Lawns, Banjara Hills, Hyderabad",
  details:
    "Nikah at 3:30 pm IST. Baraat, duas and the tying of the knot. We can't wait to see you there.",
} as const;

const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
  EVENT.title,
)}&dates=${EVENT.start}/${EVENT.end}&details=${encodeURIComponent(
  EVENT.details,
)}&location=${encodeURIComponent(EVENT.location)}`;

function icsFile() {
  const fold = (s: string) => s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Amaan and Fatima//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:amaan-fatima-20261212@wedding.invite",
    `DTSTAMP:${EVENT.start}`,
    `DTSTART:${EVENT.start}`,
    `DTEND:${EVENT.end}`,
    `SUMMARY:${fold(EVENT.title)}`,
    `DESCRIPTION:${fold(EVENT.details)}`,
    `LOCATION:${fold(EVENT.location)}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Amaan & Fatima's wedding is tomorrow",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/** Two honest paths into a guest's calendar: Google, or a downloadable .ics. */
export function AddToCalendar() {
  const [saved, setSaved] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const confirm = (e: { clientX: number; clientY: number }) => {
    setSaved(true);
    burstPetals({ x: e.clientX, y: e.clientY, count: 26, spread: 1 });
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setSaved(false), 4200);
  };

  const download = (e: React.MouseEvent<HTMLButtonElement>) => {
    const blob = new Blob([icsFile()], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "amaan-and-fatima-12-dec-2026.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 2000);
    confirm(e);
  };

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <p className="text-[0.6rem] tracking-[0.44em] text-muted-foreground uppercase">
        keep the day
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={confirm}
          className="font-body flex items-center gap-3 rounded-full px-8 py-4 text-sm tracking-[0.16em] text-primary-foreground uppercase transition-transform duration-300 hover:scale-105"
          style={{ background: "var(--primary)", boxShadow: "var(--shadow-lift)" }}
        >
          <CalendarHeart className="h-4 w-4" strokeWidth={1.5} />
          Add to calendar
        </a>
        <button
          type="button"
          onClick={download}
          className="font-body flex items-center gap-3 rounded-full px-8 py-4 text-sm tracking-[0.16em] text-ink uppercase transition-transform duration-300 hover:scale-105"
          style={{ background: "var(--popover)", boxShadow: "var(--shadow-lift)" }}
        >
          <Download className="h-4 w-4" strokeWidth={1.5} />
          Apple / Outlook
        </button>
      </div>

      <div
        className="flex min-h-8 items-center gap-2 transition-all duration-700"
        style={{ opacity: saved ? 1 : 0, transform: `translateY(${saved ? 0 : 8}px)` }}
      >
        <Check className="h-4 w-4 text-primary" strokeWidth={1.6} />
        <span className="font-hand pb-[0.14em] text-2xl leading-[1.5] text-primary">
          Saturday, 12 December 2026 · 3:00 pm
        </span>
      </div>
    </div>
  );
}
