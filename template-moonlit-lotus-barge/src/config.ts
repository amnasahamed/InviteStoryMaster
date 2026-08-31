export const wedding = {
  bride: "Ishani",
  groom: "Dev",
  brideFull: "Ishani Rao",
  groomFull: "Dev Malhotra",
  brideParents: "Daughter of Kavita and Raghav Rao",
  groomParents: "Son of Nandini and Vikram Malhotra",
  familySignoff: "The Rao and Malhotra families",
  hashtag: "#DevFoundIshani",
  monogram: "D I",

  intro: {
    eyebrow: "A moonlit invitation",
    title: "An invitation carried by moonlight",
    body: "Follow the lotus barge to a celebration written in the stars.",
    beginLabel: "Begin the Journey",
    enterLabel: "Enter the Celebration",
    tapHint: "Tap the glowing arch",
    playingLabel: "The journey begins",
    videoEnabled: false,
    videoTimeoutMs: 12000,
  },

  dateISO: "2026-12-12T17:30:00+05:30",
  dateLabel: "Saturday, 12 December 2026",
  timeLabel: "From 5:30 PM",
  dayLabel: "Saturday",
  dayNum: "12",
  monthLabel: "December",
  yearLabel: "2026",

  venue: {
    name: "The Leela Palace",
    address: "Lake Pichola, Udaipur, Rajasthan",
    mapsQuery: "The Leela Palace Udaipur Rajasthan",
    landmark: "Beside Lake Pichola",
    directionHint: "Tap to open turn-by-turn directions",
  },

  verse: {
    hindi: "॥ शुभ विवाह ॥",
    text: "With hearts full of joy, our families invite you to witness Ishani and Dev begin their forever beside Lake Pichola.",
  },

  events: [
    {
      name: "Wedding",
      date: "Saturday, 12 December 2026",
      dayLabel: "Saturday",
      dayNum: "12",
      monthLabel: "December 2026",
      time: "From 5:30 PM",
      venue: "The Leela Palace, Udaipur",
      note: "Moonlit vows, floating diyas, and one unforgettable evening by the lake.",
    },
  ],

  program: [
    { name: "Baraat Arrival", time: "5:30 PM" },
    { name: "Jaimala", time: "6:30 PM" },
    { name: "Pheras", time: "7:15 PM" },
    { name: "Dinner", time: "8:30 PM" },
  ],

  assets: {
    introPoster: ".https://media.invitestory.in/moonlit-lotus-barge/assets/lotus/intro-poster.webp",
    introEnd: ".https://media.invitestory.in/moonlit-lotus-barge/assets/lotus/intro-end.webp",
    introVideo: "./assets/lotus/intro-journey.mp4",
    sky: "./assets/lotus/sky.webp",
    environment: "./assets/lotus/water-palace.webp",
    barge: ".https://media.invitestory.in/moonlit-lotus-barge/assets/lotus/barge.png",
    couple: ".https://media.invitestory.in/moonlit-lotus-barge/assets/lotus/couple.png",
    mandap: ".https://media.invitestory.in/moonlit-lotus-barge/assets/lotus/lotus-mandap.png",
    foregroundLotus: ".https://media.invitestory.in/moonlit-lotus-barge/assets/lotus/foreground-lotus.png",
    diya: ".https://media.invitestory.in/moonlit-lotus-barge/assets/lotus/diya.png",
    petals: ".https://media.invitestory.in/moonlit-lotus-barge/assets/lotus/floating-petals.png",
    frame: ".https://media.invitestory.in/moonlit-lotus-barge/assets/lotus/ornamental-frame.png",
    social: ".https://media.invitestory.in/moonlit-lotus-barge/assets/lotus/social-card.webp",
  },

  footer: {
    title: "Meet us under the moon",
  },

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
    details: `${wedding.venue.name}, ${wedding.venue.address}. ${wedding.hashtag}`,
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
    `DESCRIPTION:${wedding.venue.name}, ${wedding.venue.address}`,
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
