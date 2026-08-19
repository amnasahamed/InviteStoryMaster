export const couple = {
  bride: "Ananya",
  groom: "Aarav",
  tagline: "Two souls, one shore",
  dateLabel: "Saturday, 14 February 2026",
  weddingISO: "2026-02-14T18:30:00+05:30",
};

export type WeddingEvent = {
  name: string;
  glyph: string;
  date: string;
  time: string;
  venue: string;
  note: string;
};

export const events: WeddingEvent[] = [
  {
    name: "Haldi",
    glyph: "❋",
    date: "12 Feb 2026",
    time: "10:00 AM",
    venue: "Garden Lawn, Sea Pearl Resort",
    note: "Wear yellow. Expect turmeric everywhere.",
  },
  {
    name: "Mehendi",
    glyph: "❁",
    date: "12 Feb 2026",
    time: "4:00 PM",
    venue: "Palm Courtyard, Sea Pearl Resort",
    note: "Henna, chai and dholak by the sea.",
  },
  {
    name: "Sangeet",
    glyph: "✧",
    date: "13 Feb 2026",
    time: "7:30 PM",
    venue: "Coral Ballroom, Sea Pearl Resort",
    note: "Dancing floor opens after dinner.",
  },
  {
    name: "Wedding",
    glyph: "☀",
    date: "14 Feb 2026",
    time: "6:30 PM",
    venue: "Sunset Beach Mandap",
    note: "Barefoot on the sand as the sun sets.",
  },
  {
    name: "Reception",
    glyph: "❖",
    date: "15 Feb 2026",
    time: "8:00 PM",
    venue: "Ocean Terrace, Sea Pearl Resort",
    note: "Cocktails, supper and long goodbyes.",
  },
];

export const venue = {
  name: "Sea Pearl Resort",
  address: "Beach Road, Cavelossim, South Goa 403731",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cavelossim+Beach+Goa",
};

function icsStamp(d: Date) {
  return `${d.toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`;
}

export function buildICS() {
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Aarav & Ananya//Wedding//EN"];
  const starts: Record<string, string> = {
    Haldi: "2026-02-12T10:00:00+05:30",
    Mehendi: "2026-02-12T16:00:00+05:30",
    Sangeet: "2026-02-13T19:30:00+05:30",
    Wedding: "2026-02-14T18:30:00+05:30",
    Reception: "2026-02-15T20:00:00+05:30",
  };
  for (const ev of events) {
    const start = new Date(starts[ev.name] ?? couple.weddingISO);
    const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
    lines.push(
      "BEGIN:VEVENT",
      `UID:${ev.name.toLowerCase()}-aarav-ananya@wedding`,
      `DTSTAMP:${icsStamp(new Date())}`,
      `DTSTART:${icsStamp(start)}`,
      `DTEND:${icsStamp(end)}`,
      `SUMMARY:${ev.name} | ${couple.groom} & ${couple.bride}`,
      `LOCATION:${ev.venue}`,
      `DESCRIPTION:${ev.note}`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function downloadICS() {
  const blob = new Blob([buildICS()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "aarav-ananya-wedding.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
