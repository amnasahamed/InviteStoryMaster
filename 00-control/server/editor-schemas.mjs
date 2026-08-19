/**
 * Per-template editor schemas.
 * The Control Centre UI renders ONLY these sections/fields for the selected template.
 * Paths map into the shared client.json shape used by adapters.
 */

/** @typedef {{ path: string, label: string, type?: "text"|"textarea"|"number"|"datetime", hint?: string }} EditorField */
/**
 * @typedef {object} EditorSection
 * @property {string} id
 * @property {string} label
 * @property {string} [description]
 * @property {boolean} [alwaysOn] - hero/footer style; cannot be removed
 * @property {string} [toggleKey] - client.sections[toggleKey]
 * @property {"fields"|"story"|"contacts"|"events"|"media"} [kind]
 * @property {EditorField[]} [fields]
 * @property {string[]} [mediaSlotIds]
 */

const coupleFields = [
  { path: "couple.groom.first", label: "Groom first name" },
  { path: "couple.groom.full", label: "Groom full name" },
  { path: "couple.groom.parents", label: "Groom parents line", type: "textarea" },
  { path: "couple.bride.first", label: "Bride first name" },
  { path: "couple.bride.full", label: "Bride full name" },
  { path: "couple.bride.parents", label: "Bride parents line", type: "textarea" },
];

const timingCore = [
  { path: "timing.primaryISO", label: "Wedding ISO (+05:30)", type: "datetime", hint: "e.g. 2027-01-15T11:00:00+05:30" },
  { path: "timing.dateLabel", label: "Date label" },
  { path: "timing.timeLabel", label: "Time label" },
];

const venueCore = [
  { path: "venue.name", label: "Venue name" },
  { path: "venue.address", label: "Address", type: "textarea" },
  { path: "venue.city", label: "City" },
  { path: "venue.mapQuery", label: "Google Maps link", type: "maps", hint: "Paste a Google Maps URL or place name" },
];

const venueWithCoords = [
  ...venueCore,
  { path: "venue.lat", label: "Latitude", type: "number" },
  { path: "venue.lng", label: "Longitude", type: "number" },
  { path: "venue.note", label: "Directions note", type: "textarea" },
];

