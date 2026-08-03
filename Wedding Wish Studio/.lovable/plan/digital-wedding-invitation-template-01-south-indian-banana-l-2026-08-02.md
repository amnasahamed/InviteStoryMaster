# Digital Wedding Invitation — Template 01 (South Indian / Banana Leaf)

A mobile-first, single-page interactive wedding invitation, built as the first template in a reusable set you can duplicate per client and deploy free.

## What this first template is

Reference mood from your upload: deep maroon/terracotta background, banana leaf green, handmade off-white paper card, jasmine and brass, gopuram line art. Editorial serif + tall condensed display type, no purple-gradient SaaS look.

Vertical scroll story, designed at 390px width first:

1. **Opening reveal** — full-screen textured maroon, brass lamp glow, jasmine strands drifting in. Couple names in tall condensed display animate in letter by letter. Scroll cue.
2. **Invitation card** — the deckle-edged paper card, "Together with their families", lotus divider, date/time block, tilts subtly with scroll.
3. **Live countdown** — days / hours / minutes / seconds ticking to the muhurat, framed in a brass-ring motif.
4. **Our story timeline** — 3–4 milestones, alternating side reveals as you scroll.
5. **Events schedule** — cards per function (Mehendi, Reception, Muhurtham) with time, dress-code color dot, and an **Add to Calendar** button per event (.ics download + Google Calendar link).
6. **Venue** — embedded map preview (static styled map image that expands to an interactive map), address, "Open in Google Maps" and "Open in Apple Maps" buttons.
7. **Gallery** — swipeable photo strip with parallax and lightbox.
8. **RSVP** — name, guest count, function selection. First pass writes to a form endpoint / localStorage; wiring to real storage is a follow-up.
9. **Footer** — full-bleed background image with texture overlay, blessing line, couple monogram, subtle grain.

## Interaction and motion

- Smooth scroll (Lenis) with scroll-linked reveals, parallax on floral layers, and reduced-motion fallback.
- Aurora background component from react-bits (`npx shadcn@latest add @react-bits/Aurora-TS-TW`) tinted maroon/gold for the hero glow.
- Petal / jasmine drift particles, brass shimmer on dividers, tap-friendly hit targets, haptic-feel button press states.
- Sticky bottom bar on mobile: RSVP · Calendar · Directions.

## Visuals

Generated images (aesthetic, consistent palette): banana leaf + brass flatlay hero, handmade paper texture, jasmine garland cutouts, gopuram line illustration, footer background, placeholder couple portraits.

## Technical notes

- TanStack Start route at `/` renders the template; content lives in one typed `invite.config.ts` object (names, dates, venue lat/lng, events, gallery) so cloning per client means editing one file.
- Design tokens (maroon, leaf green, brass, paper cream, serif + condensed display fonts) go into `src/styles.css` as semantic tokens — every later template swaps the token block, not the components.
- Fonts loaded via `<link>` in `__root.tsx`.
- `.ics` generated client-side; map preview is a static image that upgrades to an iframe on tap (keeps first load fast on Indian mobile networks).
- Route `head()` gets wedding-specific title/description/OG so WhatsApp share previews look right.

## Scope of this step

Build template 01 end to end with placeholder couple data (Abbhi & Tarunika, Coimbatore, as in your reference). Multi-template gallery, admin/CMS, and real RSVP storage come after you approve the look of this one.
