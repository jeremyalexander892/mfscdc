// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Brand fonts match golfingforsmiles (Fraunces display, Nunito Sans body,
// Yellowtail for a single script accent word). The Fonts API self-hosts them,
// generates metric-matched fallbacks and preload hints, so no request ever
// goes to Google at runtime.
export default defineConfig({
  site: "https://www.mfscdc.com",
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
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "frame-src https://www.youtube-nocookie.com",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
      ],
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
