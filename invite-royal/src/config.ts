// ─────────────────────────────────────────────────────────────
//  WEDDING CONFIG — edit this one file per customer
// ─────────────────────────────────────────────────────────────

export const wedding = {
  bride: "Ananya",
  groom: "Arjun",
  brideFull: "Ananya Sharma",
  groomFull: "Arjun Mehta",
  brideParents: "Daughter of Smt. Kavita & Shri Rajesh Sharma",
  groomParents: "Son of Smt. Meera & Shri Vikram Mehta",
  hashtag: "#AnanyaWedsArjun",
  monogram: "A · A",

  // Wedding muhurat (countdown + calendar target)
  dateISO: "2026-12-06T16:30:00+05:30",
  dateLabel: "Sunday, 6th December 2026",
  timeLabel: "Muhurat at 4:30 PM",

  venue: {
    name: "The Royal Orchid Palace",
    address: "Lake Pichola Road, Udaipur, Rajasthan 313001",
    mapsQuery: "City Palace Udaipur Rajasthan",
  },

  verse: {
    hindi: "॥ श्री गणेशाय नमः ॥",
    text: "Together with their families, request the honour of your presence as two souls become one.",
  },

  events: [
    {
      name: "Mehndi",
      icon: "flower",
      date: "Friday, 4th December",
      time: "11:00 AM onwards",
      venue: "Sharma Residence, Udaipur",
      note: "An afternoon of henna, music & marigolds",
    },
    {
      name: "Sangeet",
      icon: "music",
      date: "Saturday, 5th December",
      time: "7:00 PM onwards",
      venue: "Orchid Ballroom",
      note: "An evening of dance, dhol & celebration",
    },
    {
      name: "Wedding",
      icon: "heart",
      date: "Sunday, 6th December",
      time: "4:30 PM Muhurat",
      venue: "The Royal Orchid Palace",
      note: "Baraat, pheras & the sacred vows",
    },
    {
      name: "Reception",
      icon: "sparkles",
      date: "Monday, 7th December",
      time: "7:30 PM onwards",
      venue: "Palace Gardens",
      note: "Dinner & blessings under the stars",
    },
  ],

  rsvp: {
    whatsapp: "919876543210", // customer phone — RSVP lands on their WhatsApp
    whatsappText: "Namaste! We'd love to attend Ananya & Arjun's wedding. Confirming our presence 🎉",
    phone: "+91 98765 43210",
    deadline: "Kindly respond by 20th November 2026",
  },
};

// Google Calendar deep link
export const googleCalendarUrl = () => {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${wedding.bride} weds ${wedding.groom}`,
    dates: "20261206T110000Z/20261206T183000Z",
    details: `${wedding.venue.name} — ${wedding.venue.address}. ${wedding.hashtag}`,
    location: `${wedding.venue.name}, ${wedding.venue.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

// Downloadable .ics file (works with Apple / Outlook / any calendar)
export const downloadICS = () => {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//InviteRoyal//Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@inviteroyal`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:.]/g, "").slice(0, 15)}Z`,
    "DTSTART:20261206T110000Z",
    "DTEND:20261206T183000Z",
    `SUMMARY:${wedding.bride} weds ${wedding.groom}`,
    `DESCRIPTION:${wedding.venue.name} — ${wedding.venue.address}`,
    `LOCATION:${wedding.venue.name}\\, ${wedding.venue.address}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${wedding.bride}-${wedding.groom}-wedding.ics`;
  a.click();
  URL.revokeObjectURL(url);
};

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  wedding.venue.mapsQuery
)}&output=embed`;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  wedding.venue.mapsQuery
)}`;

export const whatsappUrl = `https://wa.me/${wedding.rsvp.whatsapp}?text=${encodeURIComponent(
  wedding.rsvp.whatsappText
)}`;
