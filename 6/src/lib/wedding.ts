export const WEDDING = {
  bride: { first: "Aaliya", last: "Zohra", script: "Noorani" },
  groom: { first: "Ibrahim", last: "Yusuf", script: "Rahmani" },
  blessing:
    "With the blessings of Allah and our families, we invite you to share in the joy of our Nikkah as two hearts become one.",
  duaArabic: "اللَّهُمَّ بَارِكْ لَهُمَا وَبَارِكْ عَلَيْهِمَا وَاجْمَعْ بَيْنَهُمَا فِي خَيْرٍ",
  duaTranslit:
    "O Allah, bless them, and send Your blessings upon them, and unite them in goodness.",
  eventName: "Nikkah Ceremony",
  dateISO: "2027-02-19T18:00:00+05:30",
  dateLabel: "February",
  day: "19",
  year: "2027",
  weekday: "Friday",
  time: "6:00 PM onwards",
  venue: "Noor-e-Zahra Grand Masjid",
  venueLine2: "Banjara Hills, Hyderabad",
  address: "Noor-e-Zahra Grand Masjid, Banjara Hills, Hyderabad, Telangana",
  hosts: "Best wishes from Zohra Manzil",
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  WEDDING.address,
)}`;

/** Google Calendar template link (no backend needed). */
export function calendarUrl() {
  const start = new Date(WEDDING.dateISO);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${WEDDING.bride.first} & ${WEDDING.groom.first} — ${WEDDING.eventName}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: WEDDING.blessing,
    location: WEDDING.address,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
