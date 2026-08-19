export type InviteEvent = {
  id: string;
  name: string;
  tamil?: string;
  description: string;
  /** ISO 8601 with timezone offset */
  start: string;
  end: string;
  venue: string;
  address: string;
  dressCode: string;
  /** CSS color for the dress-code dot */
  dressColor: string;
};

export type InviteConfig = {
  brand: string;
  bride: string;
  groom: string;
  /** order the names appear */
  coupleLine: [string, string];
  hashtag: string;
  intro: string;
  /** Main muhurtham moment used for the countdown */
  weddingISO: string;
  dateLabel: {
    day: string;
    number: string;
    monthYear: string;
    time: string;
  };
  city: string;
  venue: {
    name: string;
    address: string;
    lat: number;
    lng: number;
    mapQuery: string;
  };
  events: InviteEvent[];
  story: { year: string; title: string; text: string }[];
  blessing: string;
  families: { side: string; names: string }[];
  contacts: { name: string; role: string; phone: string }[];
};

export const invite: InviteConfig = {
  brand: "Black Myth Studio",
  bride: "Tarunika",
  groom: "Abbhi",
  coupleLine: ["Abbhi", "Tarunika"],
  hashtag: "#AbbhiWedsTarunika",
  intro: "Together with their families",
  weddingISO: "2026-11-22T06:30:00+05:30",
  dateLabel: {
    day: "Sunday",
    number: "22",
    monthYear: "November 2026",
    time: "6:30 AM",
  },
  city: "Coimbatore",
  venue: {
    name: "Sri Thirumana Mahal",
    address: "Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu 641004",
    lat: 11.0234,
    lng: 77.0035,
    mapQuery: "Sri Thirumana Mahal, Avinashi Road, Peelamedu, Coimbatore",
  },
    events: [
    {
      id: "muhurtham",
      name: "Muhurtham",
      tamil: "முகூர்த்தம்",
      description: "The knot is tied as the lamps are lit at dawn.",
      start: "2026-11-22T06:30:00+05:30",
      end: "2026-11-22T10:00:00+05:30",
      venue: "Sri Thirumana Mahal",
      address: "Avinashi Road, Peelamedu, Coimbatore",
      dressCode: "Traditional Silks",
      dressColor: "#c9922f",
    },
  ],
  story: [
    {
      year: "2019",
      title: "A queue at Annapoorna",
      text: "Two strangers argued about which filter coffee in Coimbatore is the real one. Neither of them won.",
    },
    {
      year: "2021",
      title: "Ooty, in the rain",
      text: "One umbrella, four hours of conversation, and a decision neither of them said out loud.",
    },
    {
      year: "2024",
      title: "The temple steps",
      text: "He asked. She had already said yes, three years earlier, somewhere in the rain.",
    },
    {
      year: "2026",
      title: "You are invited",
      text: "With the blessings of our families, we begin our life together at dawn.",
    },
  ],
  blessing: "Celebration · Tradition · Togetherness",
  families: [
    { side: "Son of", names: "Mr. Ramanathan & Mrs. Lakshmi" },
    { side: "Daughter of", names: "Mr. Sundaram & Mrs. Meenakshi" },
  ],
  contacts: [
    { name: "Karthik", role: "Groom's side", phone: "+919876543210" },
    { name: "Divya", role: "Bride's side", phone: "+919876543211" },
  ],
};
