import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Hero } from "@/components/wedding/Hero";
import { Countdown } from "@/components/wedding/Countdown";
import { Story } from "@/components/wedding/Story";
import { Details } from "@/components/wedding/Details";
import { Venue } from "@/components/wedding/Venue";
import { Gallery } from "@/components/wedding/Gallery";
import { Blessing } from "@/components/wedding/Blessing";
import { SiteFooter } from "@/components/wedding/SiteFooter";
import { Petals } from "@/components/wedding/Petals";
import { ScrollProgress } from "@/components/wedding/ScrollProgress";
import { OpenGate } from "@/components/wedding/OpenGate";
import { invitation } from "@/config/invitation";

const { couple, event, venue } = invitation;
const title = `${couple.brideShort} & ${couple.groomShort} — Wedding Invitation`;
const description = `${couple.bride} and ${couple.groom} invite you to their wedding on ${event.dateLabel} at ${venue.name}, ${venue.address}.`;

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
          name: event.title,
          startDate: event.startsAt,
          endDate: event.endsAt,
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: venue.name,
            address: venue.address,
          },
        }),
      },
    ],
  }),
  component: InvitationPage,
});

function InvitationPage() {
  return (
    <OpenGate>
    <main className="relative bg-parchment">
      <ScrollProgress />
      <Petals />
      <Hero />
      <Countdown />
      <Story />
      <Details />
      <Venue />
      <Gallery />
      <Blessing />
      <SiteFooter />
      <Toaster position="top-center" />
    </main>
    </OpenGate>
  );
}
