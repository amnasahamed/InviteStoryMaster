export const wedding = {
  bride: {
    name: "Aaliya Fathima",
    parents: "D/o Rashid Ahmed & Zainab Rashid",
    note: "A gentle soul with a poet's heart, she paints, she laughs loudest, and she has been waiting for this day since forever.",
  },
  groom: {
    name: "Zayan Abdullah",
    parents: "S/o Imran Abdullah & Farida Imran",
    note: "A quiet dreamer and stubborn optimist, he collects old records, brews terrible chai, and found his home in her.",
  },
  invite:
    "As two souls unite in faith, love, and companionship, we warmly invite you to celebrate the reception of",
  dateISO: "2026-11-21T18:00:00+05:30",
  endISO: "2026-11-21T22:00:00+05:30",
  dateLabel: "November 2026",
  day: "21",
  timeLabel: "6:00 PM – 10:00 PM",
  venue: "The Grand Mirasol Convention Centre",
  venueArea: "Banjara Hills, Hyderabad",
  mapsQuery: "The Grand Mirasol Convention Centre Banjara Hills Hyderabad",
  regards: ["Ayaan", "Sana", "Rehan", "Mishal", "Faiz", "Noor", "Idris", "Hiba"],
};

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  wedding.mapsQuery,
)}`;