# Moonlit Lotus Barge Asset Prompts

## Google Flow video

Upload `public/assets/lotus/intro-poster.webp` as the first-frame reference and `public/assets/lotus/intro-end.webp` as the final-frame reference. Generate a 6-8 second vertical clip.

```text
Create a cinematic vertical 9:16 wedding invitation transition using the supplied opening and ending reference frames.

SHOT: Begin at water level behind a miniature royal lotus barge carrying a faceless Indian bride and groom, both seen from behind. The boat glides slowly and naturally across deep indigo Lake Pichola toward a luminous open-air lotus mandap. The camera performs one smooth, restrained forward dolly that follows the boat and gradually rises by a few degrees. Floating diyas drift gently, lotus blossoms move with the water, a few soft rose petals cross the lens, moonlight shimmers on the wake, and distant Udaipur palace lights remain stable.

ENDING: The barge eases out of the lower frame as the camera arrives at the marble landing. Finish precisely on the supplied final frame with the glowing mandap arch centered and large enough to become an interactive tap target. Hold the final composition still for the last 0.7 seconds.

STYLE: refined Indian miniature painting blended with premium editorial cinema; deep indigo, muted lotus pink, pearl moon-silver, and restrained antique gold; intricate but uncluttered; romantic, sacred, family-first.

MOTION: physically believable water and boat movement, subtle cloth movement, no sudden acceleration, no orbit, no handheld shake, no cuts, no morphing architecture, no face reveal.

AUDIO: soft lake water, distant temple bells, a low tanpura-like ambience, and one delicate bell bloom as the mandap fills the frame. No speech and no music melody.

RESTRICTIONS: no text, letters, logos, watermark, extra people, scene cuts, camera whip, new objects, deformed hands, changing clothing, changing boat design, or changing mandap design.
```

Export as `intro-journey.mp4`:

- H.264 MP4
- 1080 x 1920
- 24 or 30 fps
- 6-8 seconds
- Audio enabled
- Keep the first and final compositions matched to the supplied stills

Place the export at `public/assets/lotus/intro-journey.mp4`.

## Cursor image system

The stills and PNG layers were generated in Cursor from one master composition. Any replacement should retain:

- Deep indigo water and sky
- Muted lotus-pink florals
- Pearl and moon-silver architecture
- Restrained antique-gold detail
- Indian miniature-painting texture with modern editorial depth
- No baked names, dates, labels, logos, or watermarks

### Master composition

```text
A premium vertical Indian wedding invitation key art viewed from water level at night. A tiny ornate royal lotus barge glides across deep indigo water toward a luminous open-air lotus mandap on a marble island. A faceless Indian bride and groom sit in the boat, seen from behind. Udaipur palace silhouettes, low Aravalli hills, an enormous pearl moon, floating diyas and lotus blossoms, soft mist, cinematic depth, refined Indian miniature painting blended with modern editorial illustration. Generous center-safe negative space. No text, logo, border, or watermark.
```

### Transparent layers

For each layer, reference the master composition and add:

```text
Isolate only [SUBJECT]. Preserve the exact palette, lighting direction, perspective, materials, and illustration style from the reference. Center the complete subject with generous empty padding. No scenery, floor, water, reflection, text, logo, border, or watermark. Transparent PNG with clean alpha edges.
```

Subjects and filenames:

- Royal barge with seated couple: `barge.png`
- Seated bride and groom only, viewed from behind: `couple.png`
- Lotus mandap with marble landing: `lotus-mandap.png`
- Wide lotus and lily-pad cluster: `foreground-lotus.png`
- One floating brass diya: `diya.png`
- Twelve separated rose and lotus petals: `floating-petals.png`
- Delicate full-height moon-silver floral frame: `ornamental-frame.png`

Generated PNGs must be checked for a real alpha channel. If a tool bakes a checkerboard into the pixels, remove it before using the asset.

### Scene plates

Generate both plates from the same master reference:

```text
SKY: A clean vertical 9:16 deep-indigo night sky with subtle stars, faint high mist, and one enormous pearl moon. Keep the lower half dark and uncluttered. No landscape, water, architecture, people, flowers, text, border, or watermark. Export as sky.webp.

WATER AND PALACE: A vertical 9:16 lower-scene plate with deep indigo Lake Pichola, restrained moon reflection, low Aravalli hills, and distant Udaipur palace silhouettes. Leave the upper sky clean for compositing with sky.webp. No moon, boat, couple, mandap, flowers, diyas, text, border, or watermark. Export as water-palace.webp.
```

The social poster is a 1200 x 630 adaptation of the master composition with the barge in the lower-left third, the mandap in the right third, and clean dark-sky space for sharing metadata.
