import fs from "node:fs/promises";
import path from "node:path";
import { jsString } from "../client-model.mjs";

const s = jsString;

export async function writeNoor(clientDir, client, configPath) {
  const bride = client.couple.bride;
  const groom = client.couple.groom;
  const d = new Date(client.timing.primaryISO);

  const content = `export const WEDDING = {
  bride: { first: ${s(bride.first)}, last: ${s((bride.full || "").split(" ").slice(-1)[0] || "")}, script: ${s(bride.first)} },
  groom: { first: ${s(groom.first)}, last: ${s((groom.full || "").split(" ").slice(-1)[0] || "")}, script: ${s(groom.first)} },
  blessing: ${s(client.copy.blessing || client.copy.invitationNote || "")},
  duaArabic: "اللَّهُمَّ بَارِكْ لَهُمَا وَبَارِكْ عَلَيْهِمَا وَاجْمَعْ بَيْنَهُمَا فِي خَيْرٍ",
  duaTranslit: "O Allah, bless them, and send Your blessings upon them, and unite them in goodness.",
  eventName: "Nikkah Ceremony",
  dateISO: ${s(client.timing.primaryISO)},
  dateLabel: ${s(client.timing.dateParts?.monthYear || client.timing.dateLabel)},
  day: ${s(client.timing.dateParts?.number || String(d.getDate()))},
  year: ${s(String(d.getFullYear()))},
  weekday: ${s(client.timing.dateParts?.day || "")},
  time: ${s(client.timing.timeLabel || "")},
  venue: ${s(client.venue.name)},
  venueLine2: ${s(client.venue.city || "")},
  address: ${s(client.venue.address)},
  hosts: ${s(client.copy.closing || "")},
} as const;

export const mapsUrl = \`https://www.google.com/maps/search/?api=1&query=\${encodeURIComponent(
  WEDDING.address,
)}\`;

export function calendarUrl() {
  const start = new Date(WEDDING.dateISO);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
  const fmt = (date) => date.toISOString().replace(/[-:]|\\.\\d{3}/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: \`\${WEDDING.bride.first} & \${WEDDING.groom.first} — \${WEDDING.eventName}\`,
    dates: \`\${fmt(start)}/\${fmt(end)}\`,
    details: WEDDING.blessing,
    location: WEDDING.address,
  });
  return \`https://calendar.google.com/calendar/render?\${params.toString()}\`;
}
`;

  await fs.writeFile(path.join(clientDir, configPath), content, "utf8");
}
