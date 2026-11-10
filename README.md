# mfscdc

Marketing site for **Miles For Smiles**, mobile dental care for correctional facilities in
Louisiana and Texas. It's a static [Astro](https://astro.build) site with no client framework.
The only browser JavaScript is a few lines for the mobile menu fallback and the click-to-load video.

## Requirements

- Node 26 (see `.nvmrc`; Astro 7 needs at least 22.23.4)
- npm

## Commands

| Command            | What it does                                                                |
| ------------------ | --------------------------------------------------------------------------- |
| `npm install`      | Install dependencies                                                        |
| `npm run dev`      | Start the dev server at http://localhost:4321                               |
| `npm run build`    | Build the static site into `dist/`                                          |
| `npm run preview`  | Serve the built `dist/` locally                                             |
| `npm run check`    | Run the Astro and TypeScript diagnostics                                    |
| `npm run lint`     | Run ESLint, including the jsx-a11y strict rules, with zero warnings allowed |
| `npm run format`   | Format with Prettier                                                        |
| `npm run test:e2e` | Run the Playwright tests (desktop and mobile, including axe)                |
| `npm run verify`   | Run every check above in CI order                                           |

The first test run needs a browser: `npx playwright install chromium`.

## Where things live

- `src/content/site.ts` holds every fact on the page: offices, phones, email, hours, stats and the testimonial. Edit it here and it updates everywhere, including the structured data.
- `src/styles/brand.css` holds the brand tokens (palette, type scale, spacing) and the shared components. The palette matches the Golfing for Smiles site.
- `src/components/` has one Astro component per page section.
- `src/assets/images/` holds the source photos. `astro:assets` serves them as responsive AVIF and WebP.
- Fonts (Fraunces, Nunito Sans, Yellowtail) come through the Astro Fonts API, which self-hosts them at build time.

## Deployment

Not configured yet. `npm run build` produces a fully static `dist/` folder that any static host can serve.
