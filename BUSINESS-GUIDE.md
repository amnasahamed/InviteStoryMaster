# Digital Wedding Card Business — Template Guide

> Covers: template analysis, naming & branding, per-customer customization workflow, free Netlify hosting, and OG tags for WhatsApp/messaging previews.

---

## 1. Template Analysis

All 4 templates are **Vite + React + TypeScript + Tailwind + Framer Motion** one-page scrolling invites with smooth scroll, animations (petals, lanterns, door-open intros), countdowns, Google Calendar / Maps links, and WhatsApp RSVP.

**Key strength:** each template has a single **`src/config.ts`** holding ALL per-couple content — the customization pipeline is already 90% solved.

| Folder | Theme | Vibe | Best for |
|---|---|---|---|
| `invite-royal` | Deep maroon + royal gold, Ganesha/diya/mandala, "opening doors" intro | North-Indian palace luxury | Premium tier |
| `template-01-marigold-muhurtham` | Cream + marigold orange, banana leaves, toran, Telugu greeting | South-Indian traditional, bright & auspicious | Telugu/Tamil/Kannada families |
| `template-02-midnight-jasmine` | Midnight navy + gold + blush, lanterns, fairy lights, starry night | Evening/reception, modern romantic | Younger couples, sangeet/cocktail |
| `template-04-muhurtham-mandapam` | Parchment + kumkum red + antique gold, Telugu typography, mandapam art | Classical Telugu muhurtham | Traditional Telugu weddings |

### Known weak spots

- ⚠️ **`invite-royal` & `template-02`:** UTC dates are hardcoded inside the calendar helpers (`googleCalendarUrl()` / `downloadICS()`) **separately** from the main `dateISO`. Change BOTH or "Add to Calendar" will be wrong. (Templates 01 & 04 derive it automatically.)
- ⚠️ **`template-01`:** has **no RSVP/WhatsApp section** — sell as the "simple elegant" tier, or port the RSVP block from template-02.
- ⚠️ **`template-04`:** uses a hardcoded OpenStreetMap embed — regenerate per venue (openstreetmap.org → Share → HTML).
- ⚠️ All 4 use placeholder WhatsApp number `919876543210` — always replace.

---

## 2. Naming & Branding

Folder names are dev names. Sellable product lineup:

| Template | Product name | Tagline |
|---|---|---|
| invite-royal | **Rajwada Royale** | "A palace door opens for your big day" |
| template-01 | **Marigold Muhurtham** | "Sunshine, torans & tradition" |
| template-02 | **Midnight Jasmine** | "Vows under a starlit sky" |
| template-04 | **Kalyana Mandapam** | "The sacred muhurtham, beautifully told" |

**Umbrella brand ideas:** ShubhInvite · KalyanCards · VivahLink · Muhurta Studio · WeddingKad

**Suggested pricing tiers:**

| Tier | Price | Template | Includes |
|---|---|---|---|
| Classic | ₹999 | Marigold Muhurtham | Names, date, venue, countdown, maps |
| Signature | ₹1,999 | Midnight Jasmine / Kalyana Mandapam | + WhatsApp RSVP, events schedule, calendar links |
| Royale | ₹2,999 | Rajwada Royale | + Animated door intro, 4 events, full RSVP |

> The WhatsApp RSVP + calendar links are what justify the price vs free Canva invites — lead with them in marketing.

---

## 3. Per-Customer Customization Workflow

For each new couple, **copy the template folder** and edit exactly 3 things:

### ① `src/config.ts` (the only code file)
- Couple names, parents' names, hashtag, monogram
- Date ISO + display label, muhurtham time
- Venue name, address lines, `mapsQuery`
- Events list (names, dates, times, notes)
- WhatsApp number + prefilled RSVP message, RSVP deadline
- ⚠️ On **royal/02 only**: also update the hardcoded UTC strings in `googleCalendarUrl()` / `downloadICS()`

