// ─────────────────────────────────────────────────────────────
// EDIT THIS FILE ONLY when cloning this template for a client.
// ─────────────────────────────────────────────────────────────

export const invite = {
  bride: "Het",
  groom: "Chirag",
  /** Shown big in the hero */
  dateLabel: "14.02.27",
  /** Local start / end of the main function (ISO, no timezone) */
  start: "2027-02-14T19:00:00",
  end: "2027-02-14T23:00:00",
  /** IANA timezone of the venue */
  timeZoneOffset: "+05:30",
  dayLine: "Sunday, 14th February 2027",
  timeLine: "7:00 PM onwards",
  eventTitle: "Engagement of Chirag & Het",
  invitationNote:
    "Together with their families, we invite you to share in the joy of our engagement — an evening of blessings, laughter and good food.",
  venue: {
    name: "The Grand Bhavan",
    address: "Sardar Patel Road, Navrangpura, Ahmedabad, Gujarat 380009",
    /** Used for the Google Maps deep link */
    query: "Navrangpura, Ahmedabad, Gujarat",
    lat: 23.0365,
    lng: 72.5611,
  },
  closing: "See you there",
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  invite.venue.query,
)}`;

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  invite.venue.query,
)}`;
