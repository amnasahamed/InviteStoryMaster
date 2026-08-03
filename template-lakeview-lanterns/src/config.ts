// ─────────────────────────────────────────────────────────────
//  WEDDING CONFIG — edit this one file per customer
// ─────────────────────────────────────────────────────────────

export const wedding = {
  bride: "Meera",
  groom: "Aarav",
  brideFull: "Meera Nair",
  groomFull: "Aarav Menon",
  brideParents: "Daughter of Smt. Lakshmi & Shri Ravi Nair",
  groomParents: "Son of Smt. Anitha & Shri Suresh Menon",
  hashtag: "#AaravWedsMeera",
  monogram: "A · M",

  dateISO: "2026-11-16T18:00:00+05:30",
  dateLabel: "Sunday, 16th November 2026",
  timeLabel: "At 6:00 PM onwards",
  dayLabel: "Sunday",
  dayNum: "16",
  monthLabel: "November",
  yearLabel: "2026",

  venue: {
    name: "The Lakeview Resort",
    address: "Kumarakom, Kerala",
    mapsQuery: "The Lakeview Resort Kumarakom Kerala",
  },

  verse: {
    hindi: "॥ शुभ विवाह ॥",
    text: "Together with their families, we joyfully invite you to celebrate the wedding of Aarav and Meera beside the glowing backwaters of Kumarakom.",
  },

  events: [
    {
      name: "Wedding",
      date: "Sunday, 16th November 2026",
      dayLabel: "Sunday",
      dayNum: "16",
      monthLabel: "November 2026",
      time: "At 6:00 PM onwards",
      venue: "The Lakeview Resort, Kumarakom",
      note: "Lantern-lit vows by the lake — the moment two souls become one.",
    },
  ],

  program: [
    { name: "Guest Welcome", time: "5:30 PM" },
    { name: "Exchange of Vows", time: "6:00 PM" },
    { name: "Dinner & Celebration", time: "7:30 PM" },
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
  const fmt = (d: Date) => {
    const iso = d.toISOString();
    return iso.replace(/-/g, "").replace(/:/g, "").replace(/\.\d{3}/, "").slice(0, 15) + "Z";
  };
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${wedding.groom} weds ${wedding.bride}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `${wedding.venue.name} — ${wedding.venue.address}. ${wedding.hashtag}`,
    location: `${wedding.venue.name}, ${wedding.venue.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const downloadICS = () => {
  const start = new Date(wedding.dateISO);
  const end = new Date(start.getTime() + 5 * 60 * 60 * 1000);
  const fmt = (d: Date) => {
    const iso = d.toISOString();
    return iso.replace(/-/g, "").replace(/:/g, "").replace(/\.\d{3}/, "").slice(0, 15) + "Z";
  };
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//InviteStory//Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@invitestory`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${wedding.groom} weds ${wedding.bride}`,
    `DESCRIPTION:${wedding.venue.name} — ${wedding.venue.address}`,
    `LOCATION:${wedding.venue.name}\\, ${wedding.venue.address}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${wedding.groom}-${wedding.bride}-wedding.ics`;
  a.click();
  URL.revokeObjectURL(url);
};

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  wedding.venue.mapsQuery
)}&output=embed`;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  wedding.venue.mapsQuery
)}`;
