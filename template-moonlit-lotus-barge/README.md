# Moonlit Lotus Barge

A cinematic Udaipur wedding invitation with a two-tap opening journey, moonlit lotus mandap, and layered barge parallax.

## Dev

```bash
npm install
npm run dev
```

Opens on port `3024`.

## Customise

Edit `src/config.ts` only for names, family details, date, venue, program, copy, asset paths, and section toggles.

## Opening film

The template works immediately with still-image fallbacks. To add the full film:

1. Follow the Google Flow instructions in `ASSET-PROMPTS.md`.
2. Export the clip to `public/assets/lotus/intro-journey.mp4`.
3. Set `wedding.intro.videoEnabled` to `true` in `src/config.ts`.

The opening video starts muted for mobile compatibility and offers Sound and Skip controls.

## Assets

Generated assets live in `public/assets/lotus/`:

- `intro-poster.webp` and `intro-end.webp`
- `sky.webp`, `water-palace.webp`, and `social-card.webp`
- `barge.png`, `couple.png`, `lotus-mandap.png`, and `foreground-lotus.png`
- `diya.png`, `floating-petals.png`, and `ornamental-frame.png`

## Interactions

- First tap starts the film or opens its still fallback
- Second tap opens the celebration through the glowing mandap
- Pointer parallax across boat, mandap, water, and foreground layers
- Reduced-motion users skip the cinematic sequence and smooth scrolling
- Calendar downloads and map directions are derived from `src/config.ts`
