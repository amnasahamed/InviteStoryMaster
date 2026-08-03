# Lakeview Lanterns

Twilight lakeside wedding invite with layered parallax, flying sky lanterns, and an illustrated couple.

## Dev

```bash
npm install
npm run dev
```

Opens on port `3016`.

## Customise

Edit **`src/config.ts`** only — names, date, venue, program, section toggles.

## Layers

Generated assets live in `public/assets/layers/`:

1. `layer-01-sky.png` — dusk sky + mountains
2. `layer-02-lake-resort.png` — lake + pavilion + palms
3. `layer-03-deck.png` — foreground deck (masked in CSS)
4. `layer-04-lanterns.png` — lantern field (reference)
5. `lantern-sprite.png` — single animated lantern
6. `layer-05-couple.png` — cartoon couple cutout
7. `layer-06-frame.png` — gold filigree frame

## Interactions

- Pointer parallax across scenic layers
- Continuous flying lanterns + **Release a lantern** button (or press `L`)
- Candle flicker / water shimmer accents
- Smooth Lenis scroll + section reveals
