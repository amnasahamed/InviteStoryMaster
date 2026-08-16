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
  bride: "Samyuktha",
  groom: "Aditya",
  coupleLine: ["Aditya", "Samyuktha"],
  hashtag: "#AdityaWedsSamyuktha",
  intro: "Together with their families",
  weddingISO: "2026-12-13T09:15:00+05:30",
  dateLabel: {
    day: "Sunday",
    number: "13",
    monthYear: "December 2026",
    time: "9:15 AM",
  },
  city: "Hyderabad",
  venue: {
    name: "Sri Venkateswara Kalyana Vedika",
    address: "Financial District, Gachibowli, Hyderabad, Telangana 500032",
    lat: 17.4156,
    lng: 78.3428,
    mapQuery: "Sri Venkateswara Kalyana Vedika, Financial District, Gachibowli, Hyderabad",
  },
  events: [
    {
      id: "muhurtham",
      name: "Muhurtham",
      tamil: "ముహూర్తం",
      description: "The auspicious knot is tied amidst Vedic chants as dawn turns to morning.",
      start: "2026-12-13T09:15:00+05:30",
      end: "2026-12-13T12:30:00+05:30",
      venue: "Sri Venkateswara Kalyana Vedika",
      address: "Financial District, Gachibowli, Hyderabad",
      dressCode: "Traditional Silks",
      dressColor: "#c9922f",
    },
  ],
  story: [
    {
      year: "2020",
      title: "The Coffee Conversation",
      text: "An impromptu conversation that started with favorite books and lasted until the cafe closed.",
    },
    {
      year: "2022",
      title: "Road Trips & Rain",
      text: "Countless road trips, shared songs, and knowing home was wherever they were together.",
    },
    {
      year: "2025",
      title: "The Forever Promise",
      text: "Under the sunset by the lake, he asked the question she had known the answer to all along.",
    },
    {
      year: "2026",
      title: "Our New Beginning",
      text: "With the blessings and love of our families, we begin our lifetime together.",
    },
  ],
  blessing: "Celebration · Tradition · Togetherness",
  families: [
    { side: "Son of", names: "Mr. Venkata Ramana & Mrs. Sunitha" },
    { side: "Daughter of", names: "Mr. Satyanarayana & Mrs. Padmavathi" },
  ],
  contacts: [
    { name: "Nikhil", role: "Groom's side", phone: "+919876543210" },
    { name: "Shreya", role: "Bride's side", phone: "+919876543211" },
  ],
};
