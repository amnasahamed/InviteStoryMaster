import { wedding } from "@/lib/wedding";

function toICSDate(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
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
    `SUMMARY:${wedding.bride.name} & ${wedding.groom.name} — Wedding`,
    `LOCATION:${wedding.venue.name}\\, ${wedding.venue.address}`,
    "DESCRIPTION:With love\\, we invite you to celebrate our wedding.",
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
