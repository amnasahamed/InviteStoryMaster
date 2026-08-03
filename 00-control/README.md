# InviteStory Control Centre

Local-only operator tool for creating and customising wedding invites from the template catalog.

**You only** — no login, no database, no cloud CMS. Runs on your machine at `127.0.0.1`.

## Run

```bash
cd 00-control
npm install
npm run dev
```

- UI → http://127.0.0.1:5180  
- API → http://127.0.0.1:8787  

## Workflow

1. **New client** — pick a template, enter groom/bride names (optional slug).
2. Control Centre clones `template-*` → `clients/<slug>/`, writes `client.json`, and applies the native config via an adapter.
3. **Editor** — edit details, toggle sections (pilots), upload media slots, preview, build.
4. **Build & Deploy** — build writes `clients/<slug>/dist`. Reveal in Finder → drag onto [Netlify Drop](https://app.netlify.com/drop).

## How editing works

Each template has its **own section list** (hero, story, venue, gallery, etc.).  
Open a client → **Template sections** sidebar shows only that template’s sections.  
Fields, toggles, and image slots are scoped to the active section — not a generic all-in-one form.

Pilots with show/hide toggles: Ghibli Portrait, Tamil Thirumana, Rajwada Royale, Midnight Stargaze.  
Other templates expose their content sections as always-on editors.

## Deferred templates

`emerald-nikah` and `ghibli-selfie` are hardcoded (no single config file). They appear as “coming soon” until configs are extracted.

## Layout

```
00-control/
  src/           React UI
  server/        Local Express API + adapters
clients/         Generated couple projects (gitignored)
```
