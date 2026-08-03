// ─────────────────────────────────────────────────────────────
//  WEDDING CONFIG — edit this one file per customer
// ─────────────────────────────────────────────────────────────

export const wedding = {
  bride: "Sheetal",
  groom: "Shubham",
  brideFull: "Sheetal Verma",
  groomFull: "Shubham Kapoor",
  brideParents: "Daughter of Smt. Anita & Shri Prakash Verma",
  groomParents: "Son of Smt. Rekha & Shri Anil Kapoor",
  hashtag: "#SheetalWedsShubham",
  monogram: "S · S",

  // Wedding muhurat (countdown + calendar target) — one event only
  dateISO: "2027-02-06T19:00:00+05:30",
  dateLabel: "Saturday, 6th February 2027",
  timeLabel: "Muhurat at 7:00 PM",

  venue: {
    name: "The Royal Orchid Palace",
    address: "Lake Pichola Road, Udaipur, Rajasthan 313001",
    mapsQuery: "City Palace Udaipur Rajasthan",
  },

  verse: {
    hindi: "॥ श्री गणेशाय नमः ॥",
    text: "Together with their families, request the honour of your presence as two souls become one under a sky full of stars.",
  },

  // The one event for the day — Wedding only.
  events: [
    {
      name: "Wedding",
      icon: "heart",
      date: "Saturday, 6th February 2027",
      dayLabel: "Saturday",
      dayNum: "06",
      monthLabel: "February 2027",
      time: "Muhurat at 7:00 PM",
      venue: "The Royal Orchid Palace, Udaipur",
      note: "Baraat, pheras & the sacred vows — the moment two souls become one.",
    },
  ],

  // Ceremony flow inside the wedding itself
  program: [
    { name: "Baraat Arrival", time: "6:00 PM" },
    { name: "Jaimala", time: "6:45 PM" },
    { name: "Pheras & Sacred Vows", time: "7:00 PM" },
    { name: "Vidaai", time: "10:30 PM" },
  ],
  sections: {
    events: true,
    venue: true,
    countdown: true,
  },
};

// Google Calendar deep link — derived from dateISO so it stays correct.
export const googleCalendarUrl = () => {
  const start = new Date(wedding.dateISO);
  const end = new Date(start.getTime() + 7 * 60 * 60 * 1000);
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

// Downloadable .ics file (works with Apple / Outlook / any calendar).
export const downloadICS = () => {
  const start = new Date(wedding.dateISO);
  const end = new Date(start.getTime() + 7 * 60 * 60 * 1000);
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