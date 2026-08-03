// ─────────────────────────────────────────────────────────────
//  WEDDING CONFIG — edit this one file per customer
// ─────────────────────────────────────────────────────────────

export const wedding = {
  bride: "Ayesha",
  groom: "Ibrahim",
  brideFull: "Ayesha Rahman",
  groomFull: "Ibrahim Hassan",
  brideParents: "Daughter of Mrs. Farida & Mr. Khalid Rahman",
  groomParents: "Son of Mrs. Samira & Mr. Yusuf Hassan",
  hashtag: "#AyeshaWedsIbrahim",
  monogram: "A · I",

  // Wedding (countdown + calendar) — one event only
  dateISO: "2027-03-14T16:00:00+05:30",
  dateLabel: "Sunday, 14th March 2027",
  timeLabel: "Nikah at 4:00 PM",

  venue: {
    name: "The Ivory Courtyard",
    address: "12 Jasmine Lane, Bandra West, Mumbai 400050",
    mapsQuery: "Bandra West Mumbai",
  },

  verse: {
    arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    text: "With soft hearts and grateful families, we invite you to witness our nikah — a quiet beginning, danced into forever.",
  },

  events: [
    {
      name: "Wedding",
      icon: "heart",
      date: "Sunday, 14th March 2027",
      dayLabel: "Sunday",
      dayNum: "14",
      monthLabel: "March 2027",
      time: "Nikah at 4:00 PM",
      venue: "The Ivory Courtyard, Mumbai",
      note: "A gentle ceremony of vows, prayer, and celebration — one sacred day.",
    },
  ],

  program: [
    { name: "Guest Arrival", time: "3:15 PM" },
    { name: "Nikah Ceremony", time: "4:00 PM" },
    { name: "Dua & Blessings", time: "4:45 PM" },
    { name: "Dinner & Celebration", time: "6:00 PM" },
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
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
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
