# InviteStory — Business Operating Guide

> A single source of truth for running the wedding-invite business.
> Covers **brand**, **the template catalog**, **the 5 rules every template must follow**, **per-customer workflow**, **deployment**, **the landing page**, and **support**.

---

## 1. The Brand

**Name:** InviteStory
**Instagram:** https://www.instagram.com/invitestory.in/
**Voice:** Warm, premium, Indian, family-first. We build one-day, one-event, single-Wedding invitations — never a multi-day schedule.

Every customer-facing surface (templates, landing page, footer credits, WhatsApp bio) carries the same handle: `@invitestory.in`.

---

## 2. The Five Rules (apply to EVERY template and EVERY customer build)

These are the source of truth — they override anything else in the repo.

1. **One event only — the Wedding.** No mehndi, haldi, sangeet, reception, walima as separate events. The whole day is *the Wedding*. Sub-moments of that day (baraat, jaimala, pheras, vidaai) are fine inside a single wedding timeline — they are NOT separate events.
2. **No RSVP section.** No WhatsApp RSVP buttons, no "Kindly respond by …" lines, no RSVP form. The couple's family handles invitations out-of-band; the digital invite is the announcement, not a confirmation form.
3. **Footer credits → `@invitestory.in`.** Every template footer ends with a link to `https://www.instagram.com/invitestory.in/`. The wording used everywhere is **`Follow @invitestory.in on Instagram`**. No template-specific credit lines replace this — they may sit above it, never in place of it.
4. **Calendar & Maps must work.** Add-to-Calendar (Google + .ics) and Open-in-Maps links derive from `config.ts` — never hardcode dates outside that file. The calendar URL must match the displayed date and timezone.
5. **One editable file per customer.** The whole customisation happens in **one** file:
   - Vite templates → `src/config.ts`
   - TanStack templates → `src/config/invitation.ts` or `src/lib/invite.config.ts` (see the table below for each template).

If a change touches a component file or styles, that's a bug — fix the config.

---

## 3. The Template Catalog

| # | Folder | Brand Name | Vibe | Best For | Config file |
|---|---|---|---|---|---|
| 1 | `template-rajwada-royale` | Rajwada Royale | Deep maroon + royal gold, opening doors, diya petals | North-Indian royal palace weddings | `src/config/invitation.ts` |
| 2 | `template-marigold-bhavan` | Marigold Bhavan | Olive + gold paper envelope, sepia texture | Classic Indian engagements / weddings | `src/config/invite.ts` |
| 3 | `template-toran-telugu` | Toran Telugu | Maroon + brass + banana leaf, Telugu typography | South Indian Telugu weddings | `src/lib/invite.config.ts` |
| 4 | `template-ghibli-selfie` | Ghibli Selfie | Hand-painted warm, shutter selfie finale | Couples who love animated, personal touches (Nikah) | `src/routes/index.tsx` (hardcoded) |
| 5 | `template-emerald-nikah` | Emerald Nikah | Emerald + cream + parchment, roses & daisies | Nikah under garden vines | `src/routes/index.tsx` (hardcoded) |
| 6 | `template-noor-e-zahra` | Noor-e-Zahra | Ivory + antique gold + olive, mandala | Nikkah at a masjid/banquet | `src/lib/wedding.ts` |
| 7 | `template-royal-reception` | Royal Reception | Royal blue + ivory + gold, aurora | Walima / reception | `src/components/wedding/data.ts` |
| 8 | `template-kerala-sands` | Kerala Sands | Ivory + gold, Kerala temple wedding vibe | Kerala weddings | `src/components/wedding/data.ts` |
| 9 | `template-meadow-nikah` | Meadow Nikah | Sky + meadow + blossom garden envelope | Outdoor Nikah | `src/lib/wedding.ts` |
| 10 | `template-grand-line-voyage` | Grand Line Voyage | Ocean + gold + sunset, One Piece Log Pose | Quirky couple / beach wedding in Goa | `src/lib/wedding-config.ts` |
| 11 | `template-sage-parchment` | Sage Parchment | Parchment + sage, classic, open-gate | Hindu weddings, elegant & quiet | `src/config/invitation.ts` |
| 12 | `template-ghibli-portrait` | Ghibli Portrait | English parchment, childhood-to-adult Ghibli portraits | English-speaking couples, destination weddings | `src/config.ts` |
| 13 | `template-rajwada-royale-alt` | Rajwada Royale (Alt) | Demo instance of #1 with a different couple | Sample / alt demo | `src/config/invitation.ts` |
| 14 | `template-marigold-bhavan-alt` | Marigold Bhavan (Alt) | Demo instance of #2 with a different couple | Sample / alt demo | `src/config/invite.ts` |
| 15 | `template-rajmahal-palace` | Rajmahal Palace | Dark maroon palace doors opening, giant outlined names | Hindu royal palace weddings | `src/config.ts` |
| 16 | `template-shubha-vivaham` | Shubha Vivaham | Telugu muhurtham with marigold toran, Telugu shubha vivaham | Telugu muhurtham | `src/config.ts` |
| 17 | `template-midnight-stargaze` | Midnight Stargaze | Navy + gold doors, hanging garland, marquee | Evening/night weddings | `src/config.ts` |
| 18 | `template-kalyana-mandapam` | Kalyana Mandapam | Parchment + kumkum + gold, mandapam PNG, Telugu | Telugu muhurtham with mandap | `src/config.ts` |
| 19 | `template-tamil-thirumana` | Tamil Thirumana | Tamil typography, banana-leaf palette | Tamil weddings (Coimbatore, Chennai, Madurai) | `src/lib/invite.config.ts` |
| 20 | `template-lake-pichola` | Lake Pichola Royal | Gold floral texture, illustrated couple, Lake Pichola | Udaipur royal weddings | `src/config.ts` |
| 21 | `template-lakeview-lanterns` | Lakeview Lanterns | Twilight Kerala backwaters, parallax lanterns, illustrated couple | Kerala lakeside evening weddings | `src/config.ts` |
| 21 | `template-ivory-waltz` | Ivory Waltz | Cream linen + black suit, layered faceless dance, parallax | Soft modern Nikah / cream-and-black aesthetic | `src/config.ts` |
| 22 | `template-petal-path` | Petal Path Palace | Layered parallax floral arch, palace aisle, falling petals | Sikh / North-Indian palace weddings | `src/config.ts` |

