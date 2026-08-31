// ─────────────────────────────────────────────────────────────
//  WEDDING CONFIG — edit this one file per customer
// ─────────────────────────────────────────────────────────────

export const wedding = {
  bride: "Priya",
  groom: "Arjun",
  brideFull: "Priya Naidu",
  groomFull: "Arjun Reddy",
  brideParents: "Daughter of Smt. Lakshmi & Shri Venkat Naidu",
  groomParents: "Son of Smt. Radha & Shri Suresh Reddy",
  familyName: "Naidu",
  hashtag: "#ArjunWedsPriya",
  monogram: "A · P",

  dateISO: "2026-11-14T10:30:00+05:30",
  dateLabel: "Saturday, 14th November 2026",
  timeLabel: "At 10:30 AM onwards",
  dayLabel: "Saturday",
  dayNum: "14",
  monthLabel: "November",
  yearLabel: "2026",

  venue: {
    name: "Sri Venkateswara Kalyana Mandapam",
    address: "Mylapore, Chennai",
    mapsQuery: "Sri Venkateswara Kalyana Mandapam Mylapore Chennai",
  },

  verse: {
    hindi: "॥ शुभ विवाह ॥",
    tamil: "சுப திருமணம்",
    text: "With the blessings of Lord Ganesha and our families, we joyfully invite you to celebrate the wedding of Arjun and Priya.",
  },

  cover: {
    kicker: "Welcome to",
    title: "Our Wedding",
    headline: "A Beautiful Beginning Awaits",
    gratitude: "Thank you for being a part of our special day.",
    cta: "Tap to Begin",
  },

  intro: {
    videoSrc: ".https://media.invitestory.in/ganesha-gopuram/assets/video/intro.mp4",
    posterSrc: ".https://media.invitestory.in/ganesha-gopuram/assets/video/poster.png",
    focusHint: "Tap to enter",
    skipLabel: "Skip",
    musicEnabled: false,
  },

  rsvp: {
    phone: "+91 98765 43210",
    whatsapp: "919876543210",
    email: "arjun.priya.wedding@example.com",
    note: "Kindly confirm your presence by 1st November.",
  },

  events: [
    {
      name: "Wedding",
      date: "Saturday, 14th November 2026",
      dayLabel: "Saturday",
      dayNum: "14",
      monthLabel: "November 2026",
      time: "At 10:30 AM onwards",
      venue: "Sri Venkateswara Kalyana Mandapam, Mylapore",
      note: "Muhurtham under sacred blessings — the moment two souls become one.",
    },
    {
      name: "Reception",
      date: "Saturday, 14th November 2026",
      dayLabel: "Saturday",
      dayNum: "14",
      monthLabel: "November 2026",
      time: "At 6:30 PM onwards",
      venue: "Sri Venkateswara Kalyana Mandapam, Mylapore",
      note: "An evening of music, dinner, and celebration with family & friends.",
    },
  ],

  program: [
    { name: "Guest Welcome", time: "9:45 AM" },
    { name: "Muhurtham", time: "10:30 AM" },
    { name: "Lunch", time: "12:30 PM" },
    { name: "Reception", time: "6:30 PM" },
  ],

  sections: {
    events: true,
    venue: true,
    countdown: true,
    rsvp: true,
    familyCard: true,
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

export const whatsappUrl = `https://wa.me/${wedding.rsvp.whatsapp}?text=${encodeURIComponent(
  `Namaste! Confirming attendance for ${wedding.groom} & ${wedding.bride}'s wedding.`
)}`;
