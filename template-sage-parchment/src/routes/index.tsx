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

const { couple, event, venue, meta } = invitation;
const title = meta?.title ?? `${couple.brideShort} & ${couple.groomShort} — Engagement Invitation`;
const description =
  meta?.description ??
  `${couple.bride} and ${couple.groom} invite you to celebrate their engagement on ${event.dateLabel} at ${venue.name}, ${venue.address}.`;
const ogUrl = meta?.url ?? "/";
const ogImage = meta?.image ?? "/og-image.jpg";
const siteName = meta?.siteName ?? `${couple.brideShort} & ${couple.groomShort} Engagement`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: ogUrl },
      { property: "og:image", content: ogImage },
      { property: "og:image:alt", content: title },
      { property: "og:site_name", content: siteName },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: ogUrl }],
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
