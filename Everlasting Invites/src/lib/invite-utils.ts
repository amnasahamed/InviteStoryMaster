const pad = (n: number) => String(n).padStart(2, "0");

/** Format a Date as a UTC iCalendar timestamp: 20261219T060000Z */
export function toIcsUtc(date: Date): string {
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  );
}

export type CalendarEntry = {
  title: string;
  startsAt: string;
  durationMinutes: number;
  location: string;
  description?: string;
};

function bounds(entry: CalendarEntry) {
  const start = new Date(entry.startsAt);
  const end = new Date(start.getTime() + entry.durationMinutes * 60_000);
  return { start, end };
}

export function googleCalendarUrl(entry: CalendarEntry): string {
  const { start, end } = bounds(entry);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: entry.title,
    dates: `${toIcsUtc(start)}/${toIcsUtc(end)}`,
    location: entry.location,
    details: entry.description ?? "",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function escapeIcs(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function buildIcs(entry: CalendarEntry): string {
  const { start, end } = bounds(entry);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${toIcsUtc(start)}-${Math.random().toString(36).slice(2)}@invite`,
    `DTSTAMP:${toIcsUtc(new Date())}`,
    `DTSTART:${toIcsUtc(start)}`,
    `DTEND:${toIcsUtc(end)}`,
    `SUMMARY:${escapeIcs(entry.title)}`,
    `LOCATION:${escapeIcs(entry.location)}`,
    `DESCRIPTION:${escapeIcs(entry.description ?? "")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(entry: CalendarEntry, filename = "invitation.ics") {
  const blob = new Blob([buildIcs(entry)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function mapsEmbedUrl(lat: number, lng: number, label: string): string {
  const q = encodeURIComponent(label);
  return `https://www.google.com/maps?q=${lat},${lng}(${q})&z=15&output=embed`;
}

export function mapsPlaceUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export function mapsDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

const IST_FORMAT = new Intl.DateTimeFormat("en-IN", {
  weekday: "short",
  day: "numeric",
  month: "short",
  timeZone: "Asia/Kolkata",
});

const IST_TIME = new Intl.DateTimeFormat("en-IN", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Kolkata",
});

export const formatEventDate = (iso: string) => IST_FORMAT.format(new Date(iso));
export const formatEventTime = (iso: string) => IST_TIME.format(new Date(iso));
