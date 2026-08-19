/**
 * Single source of truth for one couple's invitation.
 * Duplicate the project, edit this file, swap the images in src/assets, deploy.
 */

export const invitation = {
  couple: {
    bride: "Surya",
    brideShort: "Surya",
    groom: "Jayesh",
    groomShort: "Jayesh",
    hashtag: "#SuryaAndJayesh",
  },
  invite: {
    kicker: "Together with their families",
    line: "cordially invite you to celebrate their engagement",
  },
  event: {
    title: "The Engagement of Surya & Jayesh",
    /** ISO with timezone offset — India Standard Time */
    startsAt: "2026-09-04T10:00:00+05:30",
    endsAt: "2026-09-04T15:00:00+05:30",
    dateLabel: "04 . 09 . 2026",
    dayLabel: "Friday",
    timeLabel: "10:00 in the morning",
    dressCode: "Traditional / Festive Indian Attire",
    note: "Lunch and celebrations to follow",
  },
  venue: {
    name: "SN Auditorium Olari",
    address: "Sree Narayana Road, Kadavaram Rd, Olarikkara, Thrissur, Kerala 680012",
    mapsQuery:
      "SN AUDITORIUM OLARI, Sree Narayana road, Kadavaram Rd, Olarikkara, Thrissur, Kerala 680012",
    url: "https://maps.app.goo.gl/qJkMpg9ghiDaAtKB9?g_st=ac",
    lat: 10.518,
    lng: 76.192,
  },
  story: [
    {
      year: "2024",
      title: "The First Meeting",
      text: "A warm introduction, shared smiles, and a conversation that effortlessly turned into something meaningful.",
      image: "story-2",
    },
    {
      year: "2025",
      title: "Growing Together",
      text: "Cherished memories, mutual understanding, and two souls discovering their perfect match.",
      image: "story-3",
    },
    {
      year: "2026",
      title: "The Engagement",
      text: "Surrounded by our loved ones, we celebrate this joyous milestone and begin our journey together.",
      image: "story-1",
    },
  ],
  blessing: {
    line: "May your intentions be one, may your hearts beat as one.",
    translation:
      "Two families, one thread of gold — and a lifetime of happiness made luminous together.",
    source: "A blessing from both families",
  },
  footer: {
    families: "With love & warm wishes from the Families",
    contacts: [],
  },
  meta: {
    title: "Surya & Jayesh — Engagement Invitation",
    description:
      "Surya and Jayesh cordially invite you to celebrate their engagement on September 4, 2026 at SN Auditorium Olari, Thrissur, Kerala.",
    url: "https://surya-jayesh.vercel.app",
    image: "https://surya-jayesh.vercel.app/og-image.jpg",
    siteName: "Surya & Jayesh Engagement",
  },
} as const;

export type Invitation = typeof invitation;