### Known duplicate pairs

- 1 & 13 are the **same template** rendered with two different couples — keep both for sales demos.
- 2 & 14 same — duplicate couple demos.
- 3 & 19 share the same invite config but render with different theme styling in some sections. Treat as distinct demo instances.

### Notes that override the old guide

- **Old name "invite-royal" / "template-01-marigold-muhurtham"** → use the **brand names in the table above** when talking to customers.
- **Old hardcoded UTC dates in `googleCalendarUrl()` / `downloadICS()`** — every template's calendar function now derives dates from `dateISO` in the config file. There is no longer a hardcoded duplicate to keep in sync.

---

## 4. Operating Standards (apply to every template, every time)

These are the non-negotiables for any change you make to the codebase.

### A. Single-event guarantee

For every template, the config exposes ONE event (the Wedding). If the customer only has a muhurtham, fine — that is *the* Wedding. The Events / EventDetails section uses that single event to drive the card, calendar link, and any countdown references.

### B. No RSVP

If you spot these, remove them:

- `<Rsvp />` component import and usage in `routes/index.tsx` or `pages/Home.tsx`
- A `sections/Rsvp.tsx` or `components/wedding/Rsvp.tsx` file
- A floating WhatsApp RSVP button (`fixed bottom-X right-X` with a `MessageCircle` icon)
- `whatsappUrl`, `whatsappNumber`, `wedding.rsvp.*` exports in `config.ts`
- "Confirm on WhatsApp" / "Kindly respond by …" copy anywhere

### C. Footer IG link

Every template footer MUST contain:

```tsx
<a href="https://www.instagram.com/invitestory.in/" target="_blank" rel="noreferrer">
  Follow @invitestory.in on Instagram
</a>
```

The wording is fixed — do not localise, abbreviate, or rewrite it.

### D. Calendar derivation

`googleCalendarUrl()` and any `.ics` export must derive their `DTSTART`/`DTEND` from `dateISO` / `weddingISO`. Never hardcode a date in those helpers.

### E. Mobile-first

All templates are mobile-first. Test on a phone before approving any change. The scripts that break on touch (hover-only, drag-only) are bugs.

---

## 5. Per-Customer Customisation Workflow

**Preferred path — Control Centre (local):**

```bash
cd 00-control
npm install
npm run dev   # UI http://127.0.0.1:5180 · API :8787
```

Use **New client** → edit Details / Sections / Media → **Save & apply** → **Build** → Reveal `dist` → drag onto https://app.netlify.com/drop.  
Client projects live in `clients/<slug>/` (gitignored). Full notes: [`00-control/README.md`](00-control/README.md).

**Manual fallback** (same outcome without the UI):

For each new couple, run this checklist. It should take ~15 minutes of editing + ~10 minutes of QA + ~5 minutes of deploy.

### Step 1 — Clone the template folder

```bash
cp -R template-rajwada-royale ../ananya-weds-arjun
cd ../ananya-weds-arjun
```

### Step 2 — Update package.json

Change `name` to `invite-story-<couple-slug>` for clarity in logs.

### Step 3 — Edit the SINGLE config file

Open the file from the **Config file** column in §3 and fill in:

- `couple.{bride,groom}` (and `brideFull` / `groomFull` where the template uses them)
- Parents' lines
- `hashtag`
- `dateISO` / `dateLabel` / `timeLabel`
- `venue.{name,address,mapsQuery}` (and `lat`/`lng` if the template uses them)
- Telugu/Tamil/Arabic blessings as needed
- For template 18 only: regenerate the `osmEmbed` URL at https://www.openstreetmap.org → Share → HTML

