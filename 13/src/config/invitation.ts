/**
 * SINGLE SOURCE OF TRUTH FOR THIS INVITATION.
 * To reuse this template for a new couple, edit ONLY this file.
 */

import storyOne from "@/assets/story-1.jpg";
import storyTwo from "@/assets/story-2.jpg";
import storyThree from "@/assets/story-3.jpg";
import galleryOne from "@/assets/gallery-1.jpg";
import galleryTwo from "@/assets/gallery-2.jpg";
import galleryThree from "@/assets/gallery-3.jpg";
import galleryFour from "@/assets/gallery-4.jpg";

export type InviteEvent = {
  key: string;
  name: string;
  /** ISO 8601 with timezone offset */
  startsAt: string;
  /** duration in minutes, used for calendar entries */
  durationMinutes: number;
  venue: string;
  address: string;
  dressCode: string;
  /** any CSS colour token or hex used only as a small dress-code dot */
  dressCodeColor: string;
  note?: string;
};

export const invitation = {
  couple: {
    groom: "Rizwan",
    bride: "Ayesha",
    monogram: "R & A",
    hashtag: "#RizwanFoundHisAyesha",
  },

  /** The main muhurat — powers the countdown and the primary calendar button */
  mainEvent: {
    title: "Rizwan & Ayesha — Wedding Ceremony",
    startsAt: "2026-12-19T11:30:00+05:30",
    durationMinutes: 180,
    dateLabel: "Sunday, 19 December 2026",
    timeLabel: "11:30 AM onwards",
  },

  families: {
    groomSide: {
      parents: "Mr. Yousuf Ali & Mrs. Razia Yousuf",
      line: "request the pleasure of your esteemed presence at the wedding of their son",
    },
    brideSide: {
      parents: "Mr. Imran Zafar & Mrs. Nasreen Zafar",
      line: "together with the family of their daughter",
    },
  },

  invitationNote:
    "With the blessings of the Almighty and our elders, we invite you to share in the joy of our wedding. Your presence is the greatest gift we could ask for.",

  story: [
    {
      year: "2021",
      title: "The first chai",
      text: "A mutual friend's birthday, a crowded café in Bandra, and one conversation that refused to end.",
      image: storyOne,
    },
    {
      year: "2024",
      title: "Roka",
      text: "Two families, one courtyard full of marigolds, and enough laddoos to feed the entire street.",
      image: storyTwo,
    },
    {
      year: "2025",
      title: "The yes",
      text: "A ring, mehndi-covered hands, and a promise made in front of everyone who matters.",
      image: storyThree,
    },
  ],

  events: [
    {
      key: "mehndi",
      name: "Mehndi",
      startsAt: "2026-12-17T17:00:00+05:30",
      durationMinutes: 240,
      venue: "Aventel Lawns",
      address: "Kalyan Nagar, Hyderabad",
      dressCode: "Mustard & green",
      dressCodeColor: "#C9A227",
      note: "Henna, chai and a very loud dholak.",
    },
    {
      key: "haldi",
      name: "Haldi",
      startsAt: "2026-12-18T10:00:00+05:30",
      durationMinutes: 180,
      venue: "Family Residence",
      address: "Banjara Hills, Hyderabad",
      dressCode: "Anything yellow",
      dressCodeColor: "#E8B84A",
      note: "Wear something you don't mind ruining.",
    },
    {
      key: "sangeet",
      name: "Sangeet",
      startsAt: "2026-12-18T19:30:00+05:30",
      durationMinutes: 300,
      venue: "Aventel Grand Ballroom",
      address: "Kalyan Nagar, Hyderabad",
      dressCode: "Festive Indian",
      dressCodeColor: "#7B1E2B",
      note: "Rehearsed performances strongly encouraged.",
    },
    {
      key: "nikah",
      name: "Nikah & Wedding",
      startsAt: "2026-12-19T11:30:00+05:30",
      durationMinutes: 180,
      venue: "Park Aventel",
      address: "Kalyan Nagar, Hyderabad",
      dressCode: "Traditional formals",
      dressCodeColor: "#C9A84C",
      note: "The main muhurat. Please be seated by 11:15 AM.",
    },
    {
      key: "reception",
      name: "Reception",
      startsAt: "2026-12-19T19:00:00+05:30",
      durationMinutes: 240,
      venue: "Park Aventel Terrace",
      address: "Kalyan Nagar, Hyderabad",
      dressCode: "Evening elegant",
      dressCodeColor: "#4A6741",
      note: "Dinner, dessert and dancing.",
    },
  ] satisfies InviteEvent[],

  venue: {
    name: "Park Aventel",
    address: "Kalyan Nagar, Road No. 12, Hyderabad, Telangana 500034",
    lat: 17.4126,
    lng: 78.4392,
    directionsNote: "Ample parking behind the banquet block. Valet available from 10:30 AM.",
  },

  gallery: [
    { src: galleryOne, alt: "Mehndi night with henna and marigolds" },
    { src: galleryTwo, alt: "Sangeet dance floor with dhol and lights" },
    { src: galleryThree, alt: "Decorated wedding mandap at golden hour" },
    { src: galleryFour, alt: "Baraat procession with dhol players" },
  ],

  closing: {
    blessing: "Two families, one prayer, and a lifetime that begins with you in the room.",
    signOff: "With love and gratitude,",
  },

  contacts: [
    { name: "Faizan (Groom's brother)", phone: "+919876543210" },
    { name: "Sana (Bride's sister)", phone: "+919812345678" },
  ],
} as const;

export type Invitation = typeof invitation;
