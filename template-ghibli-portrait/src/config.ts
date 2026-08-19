/**
 * ─────────────────────────────────────────────────────────────
 *  WEDDING INVITATION · MASTER CONFIGURATION
 * ─────────────────────────────────────────────────────────────
 *  Everything on the invitation is driven by this single object.
 *  Replace names, dates, photos, venue, theme colors, fonts and
 *  music here — no component code needs to change.
 *
 *  Photos live in `public/images/`. Drop your own files in there
 *  (or use any URL) and update the paths below.
 */

export interface StoryMilestone {
  title: string
  date: string
  text: string
}

export interface GalleryImage {
  src: string
  alt: string
}

export interface FamilySide {
  label: string
  title: string
  photo: string
  members: { name: string; relation: string }[]
}

export interface InvitationConfig {
  couple: {
    bride: string
    groom: string
    /** Short names used in headings */
    brideShort: string
    groomShort: string
  }
  /** ISO date-time of the ceremony — drives the countdown & calendar */
  weddingDate: string
  /** Human-readable date shown under the hero */
  displayDate: string
  tagline: string
  hero: {
    /** Square childhood photos held in front of the faces */
    childhoodBride: string
    childhoodGroom: string
    /** Grown-up portraits revealed on scroll */
    portraitBride: string
    portraitGroom: string
    /** Ghibli-style illustrated bodies holding empty frames */
    bodyBride: string
    bodyGroom: string
  }
  story: StoryMilestone[]
  details: {
    ceremony: { title: string; venue: string; time: string; note: string }
    reception?: { title: string; venue: string; time: string; note: string }
    dressCode: string
  }
  venue: {
    name: string
    address: string
    /** Query used for the embedded Google Map + "Open in Maps" link */
    mapQuery: string
  }
  gallery: GalleryImage[]
  families: { bride: FamilySide; groom: FamilySide }
  calendar: {
    title: string
    description: string
    /** Duration of the event in hours */
    durationHours: number
  }
  music: {
    /** Path/URL to an .mp3 — leave empty to hide the music toggle */
    src: string
    label: string
  }
  theme: {
    /** Warm gold accent (hex) */
    gold: string
    /** Page background (hex) */
    background: string
    /** Main text color (hex) */
    ink: string
    /** Background texture overlay: 'paper' | 'plain' */
    texture: "paper" | "plain"
  }
  fonts: {
    /** Google-font family names (already loaded in index.html) */
    serif: string
    script: string
    sans: string
  }
  footer: {
    thanks: string
    copyright: string
  }
  /** Optional blocks controlled by InviteStory Control Centre */
  sections?: {
    story?: boolean
    countdown?: boolean
    events?: boolean
    venue?: boolean
    gallery?: boolean
    family?: boolean
  }
}

const config: InvitationConfig = {
  couple: {
    bride: "Amelia Rose Bennett",
    groom: "James Alexander Cole",
    brideShort: "Amelia",
    groomShort: "James",
  },
  weddingDate: "2026-12-12T16:00:00+05:30",
  displayDate: "Saturday, December 12th, 2026",
  tagline: "Together since childhood.\nForever begins now.",
  hero: {
    childhoodBride: "images/childhood-bride.png",
    childhoodGroom: "images/childhood-groom.png",
    portraitBride: "images/portrait-bride.png",
    portraitGroom: "images/portrait-groom.png",
    /** Ghibli-style illustrated bodies holding empty frames */
    bodyBride: "images/body-bride.png",
    bodyGroom: "images/body-groom.png",
  },
  story: [
    {
      title: "First Meeting",
      date: "Summer 2004",
      text: "Two seven-year-olds, one sandbox, and a fiercely contested red bucket. Neither of us remembers who won — only that we never really left each other's side after that.",
    },
    {
      title: "Friendship",
      date: "2004 — 2019",
      text: "Fifteen years of borrowed pencils, secret handshakes, birthday cakes and long bicycle rides home. The kind of friendship that quietly becomes home.",
    },
    {
      title: "The Proposal",
      date: "Spring 2025",
      text: "Under the same old maple tree where we carved our initials as kids, James knelt with a ring — and Amelia said yes before he finished the question.",
    },
    {
      title: "The Wedding",
      date: "December 2026",
      text: "And now, the chapter we have been writing our whole lives. We would be honoured to have you there when it begins.",
    },
  ],
  details: {
    ceremony: {
      title: "The Wedding Ceremony",
      venue: "Rosewood Garden Chapel",
      time: "4:00 PM — 5:00 PM",
      note: "Please arrive by 3:30 PM to be seated",
    },
    dressCode: "Garden Formal · Soft neutrals & pastels encouraged",
  },
  venue: {
    name: "Rosewood Garden Estate",
    address: "14 Maple Grove Lane, Willow Creek",
    mapQuery: "Rosewood Garden Estate",
  },
  gallery: [
    { src: "images/gallery-1.png", alt: "Golden hour walk through the garden" },
    { src: "images/gallery-2.png", alt: "Dancing under the string lights" },
    { src: "images/gallery-3.png", alt: "The ring — she said yes" },
    { src: "images/gallery-4.png", alt: "Sunday coffee ritual" },
    { src: "images/gallery-5.png", alt: "The proposal under the maple tree" },
    { src: "images/gallery-6.png", alt: "Sparkler send-off dreams" },
  ],
  families: {
    bride: {
      label: "The Bride's Family",
      title: "The Bennetts",
      photo: "images/family-bride.png",
      members: [
        { name: "Eleanor Bennett", relation: "Mother of the Bride" },
        { name: "Thomas Bennett", relation: "Father of the Bride" },
        { name: "Clara Bennett", relation: "Sister & Maid of Honour" },
      ],
    },
    groom: {
      label: "The Groom's Family",
      title: "The Coles",
      photo: "images/family-groom.png",
      members: [
        { name: "Margaret Cole", relation: "Mother of the Groom" },
        { name: "Henry Cole", relation: "Father of the Groom" },
        { name: "Oliver Cole", relation: "Brother & Best Man" },
      ],
    },
  },
  calendar: {
    title: "Amelia & James — Wedding",
    description: "Wedding ceremony at Rosewood Garden Chapel.",
    durationHours: 1,
  },
  music: {
    src: "",
    label: "Our song",
  },
  theme: {
    gold: "#b98a4e",
    background: "#faf5ec",
    ink: "#46392c",
    texture: "paper",
  },
  fonts: {
    serif: "'Cormorant Garamond', Georgia, serif",
    script: "'Great Vibes', cursive",
    sans: "'Jost', 'Helvetica Neue', sans-serif",
  },
  footer: {
    thanks: "Thank you for celebrating with us",
    copyright: "© 2026 Amelia & James · Handcrafted with love by InviteStory",
  },
  sections: {
    story: true,
    countdown: true,
    events: true,
    venue: true,
    gallery: true,
    family: true,
  },
}

export default config
