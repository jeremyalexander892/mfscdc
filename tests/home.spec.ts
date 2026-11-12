import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const HD_VIDEO = "/video/miles-for-smiles.mp4";
const SD_VIDEO = "/video/miles-for-smiles-720p.mp4";
// Mirrors the component: 1080p from 80rem (1280px) wide, 720p below that.
const expectedVideoSrc = (page: Page) =>
  (page.viewportSize()?.width ?? 0) >= 1280 ? HD_VIDEO : SD_VIDEO;

// Written out independently of src/content/site.ts so a typo there fails a test.
const LOCATIONS = [
  {
    name: "North Louisiana",
    tel: "tel:+13183172800",
    phone: "(318) 317-2800",
    address: ["3226 Mackey Lane", "Shreveport, LA 71118"],
  },
  {
    name: "South Louisiana",
    tel: "tel:+12252304707",
    phone: "(225) 230-4707",
    address: ["2314 Weymouth Dr #A", "Baton Rouge, LA 70809"],
  },
  { name: "Texas", tel: "tel:+19728052900", phone: "(972) 805-2900", address: [] },
  {
    name: "Georgia",
    tel: "tel:+17709336929",
    phone: "(770) 933-6929",
    address: ["City View", "3330 Cumberland Blvd, Suite 500", "Atlanta, GA 30339"],
  },
] as const;
const REMOVED_DALLAS_ADDRESS = "3704 W. Camp Wisdom Road";

