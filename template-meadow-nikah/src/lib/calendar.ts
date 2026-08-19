import { wedding } from "@/lib/wedding";

function toICSDate(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function getGoogleCalendarUrl() {
  const start = toICSDate(wedding.dateISO);
  const end = toICSDate(wedding.endISO);
  const title = `${wedding.bride.name} & ${wedding.groom.name} — Wedding Reception`;
  const details = `With love, we invite you to celebrate the Wedding Reception of ${wedding.bride.fullName} & ${wedding.groom.fullName}.\n\nDate: ${wedding.dateLabel}\nTime: ${wedding.timeLabel}\nVenue: ${wedding.venue.name}, ${wedding.venue.address}\nDirections: ${wedding.venue.mapsUrl}`;
  const location = `${wedding.venue.name}, ${wedding.venue.address}`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${start}/${end}`,
    details: details,
    location: location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function openGoogleCalendar() {
  if (typeof window !== "undefined") {
    window.open(getGoogleCalendarUrl(), "_blank", "noopener,noreferrer");
  }
}

/** Builds and downloads an .ics file for the wedding. */
export function downloadInvite() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@wedding`,
    `DTSTAMP:${toICSDate(new Date().toISOString())}`,
    `DTSTART:${toICSDate(wedding.dateISO)}`,
    `DTEND:${toICSDate(wedding.endISO)}`,
    `SUMMARY:${wedding.bride.name} & ${wedding.groom.name} — Wedding Reception`,
    `LOCATION:${wedding.venue.name}\\, ${wedding.venue.address}`,
    `DESCRIPTION:With love\\, we invite you to celebrate the Wedding Reception of ${wedding.bride.fullName} & ${wedding.groom.fullName}.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "wedding-invitation.ics";
  a.click();
  URL.revokeObjectURL(url);
}
