# Ganesha Gopuram

A mobile-first South Indian wedding invitation with an ivory-and-gold layered composition, cinematic baby-Ganesha video intro (Higgsfield), and a smooth cover → video → focus tap → gilded reveal → invitation flow.

## Dev

```bash
npm install
npm run dev
```

Opens on port `3017`.

```bash
npm test
npm run build
```

## Customise

Edit **`src/config.ts`** only — names, date, venue, program, RSVP, intro media paths, and section toggles.

## Experience flow

1. **Cover** — ceremonial welcome with “Tap to Begin”
2. **Video** — user-initiated muted cinematic intro (skip + mute controls)
3. **Focus tap** — glowing ring cue → enter invitation
4. **Reveal** — gilded doorway light transition
5. **Invitation** — layered temple hero + couple, events, venue, RSVP, footer

Reduced-motion users skip straight to the invitation.

## Layers

Generated assets live in `public/assets/layers/`:

| File | Role |
|------|------|
| `layer-01-backdrop.png` | Ivory parchment + faint gopuram |
| `layer-02-toran.png` | Banana leaves + marigold toran |
| `layer-03-props.png` | Brass lamps, kalash, lotuses |
| `layer-04-gold-frame.png` | Ornate gold frame |
| `ganesha-icon.png` | Golden line-art Ganesha |
| `cover-welcome.png` | Full cover composition |
| `family-welcome-card.png` | Family welcome card |
| `butterflies-sprite.png` | Floating butterfly accents |

Video:

| File | Role |
|------|------|
| `public/assets/video/intro.mp4` | Higgsfield cinematic intro |
| `public/assets/video/poster.png` | Start frame / poster fallback |

## Higgsfield regeneration

Model used: **Kling v3.0** (`kling3_0`), 9:16, 8s, sound off, start frame = `poster.png`.

Prompt:

> Cinematic vertical wedding invitation intro. From behind, a chubby toddler-like baby Lord Ganesha with elephant head, golden crown, bright orange dhoti and gold ornaments walks slowly and gracefully away from the camera down a red patterned carpet toward massive carved dark wood South Indian temple doors adorned with marigold garlands. He pauses briefly. The ornate doors slowly open inward, revealing a warm divine golden light filling a grand temple hall with a chandelier. Soft ethereal particles and warm glow. Smooth forward camera push following Ganesha. Sacred, peaceful, premium cinematic motion. No text, no UI, no watermarks.

To regenerate:

1. Ensure Higgsfield MCP is connected and authenticated
2. Upload `public/assets/video/poster.png` via `media_upload` + `media_confirm`
3. Call `generate_video` with model `kling3_0`, aspect `9:16`, duration `8`, `sound: "off"`, and the start image media id
4. Download the completed MP4 into `public/assets/video/intro.mp4`

If `intro.mp4` is missing, the template falls back to the poster and continues into the invitation after a failed-play path.

## Interactions

- Cover CTA with soft pulse ring
- Video progress bar, skip, mute toggle
- Focus-tap enter + replay blessing
- Pointer parallax across scenic layers
- Lamp flicker / garland sway / butterfly drift
- Lenis smooth scroll + section reveals
- WhatsApp / phone RSVP, calendar export, maps

## Stack

Vite · React 19 · TypeScript · Tailwind · Framer Motion · Lenis
