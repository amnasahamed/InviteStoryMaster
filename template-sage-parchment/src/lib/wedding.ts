import { invitation } from "@/config/invitation";

const { event, venue } = invitation;

function toICSDate(iso: string) {
  return new Date(iso)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

export function buildICS() {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//wedding-invite//EN",
    "BEGIN:VEVENT",
    `UID:${toICSDate(event.startsAt)}-wedding@invite`,
    `DTSTAMP:${toICSDate(new Date().toISOString())}`,
    `DTSTART:${toICSDate(event.startsAt)}`,
    `DTEND:${toICSDate(event.endsAt)}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${venue.name}, ${venue.address}`,
    `DESCRIPTION:${invitation.invite.line}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadICS() {
  const blob = new Blob([buildICS()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "wedding-invitation.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export function googleCalendarUrl() {
  const details = `${invitation.invite.kicker} — ${invitation.invite.line}\n\nVenue: ${venue.name}, ${venue.address}\nDress code: ${event.dressCode}\nNote: ${event.note}`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${toICSDate(event.startsAt)}/${toICSDate(event.endsAt)}`,
    details,
    location: `${venue.name}, ${venue.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function mapsUrl() {
  if ("url" in venue && venue.url) {
    return venue.url;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapsQuery)}`;
}

export function directionsUrl() {
  if ("url" in venue && venue.url) {
    return venue.url;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${venue.lat},${venue.lng}`;
}

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

export function timeLeft(target = event.startsAt): TimeLeft {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
    done: false,
  };
}
