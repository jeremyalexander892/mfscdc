# Miles For Smiles: mfscdc.com

Marketing site for **Miles For Smiles**, mobile dental care for correctional facilities in
Louisiana and Texas.

It is a static [Astro](https://astro.build) site. Pages are plain HTML and CSS with no client
framework. The only browser JavaScript is two small scripts: the mobile menu and the
click-to-load video.

## Requirements

- **Node 26.** See `.nvmrc`. Astro 7 needs at least 22.23.4.
- **npm.** Use `npm ci` for a clean install from the lockfile.

## Getting started

```bash
npm ci
npm run dev
```

Then open http://localhost:4321.

## Commands

| Command                | What it does                                                                   |
| ---------------------- | ------------------------------------------------------------------------------ |
| `npm run dev`          | Start the dev server with hot reload                                           |
| `npm run build`        | Build the static site into `dist/`                                             |
| `npm run preview`      | Serve the built `dist/` locally                                                |
| `npm run check`        | Astro and TypeScript diagnostics                                               |
| `npm run lint`         | ESLint with the jsx-a11y strict rules (zero warnings allowed)                  |
| `npm run format`       | Format everything with Prettier                                                |
| `npm run format:check` | Check formatting without writing                                               |
| `npm run test:e2e`     | Playwright tests in Chrome, Safari, Firefox, iPhone and Android, including axe |
| `npm run verify`       | Everything above, in the order CI runs it                                      |

Before the first test run, install the browsers:

```bash
npx playwright install chromium webkit firefox
```

The Content Security Policy only applies to built pages, not the dev server. Use `npm run build`
followed by `npm run preview` to check it.

## Project structure

```text
src/
├── assets/images/    Source photos and the logo. astro:assets serves them as responsive AVIF and WebP
├── components/       One Astro component per page section (Hero, Pillars, StatBand, …)
├── content/site.ts   Every fact on the site: offices, phones, email, hours, stats, testimonial
├── layouts/Base.astro  <head>: SEO and social tags, structured data, fonts, skip link
├── pages/            index.astro (home) and 404.astro
└── styles/brand.css  Brand tokens (colour, type, spacing) and shared components
public/               Favicons, web manifest, robots.txt
tests/                Playwright end-to-end and accessibility tests
```

## Editing content

Almost every change is a one-line edit in **`src/content/site.ts`**: a phone number, an address,
the email, opening hours, the headline stats or the testimonial. Each value is written once and
used everywhere, including the search-engine structured data (Dentist and MedicalOrganization
JSON-LD).

Section copy, such as the benefits list or the "How it works" steps, lives in the matching
component in `src/components/`.

To replace a photo, put the new file in `src/assets/images/` with the same name. The build
resizes and converts it automatically.

## Design system

The brand matches the Golfing for Smiles site so both read as one family. All tokens live in
`src/styles/brand.css`.

| Token                  | Value                | Use                                                       |
| ---------------------- | -------------------- | --------------------------------------------------------- |
| `--brand-navy`         | `#072e6e`            | Headings, links, focus rings (12.9:1 on white)            |
| `--brand-navy-deep`    | `#041650`            | Hero, closing band, footer                                |
| `--brand-lime`         | `#a9d130`            | Button fills and accents on navy. **Never text on white** |
| `--brand-green`        | `#4c920f`            | Icons and large numerals only (3.9:1)                     |
| `--ink`, `--ink-muted` | `#10233f`, `#4d5f78` | Body and secondary text                                   |

Fonts are self-hosted through the Astro Fonts API: **Fraunces** for display text, **Nunito Sans**
for body text, and **Yellowtail** for at most one script word per view.

## Modern platform features

- **Mobile menu.** A native `<dialog>` opened with invoker commands (`command` and `commandfor`).
  It traps focus, closes on Escape and returns focus to the menu button. A small script covers
  older browsers.
- **Scroll effects in CSS only.** The header turns solid and sections reveal using scroll-driven
  animations. Browsers without support, such as Firefox, get the static version. Visitors who
  prefer reduced motion get no motion.
- **Self-hosted, click-to-load video.** `public/video/` holds an H.264/AAC MP4 (metadata at the
  front, so it starts playing while it downloads) and optional English WebVTT captions, which
  viewers turn on from the player's CC control.
  Nothing is requested until a visitor presses play. If the file can't play, the player shows an
  error and a download link. The video's URL and size label live in `src/content/site.ts`.
- **Images.** Responsive AVIF and WebP with fixed dimensions, so the layout doesn't shift as the
  page loads. The hero photo loads with high priority.
- **Security.** A Content Security Policy is generated at build time. Astro hashes every inline
  script and style. Everything else, including the video, is limited to this origin, and no
  third-party frames are allowed.
- **SEO.** Canonical URL, Open Graph and Twitter cards with a generated 1200×630 image, sitemap,
  `robots.txt`, structured data and a 404 page.

## Quality gates

GitHub Actions (`.github/workflows/ci.yml`) runs `npm run verify` on every pull request and on
every push to `master`:

1. Formatting
2. Lint
3. Type check
4. Build
5. Playwright tests in five browser profiles, including an axe scan against WCAG 2.2 AA

As of 2026-11-10, Lighthouse scores the page 100 for Performance, Accessibility, Best Practices
and SEO on both the mobile and desktop profiles, with zero layout shift. On Vercel preview
deployments SEO reads lower because Vercel marks previews `noindex`, which is intended.

## Deployment

**Not decided yet.** Hosting will be chosen after client review. `npm run build` produces a fully
static `dist/` folder that any static host can serve.

- **Vercel**, where the current site runs: `vercel.json` sets the Astro framework preset, the
  security headers (`nosniff`, `DENY` framing, referrer policy and permissions policy) and
  long-lived caching for the fingerprinted files in `/_astro/`.
- **Railway**, or any other host: serve `dist/` with a static web server such as Caddy or nginx.
  Copy the same headers and the `/_astro/*` cache rule from `vercel.json`.
