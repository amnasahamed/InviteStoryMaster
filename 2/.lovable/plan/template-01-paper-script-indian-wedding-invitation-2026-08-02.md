# Template 01 — "Paper & Script" Indian Wedding Invitation

A mobile-first, single-page digital invitation you can duplicate per client and deploy free. This first template follows the reference mood: off-white textured paper, handwritten script names, illustrated couple, soft olive accents.

## What gets built (v1 scope)

One route at `/` containing, in scroll order:

1. **Hero (full viewport)** — "SAVE THE DATE" eyebrow in tracked caps, big date `14.02.26`, illustrated couple artwork, names in flowing script. Paper-grain texture behind everything, subtle floating petal/particle motion, and a scroll cue.
2. **Invitation note** — short "Together with their families…" verse, olive small-caps typography, fades in on scroll.
3. **Countdown** — live days / hours / minutes / seconds to the wedding moment, digits flipping smoothly, framed like a stamped paper card.
4. **Venue + map preview** — venue name/address, a static styled map thumbnail that opens Google Maps directions on tap, plus a "Get directions" pill.
5. **Add to calendar** — one tap generates a `.ics` file (works with iOS/Android/Outlook) and a Google Calendar link.
6. **Footer** — full-bleed background image with a warm overlay, script "See you there" and couple names over it, subtle grain.

No RSVP or contact form, as requested. All names, dates, venue are placeholder values kept in a single config object so cloning for a client is a one-file edit.

## Design & motion

- Palette: warm off-white paper `#F7F5F0`, ink black, soft olive `#7A7F52`, muted gold, sepia.
- Type: elegant script for names/date, wide-tracked geometric caps for labels, quiet serif for body.
- Paper texture + grain overlay applied globally; sections separated by hand-drawn-feel dividers rather than hard lines.
- Motion: smooth scroll (Lenis-style easing), scroll-triggered reveals with staggered letter animation on the names, parallax on the hero illustration, gentle floating marigold petals, pressable button states with haptic-feeling scale. Restrained — never bouncy.
- Built mobile-first (portrait phone is the primary canvas), scales gracefully to desktop with a centered card column.

## Images

Generated with the image tool and stored as project assets:
- Illustrated couple in Indian-modern attire holding photo frames (reference-inspired, not copied).
- Paper/handmade texture tile.
- Footer background: soft-focus marigold and fairy-light scene, sepia-warm.

## Technical notes

- Routes: rewrite `src/routes/index.tsx` as the invitation page; sections split into components under `src/components/invite/`.
- Config: `src/config/invite.ts` holds names, dates, venue, map coords, calendar details — the single file to edit per client.
- Tokens: add paper/ink/olive/gold colors, script + caps font families, and grain/shadow tokens to `src/styles.css` via `@theme inline`; fonts loaded with `<link>` in `__root.tsx`.
- Animation: `motion` (Motion for React) for reveals and parallax, `lenis` for smooth scroll. Aurora from react-bits is a WebGL-ish gradient effect that fights the paper aesthetic, so it is skipped for this template — it can headline a different, darker template later.
- Calendar: `.ics` generated client-side (no backend), plus Google Calendar deep link.
- Map: static map image + `maps.google.com` deep link — no API key, keeps the free-host deploy trivial.
- SEO: unique title/description/og tags on the route, single H1 with the couple's names.
- Fully static, no backend — deploys as-is to Netlify/Vercel free tier.

## After this template

Once template 01 looks right, we iterate to template 02 (a different style — e.g. royal maroon-and-gold, or floral haldi bright) reusing the same section architecture and config shape, so every template is swap-in compatible.
