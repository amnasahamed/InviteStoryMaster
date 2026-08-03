/**
 * ═══════════════════════════════════════════════════════════════
 *  TEMPLATE CONFIG — the ONLY file you edit per client.
 *  Swap names, dates, venue and links → deploy → done.
 * ═══════════════════════════════════════════════════════════════
 */

export interface WeddingEvent {
  id: string;
  label: string;      // small caps label
  title: string;      // script title
  dateLine: string;   // human readable date
  timeLine: string;   // human readable time
  startISO: string;   // ISO 8601 with +05:30 offset (IST)
  endISO: string;
  note?: string;
}

export const invite = {
  // ── Couple ──────────────────────────────────────────────
  brideFirst: "Ananya",
  groomFirst: "Rohit",
  monogram: "A · R",
  hashtag: "#AnanyaWedsRohit",
  greetingTelugu: "శుభ వివాహం",
  greetingEnglish: "Shubha Vivaham",

  // ── Families ────────────────────────────────────────────
  brideParents: "Daughter of Sri K. Venkateswara Rao & Smt. Lakshmi",
  groomParents: "Son of Sri M. Satyanarayana & Smt. Padmavathi",
  inviteMessage:
    "With the blessings of our parents and the grace of the Almighty, we joyfully invite you and your family to shower your love and blessings on our wedding celebrations.",

  // ── Event (IST, +05:30) ─────────────────────────────────
  // One event shown center-stage. To add more (reception,
  // haldi, sangeet…), copy a block back into the array.
  countdownTargetISO: "2027-04-22T04:42:00+05:30",
  countdownLabel: "Until the Muhurtham",
  events: [
    {
      id: "muhurtham",
      label: "Wedding",
      title: "Muhurtham",
      dateLine: "Thursday, 22 April 2027",
      timeLine: "4:42 AM",
      startISO: "2027-04-22T04:42:00+05:30",
      endISO: "2027-04-22T06:30:00+05:30",
      note: "Sacred knot ceremony",
    },
    // {
    //   id: "reception",
    //   label: "Reception",
    //   title: "Reception",
    //   dateLine: "Wednesday, 21 April 2027",
    //   timeLine: "7:00 PM Onwards",
    //   startISO: "2027-04-21T19:00:00+05:30",
    //   endISO: "2027-04-21T23:00:00+05:30",
    //   note: "Dinner & blessings",
    // },
  ] as WeddingEvent[],

  // ── Venue ───────────────────────────────────────────────
  venueName: "Sri Sai Balaji Function Hall",
  venueAddress: "Thotapalem, Vizianagaram, Andhra Pradesh",
  // Used for the embedded preview AND the directions link
  mapsQuery: "Sri Sai Balaji Function Hall, Vizianagaram, Andhra Pradesh",

  // ── Footer ──────────────────────────────────────────────
  footerBlessing: "With love & blessings, two families become one",
  creditLine: "Crafted with ♥ by InviteStory · @invitestory.in",
};

// ── Derived helpers ───────────────────────────────────────
export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  invite.mapsQuery
)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

export const mapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  invite.mapsQuery
)}`;
