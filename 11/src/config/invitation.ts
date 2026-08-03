/**
 * Single source of truth for one couple's invitation.
 * Duplicate the project, edit this file, swap the images in src/assets, deploy.
 */

export const invitation = {
  couple: {
    bride: "Priyanka Sharma",
    brideShort: "Priyanka",
    groom: "Ishaan Patel",
    groomShort: "Ishaan",
    hashtag: "#PriyankaWedsIshaan",
  },
  invite: {
    kicker: "Together with their families",
    line: "cordially invite you to their wedding",
  },
  event: {
    title: "The Wedding of Priyanka & Ishaan",
    /** ISO with timezone offset — India Standard Time */
    startsAt: "2028-07-09T16:00:00+05:30",
    endsAt: "2028-07-09T22:00:00+05:30",
    dateLabel: "09 . 07 . 2028",
    dayLabel: "Sunday",
    timeLabel: "4:00 in the afternoon",
    dressCode: "Indian festive · Sage, cream & gold",
    note: "Reception to follow",
  },
  venue: {
    name: "Fig Tree Hotel",
    address: "123 Any Street, City, State 500001",
    mapsQuery: "Fig Tree Hotel, Jaipur",
    lat: 26.9124,
    lng: 75.7873,
  },
  story: [
    {
      year: "2023",
      title: "The first meeting",
      text: "A monsoon evening, a mutual friend's chai party, and a conversation that refused to end.",
      image: "story-2",
    },
    {
      year: "2026",
      title: "Roka & rituals",
      text: "Two families, one long table of sweets, and a promise made over marigolds and laughter.",
      image: "story-3",
    },
    {
      year: "2028",
      title: "The wedding",
      text: "Under a gold mandap, with everyone we love around us, we begin the rest of it.",
      image: "story-1",
    },
  ],
  blessing: {
    line: "May your intentions be one, may your hearts beat as one.",
    translation:
      "Two families, one thread of gold — and a lifetime of ordinary days made luminous together.",
    source: "A blessing from both families",
  },
  footer: {
    families: "With love, the Sharma & Patel families",
    contacts: [
      { name: "Rohan Sharma", phone: "+919876543210" },
      { name: "Meera Patel", phone: "+919876543211" },
    ],
  },
} as const;

export type Invitation = typeof invitation;
