export const wedding = {
  bride: {
    name: "Aanya",
    fullName: "Aanya D. Nakama",
    epithet: "The Marigold Navigator",
    bounty: "1,500,000,000",
    intro:
      "Chartered every monsoon between Kochi and the Grand Line. Reads the stars, the tides and her fiance's terrible jokes with equal accuracy.",
    image: "https://media.invitestory.in/grand-line-voyage/op-bride.png",
  },
  groom: {
    name: "Vikram",
    fullName: "Vikram \u2018Straw Hat\u2019 Rao",
    epithet: "Captain of the Laddoo Pirates",
    bounty: "1,500,000,001",
    intro:
      "Set sail from Hyderabad with one dream: to eat every biryani on every island \u2014 and to marry the girl who drew the map.",
    image: "https://media.invitestory.in/grand-line-voyage/op-groom.png",
  },
  // ISO local time of the muhurat
  date: "2027-02-14T19:30:00",
  dateLabel: "Sunday, 14 February 2027",
  timeLabel: "7:30 PM onwards \u00b7 Baraat at 6:00 PM",
  venue: {
    name: "Thousand Sunset Palace",
    address: "Sunburn Beach Road, Vagator, Goa 403509",
    mapsQuery: "Vagator Beach, Goa",
  },
  hashtag: "#TheGrandLineOfMarriage",
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  wedding.venue.mapsQuery,
)}`;

function toIcsStamp(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
  `${wedding.bride.name} & ${wedding.groom.name} — The Grand Line of Marriage`,
)}&dates=20270214T140000Z/20270214T200000Z&details=${encodeURIComponent(
  "Set your Log Pose! An Indian Wedding Adventure awaits in Goa. #TheGrandLineOfMarriage",
)}&location=${encodeURIComponent(`${wedding.venue.name}, ${wedding.venue.address}`)}`;

export function buildIcs() {
  const start = new Date(wedding.date);
  const end = new Date(start.getTime() + 6 * 60 * 60 * 1000);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Grand Fleet//EN",
    "BEGIN:VEVENT",
    `UID:${start.getTime()}@wedding-grand-fleet`,
    `DTSTAMP:${toIcsStamp(new Date())}`,
    `DTSTART:${toIcsStamp(start)}`,
    `DTEND:${toIcsStamp(end)}`,
    `SUMMARY:${wedding.bride.name} & ${wedding.groom.name} \u2014 The Grand Line of Marriage`,
    `LOCATION:${wedding.venue.name}, ${wedding.venue.address}`,
    "DESCRIPTION:Set your Log Pose! An Indian Wedding Adventure awaits.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
