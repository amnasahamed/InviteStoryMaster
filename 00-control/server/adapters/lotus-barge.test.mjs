import assert from "node:assert/strict";
import test from "node:test";
import { lotusBargeConfigContent } from "./lotus-barge.mjs";

const client = {
  meta: {
    hashtag: "#ArjunWedsTara",
    monogram: "A T",
  },
  couple: {
    bride: {
      first: "Tara",
      full: "Tara Sen",
      parents: "Daughter of Maya and Rohan Sen",
    },
    groom: {
      first: "Arjun",
      full: "Arjun Mehta",
      parents: "Son of Leela and Aman Mehta",
    },
  },
  copy: {
    intro: "A moonlit invitation",
    tagline: "An invitation carried by moonlight",
    invitationNote: "Follow the lotus barge to our celebration.",
    closing: "Meet us under the moon",
    verseHindi: "॥ शुभ विवाह ॥",
    verseText: "Our families invite you to witness our forever.",
  },
  timing: {
    primaryISO: "2027-02-20T17:30:00+05:30",
    dateLabel: "Saturday, 20 February 2027",
    timeLabel: "From 5:30 PM",
    dateParts: {
      day: "Saturday",
      number: "20",
      monthYear: "February 2027",
      time: "5:30 PM",
    },
  },
  venue: {
    name: "Moon Palace",
    address: "Lake Road, Udaipur",
    city: "Udaipur",
    mapQuery: "Moon Palace Udaipur",
    note: "Beside the lake",
  },
  events: [
    {
      name: "Wedding",
      note: "Moonlit vows by the lake.",
    },
    {
      name: "Reception",
      note: "Must not become a second event.",
    },
  ],
  sections: {
    events: true,
    venue: true,
    countdown: false,
  },
};

test("generates a config-only Lotus Barge customer template", () => {
  const content = lotusBargeConfigContent(client);

  assert.match(content, /bride: "Tara"/);
  assert.match(content, /groom: "Arjun"/);
  assert.match(content, /dateISO: "2027-02-20T17:30:00\+05:30"/);
  assert.match(content, /mapsQuery: "Moon Palace Udaipur"/);
  assert.match(content, /countdown: false/);
  assert.match(content, /couple: "\.\/assets\/lotus\/couple\.png"/);
  assert.match(content, /videoEnabled: false/);
  assert.equal((content.match(/name: "Wedding"/g) || []).length, 1);
  assert.doesNotMatch(content, /name: "Reception"/);
  assert.match(content, /@invitestory/);
});

test("enables the intro film after the media slot is uploaded", () => {
  const content = lotusBargeConfigContent({
    ...client,
    media: {
      "intro-video": "public/assets/lotus/intro-journey.mp4",
    },
  });

  assert.match(content, /videoEnabled: true/);
});
