import type { WeddingEvent } from "@/config";
import { wedding } from "@/config";

/** ISO (with offset) → UTC stamp: 20261206T050500Z */
function toUTCStamp(iso: string): string {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    d.getUTCFullYear().toString() +
    p(d.getUTCMonth() + 1) +
    p(d.getUTCDate()) +
    "T" +
    p(d.getUTCHours()) +
    p(d.getUTCMinutes()) +
    p(d.getUTCSeconds()) +
    "Z"
  );
}

export function googleCalendarUrl(ev: WeddingEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${ev.title} — ${wedding.brideFirst} weds ${wedding.groomFirst}`,
    dates: `${toUTCStamp(ev.startISO)}/${toUTCStamp(ev.endISO)}`,
    details: `${wedding.brideFirst} & ${wedding.groomFirst} — ${ev.title}. ${ev.note ?? ""}`.trim(),
    location: `${wedding.venueName}, ${wedding.venueAddress}`,
    ctz: "Asia/Kolkata",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Download an .ics file (Apple / Outlook). */
export function downloadIcs(ev: WeddingEvent): void {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MuhurthamMandapam//Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${ev.id}-${Date.now()}@muhurtham-mandapam`,
    `DTSTAMP:${toUTCStamp(new Date().toISOString())}`,
    `DTSTART:${toUTCStamp(ev.startISO)}`,
    `DTEND:${toUTCStamp(ev.endISO)}`,
    `SUMMARY:${ev.title} — ${wedding.brideFirst} weds ${wedding.groomFirst}`,
    `DESCRIPTION:${wedding.brideFirst} & ${wedding.groomFirst} — ${ev.title}`,
    `LOCATION:${wedding.venueName}\\, ${wedding.venueAddress}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${wedding.brideFirst}-weds-${wedding.groomFirst}-${ev.id}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function googleMapsUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wedding.mapsQuery)}`;
}
