import { createFileRoute } from "@tanstack/react-router";
import Hero from "@/components/wedding/Hero";
import Couple from "@/components/wedding/Couple";
import Countdown from "@/components/wedding/Countdown";
import EventDetails from "@/components/wedding/EventDetails";
import Footer from "@/components/wedding/Footer";

const title = "Aaliya & Ibrahim — Nikkah Invitation, 19 Feb 2027";
const description =
  "Join Aaliya Zohra and Ibrahim Yusuf for their Nikkah ceremony on 19 February 2027 at Noor-e-Zahra Grand Masjid, Hyderabad.";

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
    <main className="relative mx-auto w-full max-w-lg overflow-hidden bg-background">
      <Hero />
      <Couple />
      <Countdown />
      <EventDetails />
      <Footer />
    </main>
  );
}
