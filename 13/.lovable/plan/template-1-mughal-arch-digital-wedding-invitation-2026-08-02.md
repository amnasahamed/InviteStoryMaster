# Template 1 — "Mughal Arch" Digital Wedding Invitation

A mobile-first, single-page wedding invitation site in North Indian / Mughal style, built as the first reusable template for your invitation business. Every couple's details live in one config file, so cloning this for a new client means editing one file and deploying.

## Look and feel

- Palette: aged ivory paper (#FDF6EC), blush (#F3D9C6), antique gold (#C9A84C), deep maroon (#7B1E2B), and a muted green for accents — taken from your reference card.
- Type: an elegant display serif for names and headings, a clean readable sans for details. Devanagari/Urdu-friendly fallback.
- Texture: subtle paper grain and soft gold-foil sheen layered behind sections, plus a fixed floral/lantern footer image with text over it.
- Everything designed at phone width first (360–430px), then gracefully widened for desktop.

## Sections (in order)

1. **Opening curtain** — the arched Mughal frame draws itself in gold, florals bloom around it, then couple names fade up. Hanging lanterns sway gently.
2. **Save the date + live countdown** — days / hours / minutes / seconds ticking to the muhurat, with an "Add to Calendar" button (Google Calendar + .ics download for Apple/Outlook).
3. **Invitation text** — parents' names and the formal "request the pleasure of your presence" block, styled like the reference card.
4. **Our story** — a vertical timeline (first met → roka → engagement → wedding) with illustrated moments that slide in as you scroll.
5. **Events / schedule** — cards for Mehndi, Haldi, Sangeet, Nikah/Phere, Reception: date, time, dress-code colour dot, venue name.
6. **Venue & map** — an embedded map preview with the venue pinned, plus "Open in Google Maps" and "Get directions" buttons.
7. **Gallery** — a swipeable photo strip / soft masonry with lightbox.
8. **Footer** — full-bleed floral texture image with a closing blessing line and the couple's monogram over it.

No RSVP, as you asked.

## Motion and interaction

- Smooth inertial scrolling (Lenis) with scroll-triggered reveals for every section.
- Aurora background from React Bits behind the hero for the shimmering gold glow.
- Falling rose-petal / marigold particle layer, very light so phones stay smooth.
- Parallax on the floral corners and the footer image.
- Micro-interactions: gold-shimmer buttons, tap ripple, lantern sway, countdown digit flip.
- Respects `prefers-reduced-motion` and disables heavy particles on low-end devices.

## Images

All artwork generated (no stock, no photos of real people): transparent-background PNGs for floral corner sprays, hanging lanterns, the arch frame, a marigold garland divider, an illustrated couple in Mughal-style attire matching your reference, plus paper/texture backgrounds and placeholder gallery illustrations.

## Technical notes

- Route: `/` in `src/routes/index.tsx` (replaces the placeholder). Section components under `src/components/invite/`.
- All couple data (names, parents, dates, events, venue lat/lng, gallery) in `src/config/invitation.ts` — the single file you edit per client.
- Palette, fonts, textures and radii added as design tokens in `src/styles.css`; no hardcoded colours in components.
- Countdown and calendar links computed client-side from the config date; `.ics` generated in-browser, so the site stays fully static and deploys to Netlify/Vercel free tier with no backend.
- Map: static embed by default (no key needed). If you want a live interactive map with custom pin styling later, that needs the Google Maps connector — say the word and I'll wire it.
- Animations: Motion for React + GSAP ScrollTrigger, Lenis for smooth scroll, plus `@react-bits/Aurora-TS-TW` as you suggested.
- SEO/meta: title, description, og:image on the route so the WhatsApp share preview looks good — important since Indian guests will mostly get this as a WhatsApp link.
- Performance budget: images as WebP, lazy-loaded below the fold, target sub-2s load on 4G.

## After this template

Once you approve template 1, we iterate one template at a time (South Indian temple, Royal Rajasthani, Modern minimal) reusing the same config shape so all of them are drop-in swappable for a client.
