/**
 * Plays the [data-reveal] rise (see brand.css) as each element enters the
 * viewport, the same pattern golfingforsmiles uses. Elements are revealed once
 * and then stop being observed.
 */
const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");

const reveal = (el: HTMLElement) => {
  el.dataset["reveal"] = "revealed";
};

if (typeof IntersectionObserver === "undefined") {
  targets.forEach(reveal);
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
  );
  targets.forEach((el) => observer.observe(el));
}
