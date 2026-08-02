// ─────────────────────────────────────────────────────────────
// TEMPLATE CONTRACT — Muhurtham Mandapam (South Indian)
// Swap these values per customer. Nothing else needs to change.
// ─────────────────────────────────────────────────────────────

export interface WeddingEvent {
  id: string;
  title: string;
  telugu: string;
  dateLabel: string;
  timeLabel: string;
  startISO: string; // with +05:30 offset
  endISO: string;
  note?: string;
  icon: "flower" | "hands" | "fire" | "sparkles";
}

export const wedding = {
  bride: "Meghana",
  groom: "Karthik",
  brideFirst: "Meghana",
  groomFirst: "Karthik",
  hashtag: "#MeghanaWedsKarthik",
  blessing: "॥ శ్రీ మహాగణాధిపతయే నమః ॥",
  occasionTelugu: "శుభ ముహూర్తం",
  occasionLabel: "Wedding Muhurtham",

  weekdayLabel: "Sunday",
  dateLabel: "December 6th, 2026",
  muhurthamTimeLabel: "Muhurtham at 10:35 AM",
  muhurthamISO: "2026-12-06T10:35:00+05:30",

  venueName: "Sri Seetha Rama Kalyana Mandapam",
  venueLine1: "Hyderabad",
  venueLine2: "Telangana – 500062, India",
  venueAddress: "Malakpet, Hyderabad, Telangana 500062",
  mapsQuery: "Sri Kalyana Mandapam Malakpet Hyderabad",
  // OpenStreetMap embed (free, no key)
  osmEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=78.4984%2C17.3633%2C78.5384%2C17.3873&layer=mapnik&marker=17.3753%2C78.5184",

  whatsappNumber: "919876543210",
  whatsappMessage:
    "Namaste! We'd love to join Meghana & Karthik's wedding muhurtham on Dec 6th, 2026. — RSVP",

  brideFamily: "The Lakshminarayana Family",
  groomFamily: "The Venkateswarlu Family",
  inviteLine1: "With the divine blessings of Lord Ganesha and our elders,",
  inviteLine2:
    "we joyfully invite you and your family to the wedding muhurtham of our beloved children. Your presence is the greatest gift — please come, bless the couple, and celebrate with us.",
} as const;

export const events: WeddingEvent[] = [
  {
    id: "mehendi",
    title: "Mehendi",
    telugu: "మెహందీ",
    dateLabel: "Friday, 4th December 2026",
    timeLabel: "4:00 PM onwards",
    startISO: "2026-12-04T16:00:00+05:30",
    endISO: "2026-12-04T19:00:00+05:30",
    note: "An evening of henna, music and family.",
    icon: "flower",
  },
  {
    id: "haldi",
    title: "Haldi & Pellikuthuru",
    telugu: "పెళ్లికూతురు",
    dateLabel: "Saturday, 5th December 2026",
    timeLabel: "9:00 AM onwards",
    startISO: "2026-12-05T09:00:00+05:30",
    endISO: "2026-12-05T12:00:00+05:30",
    note: "Turmeric rituals to bless the bride and groom.",
    icon: "hands",
  },
  {
    id: "muhurtham",
    title: "Muhurtham",
    telugu: "ముహూర్తం",
    dateLabel: "Sunday, 6th December 2026",
    timeLabel: "10:35 AM sharp",
    startISO: "2026-12-06T10:35:00+05:30",
    endISO: "2026-12-06T12:30:00+05:30",
    note: "The sacred ceremony — please be seated by 10:00 AM.",
    icon: "fire",
  },
  {
    id: "reception",
    title: "Reception & Dinner",
    telugu: "రిసెప్షన్",
    dateLabel: "Sunday, 6th December 2026",
    timeLabel: "6:30 PM onwards",
    startISO: "2026-12-06T18:30:00+05:30",
    endISO: "2026-12-06T22:00:00+05:30",
    note: "An evening of celebration, blessings and feast.",
    icon: "sparkles",
  },
];

export const mainEvent: WeddingEvent = events[2];
