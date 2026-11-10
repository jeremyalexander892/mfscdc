import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

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

  test("lists both offices with working phone links", async ({ page }) => {
    const contact = page.locator("#contact");
    await expect(contact.getByRole("heading", { name: "Louisiana" })).toBeVisible();
    await expect(contact.getByRole("heading", { name: "Texas" })).toBeVisible();
    await expect(contact.locator('a[href="tel:+13183172800"]')).toBeVisible();
    await expect(contact.locator('a[href="tel:+19728052900"]')).toBeVisible();
    await expect(contact.getByText("3226 Mackey Lane")).toBeVisible();
    await expect(contact.getByText("3704 W. Camp Wisdom Road, #120")).toBeVisible();
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

  test("video loads only after the poster is activated", async ({ page }) => {
    await expect(page.locator("iframe")).toHaveCount(0);
    await page.getByRole("button", { name: /Play video/ }).click();
    const iframe = page.locator("iframe.player");
    await expect(iframe).toHaveCount(1);
    await expect(iframe).toHaveAttribute("src", /youtube-nocookie\.com\/embed\/HMW4FPLxFpE/);
  });

  test("has no detectable accessibility violations", async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("does not scroll horizontally", async ({ page }) => {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
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

test("unknown routes show the 404 page", async ({ page }) => {
  await page.goto("/does-not-exist");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("We couldn't find that page.");
});
