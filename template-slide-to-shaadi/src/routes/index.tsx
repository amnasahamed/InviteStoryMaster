import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import {
  Video,
  MessageSquare,
  Bell,
  UserPlus,
  Calendar,
  MapPin,
  Heart,
  Clock,
} from "lucide-react";
import { SlideToAnswer } from "@/components/SlideToAnswer";
import { Petals } from "@/components/Petals";
const wallpaper = "https://media.invitestory.in/slide-to-shaadi/src/assets/wedding-lockscreen.jpg";
const couple = "https://media.invitestory.in/slide-to-shaadi/src/assets/couple-avatar.jpg";
const ornament = "https://media.invitestory.in/slide-to-shaadi/src/assets/ornament-divider.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aarav & Meera — Slide to Answer Wedding Invite" },
      {
        name: "description",
        content:
          "An incoming call you'll want to take. Slide to answer and unwrap Aarav & Meera's wedding invitation — 12 December 2026, Udaipur.",
      },
      { property: "og:title", content: "Aarav & Meera — Slide to Answer Wedding Invite" },
      {
        property: "og:description",
        content: "Slide to answer and unwrap a cinematic wedding invitation from Aarav & Meera.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function useClock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: false }),
      );
      setDate(
        now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }),
      );
    };
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);
  return { time, date };
}

function Index() {
  const [answered, setAnswered] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const { time, date } = useClock();

  const handleAnswer = useCallback(() => {
    setAnswered(true);
    // Smooth transition delay
    setTimeout(() => setShowInvite(true), 400);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Background image with Ken Burns effect */}
      <img
        src={wallpaper}
        alt="Stunning Indian wedding venue with mandap at lakeside during golden hour"
        width={1024}
        height={1536}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ animation: "slow-pan 30s ease-in-out infinite alternate" }}
      />

      {/* Multi-layer gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/30 to-background/95" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, oklch(0.84 0.12 85 / 5%) 0%, transparent 60%)",
        }}
      />

      {/* Animated particles */}
      <Petals />

      {/* Main content container */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-6 pb-8">
        {/* Status bar */}
        <div className="flex items-center justify-between pt-5 text-[12px] font-semibold tracking-wide text-foreground/70">
          <span className="tabular-nums">{time || "—:—"}</span>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-1 w-1 rounded-full bg-ios-green animate-pulse" />
            <span className="text-foreground/50">forever · 100%</span>
          </div>
        </div>

        {/* Lock screen date */}
        {!answered && (
          <div className="mt-2 text-center animate-soft-rise">
            <p className="text-[13px] tracking-[0.15em] text-foreground/40 font-light">{date}</p>
          </div>
        )}

        {showInvite ? (
          <Invitation />
        ) : (
          <CallScreen onAnswer={handleAnswer} answered={answered} />
        )}
      </div>
    </main>
  );
}

function CallScreen({ onAnswer, answered }: { onAnswer: () => void; answered: boolean }) {
  return (
    <section
      className="flex flex-1 flex-col items-center"
      style={{
        opacity: answered ? 0 : 1,
        transform: answered ? "scale(0.95) translateY(-20px)" : "none",
        filter: answered ? "blur(8px)" : "none",
        transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Avatar section */}
      <div className="mt-12 flex flex-col items-center text-center animate-soft-rise">
        <div className="relative">
          {/* Outer decorative ring */}
          <span
            className="absolute -inset-5 rounded-full border border-gold/20"
            style={{ animation: "ring-pulse-outer 3s ease-out infinite" }}
          />
          {/* Inner pulse ring */}
          <span
            className="absolute -inset-3 rounded-full border border-gold/40"
            style={{ animation: "ring-pulse 2.4s ease-out infinite" }}
          />
          {/* Gold glow behind avatar */}
          <div
            className="absolute -inset-4 rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(0.84 0.12 85 / 15%) 0%, transparent 70%)",
              animation: "gentle-pulse 3s ease-in-out infinite",
            }}
          />
          <img
            src={couple}
            alt="Aarav and Meera in traditional Indian wedding attire"
            width={816}
            height={816}
            loading="lazy"
            className="relative h-32 w-32 rounded-full object-cover"
            style={{
              border: "3px solid oklch(0.84 0.12 85 / 50%)",
              boxShadow: "0 8px 32px -8px oklch(0.84 0.12 85 / 30%), 0 0 0 1px oklch(1 0 0 / 10%)",
            }}
          />
        </div>

        <p className="mt-7 text-[11px] tracking-[0.5em] text-foreground/50 uppercase font-light">
          incoming · shubh vivah
        </p>

        <h1 className="mt-3 font-display text-[3.6rem] leading-[1] text-shimmer font-light">
          Aarav &amp; Meera
        </h1>

        <p className="mt-2 text-[13px] text-foreground/60 font-light tracking-wide">
          calling you to their wedding…
        </p>

        {/* Decorative divider */}
        <div className="mt-5 w-48 gold-divider" />
      </div>

      {/* Action buttons */}
      <div
        className="mt-10 grid w-full max-w-[300px] grid-cols-4 gap-3 text-center text-[10px] text-foreground/60 animate-soft-rise"
        style={{ animationDelay: "200ms" }}
      >
        {[
          { icon: Bell, label: "Remind" },
          { icon: MessageSquare, label: "Message" },
          { icon: Video, label: "Live" },
          { icon: UserPlus, label: "RSVP" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2 group cursor-pointer">
            <span
              className="flex h-13 w-13 items-center justify-center rounded-full glass-panel transition-all duration-300 group-hover:scale-110"
              style={{
                boxShadow: "0 4px 16px -4px oklch(0 0 0 / 30%), inset 0 1px 0 oklch(1 0 0 / 8%)",
              }}
            >
              <Icon className="h-5 w-5 text-foreground/75 transition-colors group-hover:text-gold" strokeWidth={1.5} />
            </span>
            <span className="tracking-[0.1em] uppercase transition-colors group-hover:text-foreground/80">{label}</span>
          </div>
        ))}
      </div>

      {/* Slide to answer */}
      <div
        className="mt-auto flex w-full flex-col items-center gap-5 pt-12 animate-soft-rise"
        style={{ animationDelay: "400ms" }}
      >
        <SlideToAnswer onAnswer={onAnswer} />

        {/* Home indicator */}
        <span className="h-[5px] w-36 rounded-full bg-foreground/25" />
      </div>
    </section>
  );
}

