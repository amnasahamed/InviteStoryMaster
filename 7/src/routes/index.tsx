import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/wedding/Hero";
import { Couple } from "@/components/wedding/Couple";
import { Countdown } from "@/components/wedding/Countdown";
import { EventDetails } from "@/components/wedding/EventDetails";
import { Footer } from "@/components/wedding/Footer";
import { wedding } from "@/components/wedding/data";

const title = `${wedding.bride.name} & ${wedding.groom.name} · Wedding Reception`;
const description = `Join us on ${wedding.day} ${wedding.dateLabel} at ${wedding.venue}, ${wedding.venueArea} to celebrate the reception of ${wedding.bride.name} and ${wedding.groom.name}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-ivory antialiased">
      <Hero />
      <Couple />
      <Countdown />
      <EventDetails />
      <Footer />
    </main>
  );
}
