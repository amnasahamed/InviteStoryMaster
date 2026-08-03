# One Piece × Indian Wedding Invitation (Single Page, Mobile-First)

A premium, single-page digital wedding invitation themed as "An Indian Wedding Adventure: The Grand Line of Marriage" — Grand Line adventure energy fused with Indian wedding tradition, built for phone screens and WhatsApp sharing.

## Design system

- Palette (Grand Line, not just maroon/gold): tropical ocean blue, deep sunset red, treasure gold, aged-map parchment brown, palm green accents. All as semantic tokens in `src/styles.css`.
- Typography: heavy display block font for names/titles (One Piece logo energy), a warm serif for Indian-flavoured accents, clean sans for details — loaded via `<link>` in the root route head.
- Motion everywhere: staggered entrance reveals on scroll, floating/parallax art, coin and sparkle loops, pressable touch states. Restrained enough to stay smooth on mid-range phones.
- Aurora background: custom animated "Grand Line energy" layer (swirling gradient bands + drifting spark particles), used in the Hero and Footer. Since the react-bits Aurora is not in the project, it will be built as `src/components/Aurora.tsx` with the same usage shape so it can be swapped later.

## Sections (top to bottom)

1. **Hero** — 100vh. Aurora energy backdrop, couple on a grand Indian-themed pirate ship, animated stamp-style title "AN INDIAN WEDDING ADVENTURE: THE GRAND LINE OF MARRIAGE!", names, date, scroll cue.
2. **Countdown** — "COUNTDOWN TO THE GRAND LINE OF MARRIAGE!" Four interlocked treasure-chest tiles (Days/Hours/Minutes/Seconds) with rolling number transitions and floating gold coins.
3. **The Couple** — Overlapping manga-panel cards (swipeable on mobile) with bounty-poster framing, bride and groom art in colourful Indian attire on scenic island/temple-ship backdrops, plus short intros.
4. **Event Details** — "LOG POSE TO OUR WEDDING." Date, time, venue on parchment map-scroll cards. Animated Log Pose icon on an "Add to Calendar" button (generates an .ics download). Grand Line map preview with a dotted route and destination marker, plus a "Get Directions" ship button opening Google Maps.
5. **Footer** — Ship's-deck / treasure-horde texture with woven Indian pattern, Aurora glow, closing message "WITH US, YOU'LL CONQUER THE GRAND LINE OF OUR LIVES!" and watermark "MADE WITH LOVE BY THE WEDDING GRAND FLEET".

## Imagery

Generated as anime-style illustrations into `/public` with root-relative paths, roughly:

- `/op-hero-ship.png` — couple on an Indian-themed pirate ship, sunset Grand Line seas (wide hero art)
- `/op-bride.png`, `/op-groom.png` — character portraits in Indian wedding attire
- `/op-couple-panel.png` — romantic panel of the two together on a floating temple ship
- `/op-map.png` — aged Grand Line style map with Indian motifs (map preview)
- `/op-treasure-chest.png`, `/op-coin.png` — countdown props
- `/op-log-pose.png` — Log Pose device
- `/op-deck-texture.png` — footer ship-deck + Indian pattern texture

## Technical notes

- Install `motion` (Motion for React, the current Framer Motion package) for all animation; Shadcn UI already present for buttons/cards/carousel.
- Everything lands on `/` by rewriting `src/routes/index.tsx`, with sections as focused components under `src/components/wedding/`.
- Couple names, date, venue and maps link live in one `src/lib/wedding-config.ts` so the template is resellable/re-skinnable per client.
- Mobile-first: `max-w-md`-ish content column centered, large tap targets, readable type, `prefers-reduced-motion` respected, images sized and lazy-loaded below the fold.
- SEO/share: route-level `head()` with a wedding-specific title, description, og/twitter tags and the hero art as the share image.

## Placeholder content

Bride "Aanya D. Nakama" and groom "Vikram 'Straw Hat' Rao", venue in Goa, wedding date about six months out — all editable in one config file. Confirm or replace after the build if you have real details.