test.describe("home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has one h1 and the core value proposition", async ({ page }) => {
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("inside your facility");
    await expect(page).toHaveTitle(/Miles For Smiles/);
  });

  test("contains no COVID-era content", async ({ page }) => {
    const text = (await page.locator("body").innerText()).toLowerCase();
    for (const term of ["covid", "quarantine", "pandemic", "temperature check"]) {
      expect(text).not.toContain(term);
    }
  });

  for (const [label, scope] of [
    ["Locations section", "#contact"],
    ["footer", "footer"],
  ] as const) {
    test(`${label} lists every location with working phone links`, async ({ page }) => {
      const region = page.locator(scope);
      for (const loc of LOCATIONS) {
        await expect(region.getByRole("heading", { name: loc.name, exact: true })).toBeVisible();
        await expect(region.locator(`a[href="${loc.tel}"]`)).toHaveText(loc.phone);
        for (const line of loc.address) await expect(region.getByText(line)).toBeVisible();
      }
      await expect(region.getByText(REMOVED_DALLAS_ADDRESS)).toHaveCount(0);
      // Texas is listed by phone only.
      const texas = region.locator("section, article").filter({
        has: page.getByRole("heading", { name: "Texas", exact: true }),
      });
      await expect(texas.locator("address")).toHaveCount(0);
    });
  }

  test("states served, years and records step are current", async ({ page }) => {
    await expect(page.locator("#top")).toContainText("Louisiana, Texas & Georgia");
    await expect(page.locator("footer")).toContainText("in Louisiana, Texas and Georgia.");
    await expect(page.getByText("20+ years")).toBeVisible();
    await expect(page.getByText("16+ years")).toHaveCount(0);
    await expect(
      page.getByRole("heading", { name: "Step 4: Electronic health records" }),
    ).toBeVisible();
  });

  test("structured data matches the listed locations", async ({ page }) => {
    const json = await page.locator('script[type="application/ld+json"]').textContent();
    const graph = (JSON.parse(json ?? "{}") as { "@graph": Record<string, unknown>[] })["@graph"];
    const places = graph.filter((n) => n["@type"] === "Dentist");
    expect(places.map((p) => p["name"])).toEqual([
      "Miles For Smiles (North Louisiana)",
      "Miles For Smiles (South Louisiana)",
      "Miles For Smiles (Georgia)",
    ]);
    expect(json).not.toContain(REMOVED_DALLAS_ADDRESS);
    const org = graph.find((n) => n["@type"] === "MedicalOrganization");
    expect(org?.["contactPoint"]).toEqual([
      expect.objectContaining({ telephone: "(972) 805-2900", areaServed: "Texas" }),
    ]);
    expect(org?.["areaServed"]).toEqual(
      ["Louisiana", "Texas", "Georgia"].map((name) => ({ "@type": "State", name })),
    );
  });

  test("phone call bar offers North and South Louisiana", async ({ page, isMobile }) => {
    test.skip(!isMobile, "The call bar is only shown on narrow screens");
    const bar = page.getByRole("navigation", { name: "Call an office" });
    await expect(bar.getByRole("link")).toHaveText(["Call North LA", "Call South LA"]);
    await expect(bar.getByRole("link").first()).toHaveAttribute("href", "tel:+13183172800");
    await expect(bar.getByRole("link").last()).toHaveAttribute("href", "tel:+12252304707");
  });

  test("footer lists email, hours and social links", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: "doc@milesforsmiles.com" })).toBeVisible();
    await expect(footer.getByText("Monday to Friday, 8am to 4pm")).toBeVisible();
    await expect(footer.getByRole("link", { name: /Facebook/ })).toHaveAttribute(
      "href",
      "https://www.facebook.com/milesforsmiles318/",
    );
    await expect(footer.getByRole("link", { name: /Instagram/ })).toHaveAttribute(
      "href",
      "https://www.instagram.com/milesforsmiles318",
    );
    await expect(footer.locator(".social-link svg")).toHaveCount(2);
  });

  test("hero and closing band treat both offices equally", async ({ page }) => {
    for (const section of [page.locator("#top"), page.locator(".closing")]) {
      await expect(section.locator('a[href^="tel:"]')).toHaveCount(0);
      await expect(section.getByRole("link", { name: "Call an office" })).toHaveAttribute(
        "href",
        "#contact",
      );
    }
  });

  test("consultation CTA opens a prefilled email", async ({ page }) => {
    const cta = page.getByRole("link", { name: "Email the office" });
    await expect(cta).toHaveAttribute(
      "href",
      "mailto:doc@milesforsmiles.com?subject=Facility%20consultation",
    );
  });

  test("every in-page link points at a real section", async ({ page }) => {
    const hrefs = await page
      .locator('a[href^="#"]')
      .evaluateAll((links) => links.map((l) => l.getAttribute("href") ?? ""));
    for (const href of new Set(hrefs)) {
      await expect(page.locator(href), `target for ${href}`).toHaveCount(1);
    }
  });

  test("video is fetched only after the poster is activated, with optional captions", async ({
    page,
  }) => {
    const videoRequests: string[] = [];
    page.on("request", (req) => {
      if (req.url().includes("/video/")) videoRequests.push(req.url());
    });
    await page.locator("#about").scrollIntoViewIfNeeded();
    await expect(page.locator("video")).toHaveCount(0);
    expect(videoRequests).toEqual([]);
    // No download prompt unless playback actually fails.
    const download = page.getByRole("link", { name: /Download the video/ });
    await expect(download).toBeHidden();

    const canPlay = await page.evaluate(() =>
      document.createElement("video").canPlayType('video/mp4; codecs="avc1.640029, mp4a.40.2"'),
    );
    await page.getByRole("button", { name: /Play video/ }).click();
    const root = page.locator(".video");

    if (!canPlay) {
      // This browser build has no H.264 decoder: the visitor gets the download link instead.
      await expect(root).toHaveAttribute("data-state", "error");
      await expect(page.getByRole("link", { name: /Download the video/ })).toBeVisible();
      return;
    }

    await expect(root).toHaveAttribute("data-state", "playing");
    const video = page.locator("video.player");
    await expect(video.locator("source")).toHaveAttribute("src", expectedVideoSrc(page));
    await expect(video).toHaveJSProperty("controls", true);
    await expect
      .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
      .toBeGreaterThan(0);
    await expect(download).toBeHidden();

    // Captions are offered but off until the viewer turns them on.
    const track = await video.evaluate((v: HTMLVideoElement) => {
      const t = v.textTracks[0];
      return t && { kind: t.kind, label: t.label, lang: t.language, mode: t.mode };
    });
    expect(track).toEqual({ kind: "captions", label: "English", lang: "en", mode: "disabled" });

    // Turning them on (what the CC control does) shows cues from the file.
    await video.evaluate((v: HTMLVideoElement) => {
      v.pause();
      const t = v.textTracks[0];
      if (t) t.mode = "showing";
      v.currentTime = 31;
    });
    await expect
      .poll(() => video.evaluate((v: HTMLVideoElement) => v.textTracks[0]?.activeCues?.length ?? 0))
      .toBeGreaterThan(0);
  });

  test("hovering the play button warms up the video without playing it", async ({ page }) => {
    const videoRequests: string[] = [];
    page.on("request", (req) => {
      if (req.url().endsWith(".mp4")) videoRequests.push(new URL(req.url()).pathname);
    });
    await page.locator("#about").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /Play video/ }).hover();

    const video = page.locator("video.player");
    await expect(video).toHaveCount(1);
    await expect.poll(() => videoRequests).toContain(expectedVideoSrc(page));
    expect(videoRequests).not.toContain(expectedVideoSrc(page) === HD_VIDEO ? SD_VIDEO : HD_VIDEO);
    // Still behind the poster: not playing, not focusable, no state change.
    await expect(video).toHaveJSProperty("paused", true);
    await expect(video).toHaveJSProperty("inert", true);
    await expect(page.locator(".video")).not.toHaveAttribute("data-state", /.+/);
    await expect(page.getByRole("button", { name: /Play video/ })).toBeVisible();
  });

  test("video failure shows an error and a download link", async ({ page }) => {
    await page.route("**/video/*.mp4", (route) => route.fulfill({ status: 404 }));
    await page.locator("#about").scrollIntoViewIfNeeded();
    const button = page.getByRole("button", { name: /Play video/ });
    await button.click();

    await expect(page.locator(".video")).toHaveAttribute("data-state", "error");
    await expect(page.getByText("The video couldn't load.")).toBeVisible();
    // Offers the smaller 720p file: failures skew toward weak connections.
    const download = page.getByRole("link", { name: "Download the video (MP4, 17 MB)" });
    await expect(download).toBeVisible();
    await expect(download).toHaveAttribute("href", SD_VIDEO);
    await expect(page.getByRole("status")).toContainText("The video couldn't load.");
    await expect(button).toBeDisabled();
    await expect(page.locator("video")).toHaveCount(0);
  });

  for (const flyer of [
    { section: "#contact", title: "Where we've provided care", alt: /map of Louisiana/ },
    { section: "#oral-health", title: "Oral health and systemic diseases", alt: /April 2024/ },
  ]) {
    test(`flyer "${flyer.title}" opens full size and closes`, async ({ page }) => {
      const card = page
        .locator(flyer.section)
        .getByRole("button", { name: new RegExp(flyer.title) });
      await card.scrollIntoViewIfNeeded();
      await expect(card).toContainText("View flyer");

      await card.click();
      const dialog = page.getByRole("dialog", { name: flyer.title });
      await expect(dialog).toBeVisible();
      const full = dialog.getByRole("img", { name: flyer.alt });
      await expect(full).toBeVisible();
      await expect
        .poll(() => full.evaluate((img: HTMLImageElement) => img.naturalWidth))
        .toBeGreaterThan(0);

      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(card).toBeFocused();

      // Close button and a click on the backdrop also close it.
      await card.click();
      await expect(dialog).toBeVisible();
      await dialog.getByRole("button", { name: "Close flyer" }).click();
      await expect(dialog).toBeHidden();
      await card.click();
      await expect(dialog).toBeVisible();
      await page.mouse.click(5, 5);
      await expect(dialog).toBeHidden();
    });
  }

  test("flyer dialog has no detectable accessibility violations", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page
      .locator("#contact")
      .getByRole("button", { name: /Where we've provided care/ })
      .click();
    await expect(page.getByRole("dialog", { name: "Where we've provided care" })).toBeVisible();
    const results = await new AxeBuilder({ page })
      .include("#flyer-service-map")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("Locations menu link previews the service map on hover", async ({ page, isMobile }) => {
    test.skip(isMobile, "Hover previews are for mouse users; phones use the flyer card");
    const nav = page.getByRole("navigation", { name: "Primary" });
    test.skip(!(await nav.isVisible()), "Desktop navigation is hidden at this width");
    const link = nav.getByRole("link", { name: "Locations" });
    const preview = page.locator(".nav-preview");
    await expect(preview).toBeHidden();

    await link.hover();
    await expect(preview).toBeVisible();
    await expect(preview).toContainText("Where we've provided care");
    // Moving onto the preview keeps it open, and clicking it goes to Locations.
    await preview.hover();
    await expect(preview).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(preview).toBeHidden();

    await page.mouse.move(0, 400);
    await link.hover();
    await expect(preview).toBeVisible();
    await preview.click();
    await expect(page).toHaveURL(/#contact$/);
  });

  test("serves the captions file", async ({ request }) => {
    const res = await request.get("/video/miles-for-smiles.en.vtt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body.startsWith("WEBVTT")).toBe(true);
    expect(body).toContain("Miles For Smiles provides");
    expect(body.toLowerCase()).not.toContain("russ");
  });

  test("has no detectable accessibility violations", async ({ page }) => {
    // Check the settled design, not a frame mid-fade: reduced motion renders
    // every element at its final opacity immediately.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("loads without console errors or CSP violations", async ({ page }) => {
    const problems: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") problems.push(msg.text());
    });
    page.on("pageerror", (error) => problems.push(error.message));
    await page.addInitScript(() => {
      document.addEventListener("securitypolicyviolation", (event) => {
        console.error(`CSP violation: ${event.violatedDirective} ${event.blockedURI}`);
      });
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator('meta[http-equiv="content-security-policy"]')).toHaveCount(1);
    expect(problems).toEqual([]);
  });

  test("does not scroll horizontally", async ({ page }) => {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe("motion", () => {
  test("reveals sections as they scroll into view", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    const target = page.locator("#locations-title").locator("xpath=ancestor::*[@data-reveal][1]");
    await expect(target).toHaveAttribute("data-reveal", "");
    await expect(target).toHaveCSS("opacity", "0");
    await target.scrollIntoViewIfNeeded();
    await expect(target).toHaveAttribute("data-reveal", "revealed");
    await expect(target).toHaveCSS("opacity", "1");
  });

  test("hero copy is fully visible at the top of the page", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    await page.waitForTimeout(1200); // let the entrance animation settle
    await expect(page.locator(".hero-content")).toHaveCSS("opacity", "1");
    await expect(page.locator(".hero-title")).toHaveCSS("opacity", "1");
  });

  test("scroll-linked effects follow the scroll position", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    const supported = await page.evaluate(() => CSS.supports("animation-timeline: scroll()"));
    test.skip(!supported, "Browser has no scroll-driven animations; static fallback applies");

    const header = page.locator(".site-header");
    await expect(header).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 400);
    });
    await expect(header).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  });

  test("shows everything immediately with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const opacities = await page
      .locator("[data-reveal], .hero-content > *")
      .evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity));
    expect(opacities.every((o) => o === "1")).toBe(true);
  });
});

test.describe("mobile menu", () => {
  test("opens as a modal, closes with Escape and returns focus", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Menu button is only shown on narrow screens");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    const menu = page.getByRole("dialog", { name: "Site menu" });

    await toggle.click();
    await expect(menu).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(toggle).toBeFocused();
  });

  test("following a link closes the menu", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Menu button is only shown on narrow screens");
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const menu = page.getByRole("dialog", { name: "Site menu" });
    await menu.getByRole("link", { name: "Locations" }).click();
    await expect(menu).toBeHidden();
    await expect(page).toHaveURL(/#contact$/);
  });
});

test("unknown routes show the 404 page with every office's number", async ({ page }) => {
  await page.goto("/does-not-exist");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("We couldn't find that page.");
  for (const loc of LOCATIONS) await expect(page.locator(`a[href="${loc.tel}"]`)).toHaveCount(1);
});