function Invitation() {
  const [callTime, setCallTime] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCallTime((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const mins = String(Math.floor(callTime / 60)).padStart(2, "0");
  const secs = String(callTime % 60).padStart(2, "0");

  return (
    <section className="flex flex-1 flex-col items-center pt-6 text-center">
      {/* Connected status */}
      <div className="animate-slide-in-up flex items-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full bg-ios-green animate-pulse" />
        <p className="text-[11px] tracking-[0.42em] text-foreground/50 uppercase tabular-nums">
          connected · {mins}:{secs}
        </p>
      </div>

      {/* Ornamental divider image */}
      <div
        className="mt-5 animate-slide-in-up"
        style={{ animationDelay: "80ms" }}
      >
        <img
          src={ornament}
          alt=""
          className="mx-auto h-12 w-48 object-contain opacity-50"
          style={{ filter: "brightness(1.2) contrast(1.1)" }}
        />
      </div>

      {/* Main invitation content */}
      <div className="animate-slide-in-up" style={{ animationDelay: "120ms" }}>
        <p className="mt-3 font-display text-[15px] text-foreground/60 italic tracking-wide">
          Together with their families
        </p>

        <h1 className="mt-3 font-display leading-[0.92]">
          <span className="block text-[4.2rem] text-shimmer-slow font-light">Aarav</span>
          <span className="my-1 flex items-center justify-center gap-3">
            <span className="w-12 gold-divider" />
            <span className="text-[1.4rem] tracking-[0.4em] text-gold/70 font-display">&amp;</span>
            <span className="w-12 gold-divider" />
          </span>
          <span className="block text-[4.2rem] text-shimmer-slow font-light">Meera</span>
        </h1>

        <p className="mt-4 text-[13px] leading-relaxed text-foreground/60 font-light max-w-[280px] mx-auto">
          request the pleasure of your company
          <br />
          as they begin forever.
        </p>
      </div>

      {/* Event details cards */}
      <div
        className="mt-7 w-full space-y-3 animate-slide-in-up"
        style={{ animationDelay: "280ms" }}
      >
        {[
          {
            icon: Calendar,
            top: "Saturday, 12 December 2026",
            sub: "Baraat 5:00 PM · Pheras 8:30 PM",
            highlight: true,
          },
          {
            icon: MapPin,
            top: "Jag Mandir, Lake Pichola",
            sub: "Udaipur, Rajasthan",
          },
          {
            icon: Clock,
            top: "Sangeet & Mehndi",
            sub: "Thursday, 10 Dec · 6:00 PM onwards",
          },
        ].map(({ icon: Icon, top, sub, highlight }, idx) => (
          <div
            key={top}
            className="group flex items-center gap-4 rounded-2xl glass-card px-5 py-4 text-left transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            style={{
              animationDelay: `${280 + idx * 100}ms`,
              border: highlight
                ? "1px solid oklch(0.84 0.12 85 / 20%)"
                : "1px solid oklch(0.84 0.12 85 / 10%)",
            }}
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{
                background: "linear-gradient(135deg, oklch(0.84 0.12 85 / 15%), oklch(0.68 0.13 70 / 10%))",
                border: "1px solid oklch(0.84 0.12 85 / 15%)",
              }}
            >
              <Icon className="h-[18px] w-[18px] text-gold" strokeWidth={1.6} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-foreground/90 truncate">{top}</p>
              <p className="text-[11px] text-foreground/50 mt-0.5">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Accept button */}
      <div
        className="mt-auto w-full pt-8 animate-slide-in-up"
        style={{ animationDelay: "500ms" }}
      >
        <button
          className="group flex w-full items-center justify-center gap-2.5 rounded-2xl px-6 py-4.5 text-[13px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: "linear-gradient(135deg, oklch(0.68 0.13 70), oklch(0.84 0.12 85), oklch(0.68 0.13 70))",
            backgroundSize: "200% 100%",
            color: "oklch(0.15 0.04 40)",
            boxShadow: "0 8px 32px -8px oklch(0.84 0.12 85 / 40%), inset 0 1px 0 oklch(1 0 0 / 20%)",
            animation: "shimmer-sweep 4s ease-in-out infinite",
          }}
        >
          <Heart className="h-4 w-4 animate-heartbeat" strokeWidth={2} />
          Accept with Love
        </button>

        {/* Hashtag */}
        <div className="mt-5 flex flex-col items-center gap-2">
          <div className="w-24 gold-divider" />
          <p className="text-[10px] tracking-[0.35em] text-foreground/35 uppercase font-light">
            #AaravFoundHisMeera
          </p>
          <a
            href="https://www.instagram.com/invitestory.in/"
            target="_blank"
            rel="noreferrer"
            className="mt-3 text-[8px] tracking-[0.3em] text-foreground/25 uppercase font-light transition-colors hover:text-gold/60"
          >
            Follow @invitestory.in on Instagram
          </a>
        </div>

        {/* Home indicator */}
        <div className="mt-4 flex justify-center">
          <span className="h-[5px] w-36 rounded-full bg-foreground/25" />
        </div>
      </div>
    </section>
  );
}
