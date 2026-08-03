import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DoorGate } from "@/components/invite/DoorGate";
import { MusicToggle } from "@/components/invite/MusicToggle";
import { SmoothScroll } from "@/components/invite/SmoothScroll";

import { Petals } from "@/components/invite/Petals";
import { Hero } from "@/components/invite/Hero";
import { Countdown } from "@/components/invite/Countdown";
import { InviteText } from "@/components/invite/InviteText";
import { Story } from "@/components/invite/Story";
import { Events } from "@/components/invite/Events";
import { Venue } from "@/components/invite/Venue";
import { Gallery } from "@/components/invite/Gallery";
import { FooterBlessing } from "@/components/invite/FooterBlessing";
import { invitation } from "@/config/invitation";

const title = `${invitation.couple.groom} & ${invitation.couple.bride} — Wedding Invitation`;
const description = `Join us on ${invitation.mainEvent.dateLabel} at ${invitation.venue.name}, Hyderabad. Schedule, venue map and countdown inside.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: invitation.mainEvent.title,
          startDate: invitation.mainEvent.startsAt,
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: invitation.venue.name,
            address: invitation.venue.address,
          },
        }),
      },
    ],
  }),
  component: InvitationPage,
});

function InvitationPage() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="paper-bg text-ink relative min-h-screen overflow-x-hidden">
      <SmoothScroll enabled={opened} />
      <Petals />
      <DoorGate onOpen={() => setOpened(true)} />
      <MusicToggle started={opened} />
      <main className="relative z-10">
        <Hero />
        <Countdown />
        <InviteText />
        <Story />
        <Events />
        <Venue />
        <Gallery />
      </main>
      <FooterBlessing />
    </div>
  );
}