### Step 4 — Swap the couple image(s)

Each template references 1–4 PNG/JPG/WebP assets (couple illustration, hero photo, etc.). Drop the customer's photos into the same `public/` or `src/assets/` path with the **same filename** and the templates re-render automatically. If dimensions differ wildly, resize to portrait 4:5 before swap.

### Step 5 — Verify

Run through these five checks before deploying:

- [ ] Names render everywhere (hero, footer, calendar text)
- [ ] Countdown counts down to the right date/time (timezone +05:30 unless noted)
- [ ] Add-to-Calendar opens a Google Calendar event with the correct local time
- [ ] Open-in-Maps opens the right venue in Google Maps
- [ ] Footer Instagram link opens `https://www.instagram.com/invitestory.in/`
- [ ] No RSVP section appears anywhere in the page
- [ ] No hardcoded `Mehndi` / `Haldi` / `Reception` strings (only Wedding-related moments)
- [ ] Mobile preview on a real phone — smooth scroll, no overflow, tap targets work

### Step 6 — Build & deploy

```bash
npm install
npm run build
```

Drag the resulting `dist/` folder to https://app.netlify.com/drop. Free subdomain: `ananya-weds-arjun.netlify.app`. Free tier covers ~100 GB bandwidth — one invite is typically 3–8 MB.

### Step 7 — Hand over

Send the couple:

1. The Netlify link
2. A WhatsApp test preview (open the link on your phone, share via WhatsApp to confirm the OG image renders)
3. A 24-hour "request changes" window

---

## 6. The Landing Page (`00-landing/`)

This is the URL you share with enquiries.

### Run locally

```bash
cd 00-landing
npm install
npm run dev   # http://localhost:5173
```

### What it does

- Hero with the brand line and the 4 key features
- Filterable, searchable gallery of all live templates
- "How it works" 4-step explainer
- WhatsApp + Instagram contact section

### Two preview modes (toggle in `src/App.tsx`)

```ts
const USE_PLACEHOLDER = true;   // soft "Live preview" pill in each card
const USE_PLACEHOLDER = false;  // iframe points at ./<folder>/index.html
```

`USE_PLACEHOLDER = true` is the safe default for sharing with new enquiries — it never shows broken templates. Flip to `false` once you have deployed at least one customer build per template, so the iframes load real invites.

### Deploy layout

```
/
├── index.html              ← built from 00-landing/ (the gallery)
├── template-rajwada-royale/index.html
├── template-marigold-bhavan/index.html
└── … (one folder per template, each its own `dist/`)
```

Every template already has `base: './'` set in its `vite.config.ts` so the build works from any subpath.

---

## 7. Pricing

**₹1,999 / $20 per template** — flat one-time fee for any template.

What the customer gets: names, date, muhurtham, venue maps, countdown, Add-to-Calendar, photo swap, live shareable link within 24 hours. No subscription.

Sell the WhatsApp preview + Add-to-Calendar as the differentiator — free Canva invites can't do either.

---

## 8. Code Conventions (so the team doesn't accidentally break a template)

- One config file per template — never put content in components.
- Never add a multi-day event list. If a customer asks for mehndi/haldi/reception, push back: "One Wedding per invite is our signature — it makes the day feel *the* day."
- Never replace the Instagram footer link. If a template has a competing credit, delete the competitor and keep the InviteStory line.
- Tailwind only. No new CSS framework.
- Don't introduce hardcoded dates in components. Always go through the config.
- Keep the README inside each template folder up to date with that template's quirks (e.g. `template-kalyana-mandapam` regenerates its OSM embed per venue).

---

## 9. Quality Checklist (run before any release)

For every template and for the landing page:

- [ ] Footer Instagram link is present and points to `https://www.instagram.com/invitestory.in/`
- [ ] No RSVP component, no RSVP copy, no floating WhatsApp button
- [ ] Only ONE event in the config (the Wedding)
- [ ] Calendar links derive from `dateISO`
- [ ] Smooth scroll, opening animations, and music toggles all run on a real phone
- [ ] `npm run build` exits 0
- [ ] Preview iframe loads in the landing page (placeholder or live)

---

## 10. Support / Iteration

When a customer asks for a tweak:

1. **Naming / dates / venue / hashtag / parents** → edit the single config file.
2. **Photos** → swap the file in `public/` or `src/assets/` with the same filename.
3. **Color / theme change** → ask first; if it's the same template, walk through the `:root` token block in `styles.css` (TanStack) or the `theme` object in `config.ts` (Vite ghibli-portrait).
4. **New section** (e.g. add a parents' photo) → that needs a 30-min design call, not a 5-min edit. Quote separately.

---

**Owner:** InviteStory team
**Last revised:** See git log on `BUSINESS-GUIDE.md`.