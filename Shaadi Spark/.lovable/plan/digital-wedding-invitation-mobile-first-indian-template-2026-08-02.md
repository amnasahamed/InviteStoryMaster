# Digital Wedding Invitation — Mobile-First Indian Template

A single-page, scroll-driven wedding invitation webpage (no RSVP, one event: the wedding). Built mobile-first for Indian couples, visually rich, animated, and designed so you can duplicate it per client, swap one config file, and deploy free on Netlify/Vercel.

## Visual direction

Inspired by the attached Mughal/Pichwai card: sage-teal base, cream parchment panels, antique gold foil linework, dusty pink lotus and green foliage, scalloped arch (mehrab) frames.

- Palette: sage teal `#8FA8A0`, deep pine `#3E5A50`, parchment cream `#F5EFE2`, antique gold `#C6A254`, lotus pink `#D98A9A`, ink brown `#4A3B2A`
- Type: Cormorant Garamond (display headings, wide letterspacing) + Karla (body). Names set in tracked small-caps like the card.
- Texture: subtle paper grain overlay + repeating gold jaali motif behind sections; footer band with full-width floral illustration behind translucent text.

## Page sections (scroll order)

1. **Hero** — full-viewport arch frame, gold ornament, couple names, date, soft Aurora-style animated gradient behind parchment, floating lotus petals drifting down, scroll-cue.
2. **Countdown** — live days/hours/minutes/seconds in gold-bordered tiles, flip/fade tick animation.
3. **Our Story** — alternating illustrated timeline (first meet → roka → wedding), reveals on scroll.
4. **Event details** — mehrab card: date, time, venue, dress code. Two actions: **Add to Calendar** (.ics download + Google Calendar link) and **Get Directions**.
5. **Venue & map** — static styled map preview image with pin, tap to open Google Maps; address block.
6. **Gallery** — swipeable/parallax photo strip with lightbox.
7. **Blessings/quote** — Sanskrit shloka or couplet on parchment with gold divider.
8. **Footer** — full-bleed floral illustration behind translucent "With love, families of…" text plus contact numbers.

## Interaction & motion

- Smooth scroll with easing, section reveal on intersection, parallax on hero + gallery.
- Aurora animated background via `npx shadcn@latest add @react-bits/Aurora-TS-TW` (tinted to the sage/gold palette, sits behind the hero).
- Micro-interactions: gold shimmer on buttons, petal cursor trail on desktop, haptic-feel tap scaling on mobile.
- Optional ambient shehnai/sitar track with a small mute toggle.
- All motion respects `prefers-reduced-motion`.

## Template reusability

One `src/config/invitation.ts` holds names, dates, venue, coordinates, gallery images, story items, colors. Everything else reads from it — for a new client you edit that file, regenerate/replace images, and deploy. Static build, no backend, no RSVP.

## Technical notes

- TanStack Start; the invitation is the index route `/` with SEO head tags and og:image.
- Design tokens added to `src/styles.css` (`@theme inline`) — no hardcoded colors in components.
- Fonts loaded via `<link>` in `__root.tsx`.
- Motion library `motion` (Framer Motion) added for scroll/reveal animations; Aurora component pulled in via the react-bits shadcn registry.
- Countdown, calendar (.ics), and map links are pure client-side utilities in `src/lib/`.
- Images generated to match the illustration style: arch/mandap hero art, lotus and foliage borders, story vignettes, floral footer band, map preview.