### ② `index.html`
- `<title>` and meta description
- OG block: replace `https://YOUR-SITE.netlify.app` with the real deployed URL (see §5)

### ③ `public/assets/`
- Swap `couple.png/webp` with the couple's illustration/photo (keep same filename; portrait aspect + transparent PNG works best)
- Regenerate `og-image.jpg` from the new couple image (script below)
- Optional (premium orders): swap `hero-bg` / `venue` images

### Regenerate the OG image
```bash
python3 - <<'EOF'
from PIL import Image
src, out, yoff, bg = "public/assets/couple.png", "public/assets/og-image.jpg", 0.05, (22,4,8)  # bg = theme color
im = Image.open(src).convert("RGBA")
w, h = im.size
band = int(w / 1.91)
top = min(int(h * yoff), h - band)
im = im.crop((0, top, w, top + band))
canvas = Image.new("RGB", im.size, bg)
canvas.paste(im, mask=im.split()[3])
canvas.resize((1200, 630), Image.LANCZOS).save(out, "JPEG", quality=82)
EOF
```

### Build & deploy
```bash
npm run build   # outputs to dist/
```
**~15 minutes per invite.**

---

## 4. Free Netlify Hosting

Templates already use `base: './'` (works on any URL) and each now has a **`netlify.toml`**:
```toml
[build]
  command = "npm run build"
  publish = "dist"
```

### Per customer
1. Copy template → customize → `npm run build`
2. **Fastest:** drag the `dist/` folder into [app.netlify.com/drop](https://app.netlify.com/drop) — free, no git needed
3. Rename site → e.g. `ananya-weds-arjun.netlify.app` (free subdomain)
4. Free tier (100 GB bandwidth, 300 build min/mo) covers dozens of sites — each invite is only ~3–8 MB

**Upsell later:** custom domain (`ananyaandarjun.com`, ~₹800/yr) as a paid add-on.

---

## 5. OG Tags for WhatsApp / Messaging Previews — ✅ Implemented

All 4 `index.html` files now include:

- `og:title` / `og:description` — couple names + date + city (the preview headline)
- `og:image` — a generated **1200×630 `og-image.jpg`** per template (couple illustration composited on the theme background; JPEG because WhatsApp fails silently on WebP), stored in `public/assets/` so it ships with every build
- `twitter:card: summary_large_image` — large preview on X/Twitter

### ⚠️ Manual step per deployment
WhatsApp/Facebook require **absolute URLs**. Before each customer's build, replace the marked placeholder in the OG block:
```
https://YOUR-SITE.netlify.app  →  https://ananya-weds-arjun.netlify.app
```
(It is wrapped in `<!-- PER-CUSTOMER -->` comments in each index.html.)

### Cache busting
WhatsApp caches previews aggressively. If you change the image after sharing the link, rename the file (e.g. `og-image-v2.jpg`) to force a refresh.

### Testing
- [opengraph.xyz](https://www.opengraph.xyz) — paste the site URL
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — also clears WhatsApp's cache

---

## 6. Per-Customer Checklist

- [ ] Copy template folder, rename to couple slug
- [ ] Edit `src/config.ts` (names, dates, venue, events, WhatsApp number)
- [ ] royal/02 only: update hardcoded UTC dates in calendar helpers
- [ ] template-04 only: regenerate OSM embed URL for the venue
- [ ] Replace `couple.png/webp`, regenerate `og-image.jpg`
- [ ] Edit `index.html`: title, description, OG names/dates, replace `YOUR-SITE.netlify.app`
- [ ] `npm run build` → drag `dist/` to Netlify → rename site
- [ ] Test link preview on opengraph.xyz + send a WhatsApp test message
- [ ] Test RSVP button opens WhatsApp with correct number
- [ ] Test "Add to Calendar" shows correct date/time
- [ ] Test on a phone (all templates are mobile-first)