/** @type {Record<string, EditorSection[]>} */
export const EDITOR_SCHEMAS = {
  "ghibli-portrait": [
    {
      id: "hero",
      label: "Hero & couple",
      description: "Names and tagline shown in the opening portrait hero.",
      alwaysOn: true,
      kind: "fields",
      fields: [
        ...coupleFields,
        { path: "couple.bride.short", label: "Bride short name" },
        { path: "couple.groom.short", label: "Groom short name" },
        { path: "copy.tagline", label: "Tagline", type: "textarea" },
        ...timingCore,
      ],
      mediaSlotIds: [
        "childhood-bride",
        "childhood-groom",
        "portrait-bride",
        "portrait-groom",
        "body-bride",
        "body-groom",
      ],
    },
    {
      id: "story",
      label: "Story",
      description: "Childhood-to-wedding milestones.",
      toggleKey: "story",
      kind: "story",
    },
    {
      id: "countdown",
      label: "Countdown",
      description: "Live countdown to the ceremony.",
      toggleKey: "countdown",
      kind: "fields",
      fields: timingCore,
    },
    {
      id: "details",
      label: "Ceremony details",
      description: "Ceremony card under the countdown.",
      toggleKey: "events",
      kind: "fields",
      fields: [
        { path: "venue.name", label: "Ceremony venue" },
        { path: "timing.timeLabel", label: "Ceremony time" },
        { path: "copy.invitationNote", label: "Ceremony note", type: "textarea" },
      ],
    },
    {
      id: "venue",
      label: "Venue & map",
      toggleKey: "venue",
      kind: "fields",
      fields: venueCore,
    },
    {
      id: "gallery",
      label: "Gallery",
      toggleKey: "gallery",
      kind: "media",
      mediaSlotIds: ["gallery-1", "gallery-2", "gallery-3", "gallery-4"],
    },
    {
      id: "family",
      label: "Families",
      toggleKey: "family",
      kind: "fields",
      fields: [
        { path: "couple.bride.parents", label: "Bride family title / parents", type: "textarea" },
        { path: "couple.groom.parents", label: "Groom family title / parents", type: "textarea" },
      ],
      mediaSlotIds: ["family-bride", "family-groom"],
    },
    {
      id: "footer",
      label: "Footer",
      alwaysOn: true,
      kind: "fields",
      fields: [
        { path: "copy.closing", label: "Thanks line", type: "textarea" },
      ],
    },
  ],

  "tamil-thirumana": [
    {
      id: "hero",
      label: "Hero & couple",
      alwaysOn: true,
      kind: "fields",
      fields: [
        ...coupleFields,
        { path: "meta.hashtag", label: "Hashtag" },
        { path: "meta.brand", label: "Brand line" },
        { path: "copy.intro", label: "Intro line" },
        { path: "timing.primaryISO", label: "Wedding ISO (+05:30)", type: "datetime" },
        { path: "timing.dateParts.day", label: "Weekday" },
        { path: "timing.dateParts.number", label: "Date number" },
        { path: "timing.dateParts.monthYear", label: "Month & year" },
        { path: "timing.dateParts.time", label: "Time" },
        { path: "venue.city", label: "City" },
      ],
    },
    {
      id: "invite-card",
      label: "Invite card",
      alwaysOn: true,
      kind: "fields",
      fields: [
        { path: "copy.intro", label: "Card intro" },
        { path: "copy.blessing", label: "Blessing strip" },
      ],
    },
    {
      id: "countdown",
      label: "Countdown",
      toggleKey: "countdown",
      kind: "fields",
      fields: [{ path: "timing.primaryISO", label: "Countdown target ISO", type: "datetime" }],
    },
    {
      id: "story",
      label: "Story",
      toggleKey: "story",
      kind: "story",
    },
    {
      id: "events",
      label: "Muhurtham / events",
      toggleKey: "events",
      kind: "events",
    },
    {
      id: "venue",
      label: "Venue",
      toggleKey: "venue",
      kind: "fields",
      fields: venueWithCoords,
    },
    {
      id: "gallery",
      label: "Gallery",
      toggleKey: "gallery",
      kind: "fields",
      fields: [],
      description: "Gallery images are baked into this template shell — toggle to hide the section.",
    },
    {
      id: "contacts",
      label: "Contacts",
      toggleKey: "contacts",
      kind: "contacts",
    },
    {
      id: "footer",
      label: "Footer blessing",
      alwaysOn: true,
      kind: "fields",
      fields: [{ path: "copy.blessing", label: "Blessing", type: "textarea" }],
    },
  ],

  "toran-telugu": [
    {
      id: "hero",
      label: "Hero & couple",
      alwaysOn: true,
      kind: "fields",
      fields: [
        ...coupleFields,
        { path: "meta.hashtag", label: "Hashtag" },
        { path: "copy.intro", label: "Intro" },
        { path: "timing.primaryISO", label: "Wedding ISO", type: "datetime" },
        { path: "timing.dateParts.day", label: "Weekday" },
        { path: "timing.dateParts.number", label: "Date number" },
        { path: "timing.dateParts.monthYear", label: "Month & year" },
        { path: "timing.dateParts.time", label: "Time" },
        { path: "venue.city", label: "City" },
      ],
    },
    {
      id: "countdown",
      label: "Countdown",
      alwaysOn: true,
      kind: "fields",
      fields: timingCore,
    },
    {
      id: "story",
      label: "Story",
      alwaysOn: true,
      kind: "story",
    },
    {
      id: "events",
      label: "Events",
      alwaysOn: true,
      kind: "events",
    },
    {
      id: "venue",
      label: "Venue",
      alwaysOn: true,
      kind: "fields",
      fields: venueWithCoords,
    },
    {
      id: "contacts",
      label: "Contacts",
      alwaysOn: true,
      kind: "contacts",
    },
  ],

  "rajwada-royale": [
    {
      id: "hero",
      label: "Door gate & hero",
      alwaysOn: true,
      kind: "fields",
      fields: [
        ...coupleFields,
        { path: "meta.hashtag", label: "Hashtag" },
        { path: "meta.monogram", label: "Monogram" },
        ...timingCore,
      ],
    },
    {
      id: "countdown",
      label: "Countdown",
      toggleKey: "countdown",
      kind: "fields",
      fields: timingCore,
    },
    {
      id: "invite-text",
      label: "Invitation note",
      alwaysOn: true,
      kind: "fields",
      fields: [
        { path: "copy.invitationNote", label: "Invitation note", type: "textarea" },
        { path: "couple.groom.parents", label: "Groom parents" },
        { path: "couple.bride.parents", label: "Bride parents" },
      ],
    },
    {
      id: "story",
      label: "Story",
      toggleKey: "story",
      kind: "story",
      mediaSlotIds: ["story-1", "story-2", "story-3"],
    },
    {
      id: "events",
      label: "Wedding event",
      toggleKey: "events",
      kind: "events",
    },
    {
      id: "venue",
      label: "Venue",
      toggleKey: "venue",
      kind: "fields",
      fields: venueWithCoords,
    },
    {
      id: "gallery",
      label: "Gallery",
      toggleKey: "gallery",
      kind: "media",
      mediaSlotIds: ["gallery-1", "gallery-2", "gallery-3", "gallery-4"],
    },
    {
      id: "contacts",
      label: "Contacts",
      toggleKey: "contacts",
      kind: "contacts",
    },
    {
      id: "footer",
      label: "Closing",
      alwaysOn: true,
      kind: "fields",
      fields: [
        { path: "copy.blessing", label: "Blessing", type: "textarea" },
        { path: "copy.closing", label: "Sign-off" },
      ],
    },
  ],

  "rajwada-royale-alt": null, // filled below as copy of rajwada

  "midnight-stargaze": [
    {
      id: "hero",
      label: "Doors & hero",
      alwaysOn: true,
      kind: "fields",
      fields: [
        ...coupleFields,
        { path: "meta.hashtag", label: "Hashtag" },
        { path: "meta.monogram", label: "Monogram" },
        ...timingCore,
      ],
      mediaSlotIds: ["couple"],
    },
    {
      id: "invite",
      label: "Invite message",
      alwaysOn: true,
      kind: "fields",
      fields: [
        { path: "copy.verseHindi", label: "Hindi verse" },
        { path: "copy.verseText", label: "Invite verse", type: "textarea" },
        { path: "copy.invitationNote", label: "Invitation note", type: "textarea" },
      ],
    },
    {
      id: "couple",
      label: "Couple lines",
      alwaysOn: true,
      kind: "fields",
      fields: [
        { path: "couple.groom.parents", label: "Groom parents line", type: "textarea" },
        { path: "couple.bride.parents", label: "Bride parents line", type: "textarea" },
      ],
    },
    {
      id: "events",
      label: "Wedding programme",
      toggleKey: "events",
      kind: "events",
      fields: [
        { path: "timing.dateParts.day", label: "Weekday" },
        { path: "timing.dateParts.number", label: "Day number" },
        { path: "timing.dateParts.monthYear", label: "Month & year" },
      ],
    },
    {
      id: "venue",
      label: "Venue",
      toggleKey: "venue",
      kind: "fields",
      fields: venueCore,
    },
    {
      id: "footer",
      label: "Footer",
      alwaysOn: true,
      kind: "fields",
      fields: [{ path: "meta.hashtag", label: "Hashtag" }],
    },
  ],

  "rajmahal-palace": null,

  "marigold-bhavan": [
    {
      id: "hero",
      label: "Envelope & hero",
      alwaysOn: true,
      kind: "fields",
      fields: [
        { path: "couple.bride.first", label: "Bride" },
        { path: "couple.groom.first", label: "Groom" },
        { path: "timing.dateLabel", label: "Big date label" },
        { path: "timing.primaryISO", label: "Start ISO", type: "datetime" },
        { path: "timing.endISO", label: "End ISO", type: "datetime" },
        { path: "timing.timeLabel", label: "Time line" },
        { path: "copy.invitationNote", label: "Invitation note", type: "textarea" },
      ],
    },
    {
      id: "venue",
      label: "Venue",
      alwaysOn: true,
      kind: "fields",
      fields: venueWithCoords,
    },
    {
      id: "footer",
      label: "Closing",
      alwaysOn: true,
      kind: "fields",
      fields: [{ path: "copy.closing", label: "Closing line" }],
    },
  ],

  "marigold-bhavan-alt": null,

  "sage-parchment": [
    {
      id: "hero",
      label: "Open gate & hero",
      alwaysOn: true,
      kind: "fields",
      fields: [
        ...coupleFields,
        { path: "meta.hashtag", label: "Hashtag" },
        { path: "copy.intro", label: "Invite kicker" },
        ...timingCore,
      ],
    },
    {
      id: "story",
      label: "Story",
      alwaysOn: true,
      kind: "story",
    },
    {
      id: "details",
      label: "Event details",
      alwaysOn: true,
      kind: "fields",
      fields: [
        ...timingCore,
        { path: "copy.invitationNote", label: "Event note", type: "textarea" },
      ],
    },
    {
      id: "venue",
      label: "Venue",
      alwaysOn: true,
      kind: "fields",
      fields: venueWithCoords,
    },
    {
      id: "blessing",
      label: "Blessing",
      alwaysOn: true,
      kind: "fields",
      fields: [
        { path: "copy.blessing", label: "Blessing line", type: "textarea" },
        { path: "copy.closing", label: "Translation / closing", type: "textarea" },
      ],
    },
    {
      id: "contacts",
      label: "Contacts",
      alwaysOn: true,
      kind: "contacts",
    },
  ],

  "kalyana-mandapam": [
    {
      id: "hero",
      label: "Hero & muhurtham",
      alwaysOn: true,
      kind: "fields",
      fields: [
        ...coupleFields,
        { path: "meta.hashtag", label: "Hashtag" },
        { path: "copy.blessing", label: "Telugu blessing" },
        { path: "copy.intro", label: "Invite line 1", type: "textarea" },
        { path: "copy.invitationNote", label: "Invite line 2", type: "textarea" },
        ...timingCore,
        { path: "timing.dateParts.day", label: "Weekday" },
      ],
    },
    {
      id: "events",
      label: "Events",
      alwaysOn: true,
      kind: "events",
    },
    {
      id: "venue",
      label: "Mandapam / venue",
      alwaysOn: true,
      kind: "fields",
      fields: venueCore,
    },
  ],

  "shubha-vivaham": null,

  "lake-pichola": [
    {
      id: "hero",
      label: "Couple & date",
      alwaysOn: true,
      kind: "fields",
      fields: [
        ...coupleFields,
        { path: "meta.hashtag", label: "Hashtag" },
        ...timingCore,
      ],
    },
    {
      id: "venue",
      label: "Venue",
      alwaysOn: true,
      kind: "fields",
      fields: venueCore,
    },
  ],

  "noor-e-zahra": [
    {
      id: "hero",
      label: "Couple & nikkah",
      alwaysOn: true,
      kind: "fields",
      fields: [
        ...coupleFields,
        { path: "copy.blessing", label: "Blessing", type: "textarea" },
        ...timingCore,
        { path: "timing.dateParts.day", label: "Weekday" },
        { path: "timing.dateParts.number", label: "Day" },
        { path: "timing.dateParts.monthYear", label: "Month label" },
      ],
    },
    {
      id: "venue",
      label: "Venue",
      alwaysOn: true,
      kind: "fields",
      fields: venueCore,
    },
    {
      id: "footer",
      label: "Hosts",
      alwaysOn: true,
      kind: "fields",
      fields: [{ path: "copy.closing", label: "Hosts / regards" }],
    },
  ],

  "meadow-nikah": [
    {
      id: "hero",
      label: "Couple",
      alwaysOn: true,
      kind: "fields",
      fields: [
        ...coupleFields,
        { path: "copy.tagline", label: "Bride blurb", type: "textarea" },
        { path: "copy.intro", label: "Groom blurb", type: "textarea" },
        ...timingCore,
      ],
    },
    {
      id: "venue",
      label: "Venue",
      alwaysOn: true,
      kind: "fields",
      fields: venueCore,
    },
    {
      id: "closing",
      label: "Closing",
      alwaysOn: true,
      kind: "fields",
      fields: [{ path: "copy.closing", label: "Closing dua / note", type: "textarea" }],
    },
  ],

  "royal-reception": [
    {
      id: "hero",
      label: "Couple & reception",
      alwaysOn: true,
      kind: "fields",
      fields: [
        ...coupleFields,
        { path: "copy.invitationNote", label: "Invite line", type: "textarea" },
        { path: "copy.tagline", label: "Bride note", type: "textarea" },
        { path: "copy.intro", label: "Groom note", type: "textarea" },
        ...timingCore,
      ],
    },
    {
      id: "venue",
      label: "Venue",
      alwaysOn: true,
      kind: "fields",
      fields: venueCore,
    },
  ],

  "kerala-sands": [
    {
      id: "hero",
      label: "Couple",
      alwaysOn: true,
      kind: "fields",
      fields: [
        ...coupleFields,
        { path: "copy.invitationNote", label: "Invite", type: "textarea" },
        ...timingCore,
      ],
    },
    {
      id: "venue",
      label: "Venue",
      alwaysOn: true,
      kind: "fields",
      fields: venueCore,
    },
  ],

  "grand-line-voyage": [
    {
      id: "hero",
      label: "Crew & voyage",
      alwaysOn: true,
      kind: "fields",
      fields: [
        ...coupleFields,
        { path: "meta.hashtag", label: "Hashtag" },
        { path: "copy.tagline", label: "Bride intro", type: "textarea" },
        { path: "copy.intro", label: "Groom intro", type: "textarea" },
        ...timingCore,
      ],
    },
    {
      id: "venue",
      label: "Venue",
      alwaysOn: true,
      kind: "fields",
      fields: venueCore,
    },
  ],

  "lotus-barge": [
    {
      id: "hero",
      label: "Moonlit opening",
      description: "Couple identity and copy used by the two-tap opening journey.",
      alwaysOn: true,
      kind: "fields",
      fields: [
        ...coupleFields,
        { path: "meta.hashtag", label: "Hashtag" },
        { path: "meta.monogram", label: "Monogram" },
        { path: "copy.intro", label: "Opening eyebrow" },
        { path: "copy.tagline", label: "Opening title", type: "textarea" },
        { path: "copy.invitationNote", label: "Invitation message", type: "textarea" },
        { path: "copy.verseHindi", label: "Blessing heading" },
        { path: "copy.verseText", label: "Family welcome", type: "textarea" },
      ],
      mediaSlotIds: ["intro-poster", "intro-end", "intro-video"],
    },
    {
      id: "scene",
      label: "Lotus barge scene",
      alwaysOn: true,
      kind: "media",
      mediaSlotIds: [
        "sky",
        "water-palace",
        "barge",
        "couple",
        "mandap",
        "foreground-lotus",
        "floating-petals",
        "diya",
        "ornamental-frame",
        "social-card",
      ],
    },
    {
      id: "countdown",
      label: "Countdown",
      toggleKey: "countdown",
      kind: "fields",
      fields: timingCore,
    },
    {
      id: "events",
      label: "Wedding",
      description: "This template supports one Wedding event only.",
      toggleKey: "events",
      kind: "fields",
      fields: [
        ...timingCore,
        { path: "events.0.note", label: "Wedding note", type: "textarea" },
      ],
    },
    {
      id: "venue",
      label: "Venue and directions",
      toggleKey: "venue",
      kind: "fields",
      fields: venueCore,
    },
    {
      id: "footer",
      label: "Closing",
      alwaysOn: true,
      kind: "fields",
      fields: [{ path: "copy.closing", label: "Closing line", type: "textarea" }],
    },
  ],
};

// Aliases sharing the same page structure
EDITOR_SCHEMAS["rajwada-royale-alt"] = EDITOR_SCHEMAS["rajwada-royale"].map((s) => ({
  ...s,
  // alt demo: content editable, toggles not wired in page yet
  toggleKey: undefined,
  alwaysOn: true,
}));
EDITOR_SCHEMAS["rajmahal-palace"] = EDITOR_SCHEMAS["midnight-stargaze"].map((s) => ({
  ...s,
  toggleKey: undefined,
  alwaysOn: true,
  mediaSlotIds: undefined,
}));
EDITOR_SCHEMAS["marigold-bhavan-alt"] = EDITOR_SCHEMAS["marigold-bhavan"];
EDITOR_SCHEMAS["shubha-vivaham"] = EDITOR_SCHEMAS["kalyana-mandapam"];

/**
 * @param {string} templateId
 * @returns {EditorSection[]}
 */
export function getEditorSchema(templateId) {
  return EDITOR_SCHEMAS[templateId] || [];
}
