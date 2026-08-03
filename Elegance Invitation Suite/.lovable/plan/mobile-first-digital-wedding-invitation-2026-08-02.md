# Mobile-First Digital Wedding Invitation

A single-page, scroll-driven wedding invitation inspired by the uploaded illustration — soft sky blues, meadow greens, and floral pink accents — built for mobile sharing on WhatsApp and Meta Ads traffic.

## Design direction

- Palette: sky `#e8f4fb`, azure `#7cc4e8`, meadow green `#8fc76a`, floral pink `#f2a2b4`, with a warm ivory base and a muted gold accent for premium detailing.
- Typography: an elegant display serif for names and section headings, paired with a clean humanist sans for body text — loaded via a `<link>` in the root route head.
- Feel: airy, romantic, illustrated-storybook elegance. Rounded soft-edged cards, generous whitespace, subtle floral/leaf SVG dividers between sections.
- The uploaded illustration is reference only — not embedded. Placeholder imagery comes from Unsplash.

## Page sections (top to bottom)

1. **Hero** — full 100vh. Aurora animated background in sky/green/pink tones with a semi-transparent wash over it. Centered text placement echoing the illustration: small "Save the Date" eyebrow, large couple names with an ampersand flourish, date line, and a soft scroll cue at the bottom.
2. **The Couple** — two soft-edged portrait cards (bride, groom) stacked on mobile, side-by-side on wider screens, each with name, short line, and a delicate frame treatment.
3. **Countdown** — live Days / Hours / Minutes / Seconds tiles with smooth number transitions on each tick.
4. **Photo Gallery** — a scrollable/staggered grid of pre-wedding placeholder photos with rounded corners and gentle hover/scroll reveals.
5. **Event Details** — date, time, venue name and address. An "Add to Calendar" button that downloads an `.ics` file, plus a map preview card with a stylized map placeholder image and a "Get Directions" button opening Google Maps.
6. **Footer** — Aurora glow behind a subtle mandala/floral motif texture, a heartfelt closing message, and a small "Made with love" watermark.

All content uses clear placeholder names, dates, and venue text that are easy to swap later.

## Animation

- Framer Motion `whileInView` fade-in plus `y: 20 → 0` on every section block, with staggered children for cards and gallery items, triggered once per element.
- Aurora provides continuous ambient motion in the hero and footer.
- Countdown digits animate on change rather than snapping.
- Respects reduced-motion preferences.

## Technical notes

- Built on the existing TanStack Start + React + Tailwind v4 + shadcn stack. The invitation replaces `src/routes/index.tsx` (the current placeholder) so it loads at `/`.
- Install `framer-motion`; add the Aurora component from `@react-bits/Aurora-TS-TW` (fallback: a hand-rolled animated gradient/canvas aurora in the same visual language if the registry component is unavailable).
- Palette tokens added to `src/styles.css` as oklch semantic variables in `@theme inline` — no hardcoded color utilities in components.
- Placeholder images placed in `/public` (hero-adjacent art, bride, groom, gallery shots, map preview) and referenced with root-relative `/` paths.
- Sections split into focused components under `src/components/invitation/`, composed by the index route.
- Content constants (names, date ISO string, venue, map link) live in one file for easy editing.
- Layout wrapped in a max-width container (`max-w-md`-ish on mobile, widening gracefully) so it looks intentional on phones and desktops.
- Route `head()` gets wedding-specific title, description, and og/twitter tags for good WhatsApp link previews.
