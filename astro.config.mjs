// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";

const PRODUCTION_URL = "https://www.mfscdc.com";

// Vercel exposes these at build time. Preview builds use their own URL so
// share cards (og:image, og:url) resolve on the preview link a client opens,
// and they relax the CSP just enough for Vercel's comment toolbar
// (sources from https://vercel.com/docs/vercel-toolbar/managing-toolbar).
// Every other build, including production and local, keeps the strict policy.
const isVercelPreview = process.env["VERCEL_ENV"] === "preview";
const branchUrl = process.env["VERCEL_BRANCH_URL"];
const siteUrl = isVercelPreview && branchUrl ? `https://${branchUrl}` : PRODUCTION_URL;

const toolbarCsp = isVercelPreview
  ? {
      directives: [
        "img-src 'self' data: blob: https://vercel.live https://vercel.com",
        "font-src 'self' https://vercel.live https://assets.vercel.com",
        "connect-src 'self' https://vercel.live wss://ws-us3.pusher.com",
        "frame-src https://www.youtube-nocookie.com https://vercel.live",
      ],
      scriptResources: ["'self'", "https://vercel.live"],
      styleResources: ["'self'", "https://vercel.live", "'unsafe-inline'"],
    }
  : null;

// Brand fonts match golfingforsmiles (Fraunces display, Nunito Sans body,
// Yellowtail for a single script accent word). The Fonts API self-hosts them,
// generates metric-matched fallbacks and preload hints, so no request ever
// goes to Google at runtime.
export default defineConfig({
  site: siteUrl,
  output: "static",
  trailingSlash: "ignore",
  // The whole stylesheet is small; inlining it removes the render-blocking request.
  build: { inlineStylesheets: "always" },
  integrations: [sitemap()],
  // No Markdown on this site; Shiki would otherwise emit CSP-incompatible inline styles.
  markdown: { syntaxHighlight: false },
  // Content Security Policy as a <meta> tag, so it travels with the HTML on any
  // host. Astro hashes its own inline scripts and styles into script-src and
  // style-src; everything else is locked to this origin, except the YouTube
  // player, which loads only after a visitor clicks play.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        ...(toolbarCsp?.directives ?? [
          "img-src 'self' data:",
          "font-src 'self'",
          "connect-src 'self'",
          "frame-src https://www.youtube-nocookie.com",
        ]),
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
      ],
      ...(toolbarCsp && {
        scriptDirective: { resources: toolbarCsp.scriptResources },
        styleDirective: { resources: toolbarCsp.styleResources },
      }),
    },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Fraunces",
      cssVariable: "--font-display",
      weights: [500],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["Georgia", "serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Nunito Sans",
      cssVariable: "--font-sans",
      weights: [400, 600, 700, 800, 900],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Yellowtail",
      cssVariable: "--font-script",
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["cursive"],
    },
  ],
});
