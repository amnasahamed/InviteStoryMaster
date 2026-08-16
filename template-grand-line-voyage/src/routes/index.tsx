import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/wedding/Hero";
import Countdown from "@/components/wedding/Countdown";
import Couple from "@/components/wedding/Couple";
import EventDetails from "@/components/wedding/EventDetails";
import Footer from "@/components/wedding/Footer";
import CelebrationDock from "@/components/wedding/CelebrationDock";
import { wedding } from "@/lib/wedding-config";

const title = `${wedding.bride.name} & ${wedding.groom.name} — The Grand Line of Marriage`;
const description =
  "An Indian wedding adventure invitation: countdown, the couple, and the Log Pose to our wedding in Goa on 14 February 2027.";

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
          name: title,
          startDate: wedding.date,
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: wedding.venue.name,
            address: wedding.venue.address,
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Countdown />
      <Couple />
      <EventDetails />
      <Footer />
      <CelebrationDock />
    </main>
  );
}

