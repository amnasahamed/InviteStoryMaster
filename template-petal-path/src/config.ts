// ─────────────────────────────────────────────────────────────
//  WEDDING CONFIG — edit this one file per customer
// ─────────────────────────────────────────────────────────────

export const wedding = {
  bride: "Harleen",
  groom: "Kabir",
  brideFull: "Harleen Kaur",
  groomFull: "Kabir Singh",
  brideParents: "Daughter of Smt. Gurpreet & Shri Harjit Singh",
  groomParents: "Son of Smt. Manjeet & Shri Ranjit Singh",
  hashtag: "#HarleenWedsKabir",
  monogram: "H · K",

  dateISO: "2026-11-14T11:00:00+05:30",
  dateLabel: "Saturday, 14th November 2026",
  timeLabel: "Anand Karaj at 11:00 AM",

  venue: {
    name: "Gurdwara Sahib Palace Gardens",
    address: "Palace Road, Amritsar, Punjab 143001",
    mapsQuery: "Golden Temple Amritsar Punjab",
  },

  verse: {
    blessing: "ੴ ਸਤਿ ਨਾਮੁ",
    text: "Together with their families, request the honour of your presence as two souls walk the petal path into forever.",
  },

  events: [
    {
      name: "Wedding",
      date: "Saturday, 14th November 2026",
      dayLabel: "Saturday",
      dayNum: "14",
      monthLabel: "November 2026",
      time: "Anand Karaj at 11:00 AM",
      venue: "Gurdwara Sahib Palace Gardens, Amritsar",
      note: "Baraat, Anand Karaj & the sacred vows — the moment two souls become one.",
    },
  ],

  program: [
    { name: "Baraat Arrival", time: "9:30 AM" },
    { name: "Milni", time: "10:15 AM" },
    { name: "Anand Karaj", time: "11:00 AM" },
    { name: "Guru ka Langar", time: "1:00 PM" },
  ],

  sections: {
    events: true,
    venue: true,
    countdown: true,
  },
};

export const googleCalendarUrl = () => {
  const start = new Date(wedding.dateISO);
  const end = new Date(start.getTime() + 5 * 60 * 60 * 1000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]|\.\d{3}/g, "").slice(0, 15) + "Z";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${wedding.bride} weds ${wedding.groom}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `${wedding.venue.name} — ${wedding.venue.address}. ${wedding.hashtag}`,
    location: `${wedding.venue.name}, ${wedding.venue.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const downloadICS = () => {
  const start = new Date(wedding.dateISO);
  const end = new Date(start.getTime() + 5 * 60 * 60 * 1000);
  // Built without a character-class regex so Tailwind's scanner won't treat it as a class.
  const fmt = (d: Date) =>
    d
      .toISOString()
      .replaceAll("-", "")
      .replaceAll(":", "")
      .replaceAll(".", "")
      .slice(0, 15) + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//InviteStory//Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@invitestory`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${wedding.bride} weds ${wedding.groom}`,
    `DESCRIPTION:${wedding.venue.name} — ${wedding.venue.address}`,
    `LOCATION:${wedding.venue.name}\\, ${wedding.venue.address}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${wedding.bride}-${wedding.groom}-wedding.ics`;
  a.click();
  URL.revokeObjectURL(url);
};

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  wedding.venue.mapsQuery
)}&output=embed`;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  wedding.venue.mapsQuery
)}`;
