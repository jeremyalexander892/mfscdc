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
