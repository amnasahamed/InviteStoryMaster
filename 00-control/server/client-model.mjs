/** @typedef {import('./registry.mjs').TemplateRegistryEntry} TemplateRegistryEntry */

/**
 * @typedef {object} ClientConfig
 * @property {{ templateId: string, slug: string, brand?: string, hashtag?: string, monogram?: string }} meta
 * @property {{
 *   bride: { first: string, full?: string, short?: string, parents?: string },
 *   groom: { first: string, full?: string, short?: string, parents?: string },
 *   displayOrder?: [string, string]
 * }} couple
 * @property {{
 *   intro?: string, tagline?: string, blessing?: string,
 *   invitationNote?: string, closing?: string,
 *   verseHindi?: string, verseText?: string
 * }} copy
 * @property {{
 *   primaryISO: string, endISO?: string,
 *   dateLabel: string, timeLabel?: string,
 *   dateParts?: { day?: string, number?: string, monthYear?: string, time?: string }
 * }} timing
 * @property {{
 *   name: string, address: string, city?: string,
 *   mapQuery: string, lat?: number, lng?: number, note?: string
 * }} venue
 * @property {Array<{ id: string, name: string, localName?: string, startISO: string, endISO?: string, durationMinutes?: number, venue?: string, address?: string, dressCode?: string, note?: string }>} [events]
 * @property {Array<{ year?: string, title: string, date?: string, text: string }>} [story]
 * @property {Array<{ src: string, alt: string }>} [gallery]
 * @property {Array<{ name: string, role?: string, phone: string }>} [contacts]
 * @property {{
 *   story?: boolean, gallery?: boolean, family?: boolean,
 *   countdown?: boolean, events?: boolean, venue?: boolean, contacts?: boolean
 * }} sections
 * @property {Record<string, string>} [media]
 * @property {{ status?: string, at?: string, log?: string }} [lastBuild]
 */

/**
 * @param {TemplateRegistryEntry} template
 * @param {{ slug: string, bride: string, groom: string }} input
 * @returns {ClientConfig}
 */
export function createDefaultClient(template, { slug, bride, groom }) {
  const brideFirst = bride.trim() || "Bride";
  const groomFirst = groom.trim() || "Groom";
  const hashtag = `#${groomFirst.replace(/\s+/g, "")}Weds${brideFirst.replace(/\s+/g, "")}`;
  const monogram = `${groomFirst[0] || "G"} · ${brideFirst[0] || "B"}`;
  const primaryISO = "2027-01-15T11:00:00+05:30";

  /** @type {ClientConfig['sections']} */
  const sections = {};
  for (const key of template.sectionKeys) {
    sections[key] = true;
  }

  return {
    meta: {
      templateId: template.id,
      slug,
      brand: "InviteStory",
      hashtag,
      monogram,
    },
    couple: {
      bride: { first: brideFirst, full: brideFirst, short: brideFirst, parents: "Daughter of …" },
      groom: { first: groomFirst, full: groomFirst, short: groomFirst, parents: "Son of …" },
      displayOrder: [groomFirst, brideFirst],
    },
    copy: {
      intro: "Together with their families",
      tagline: "Two hearts. One forever.",
      blessing: "With love and gratitude,",
      invitationNote:
        "With the blessings of our families, we invite you to celebrate our wedding. Your presence is the greatest gift.",
      closing: "We cannot wait to celebrate with you.",
      verseHindi: "॥ श्री गणेशाय नमः ॥",
      verseText: "Together with their families, request the honour of your presence.",
    },
    timing: {
      primaryISO,
      dateLabel: "Thursday, 15 January 2027",
      timeLabel: "11:00 AM onwards",
      dateParts: {
        day: "Thursday",
        number: "15",
        monthYear: "January 2027",
        time: "11:00 AM",
      },
    },
    venue: {
      name: "Wedding Venue",
      address: "City, State, India",
      city: "City",
      mapQuery: "Wedding Venue",
      lat: 17.385,
      lng: 78.4867,
      note: "",
    },
    events: [
      {
        id: "wedding",
        name: "Wedding",
        startISO: primaryISO,
        durationMinutes: 180,
        venue: "Wedding Venue",
        address: "City, State, India",
        dressCode: "Traditional / Formal",
        note: "Please arrive 15 minutes early.",
      },
    ],
    story: [
      {
        year: "2019",
        title: "We met",
        text: "A chance meeting that became everything.",
      },
      {
        year: "2024",
        title: "The yes",
        text: "A promise made, and a lifetime ahead.",
      },
      {
        year: "2027",
        title: "You are invited",
        text: "With the blessings of our families, we begin our life together.",
      },
    ],
    gallery: [],
    contacts: [
      { name: "Family contact", role: "Groom's side", phone: "+919999999999" },
    ],
    sections,
    media: {},
    lastBuild: { status: "never" },
  };
}

export function slugify(input) {
  return String(input || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function escapeTs(str) {
  return String(str ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");
}

export function jsString(str) {
  return JSON.stringify(String(str ?? ""));
}
