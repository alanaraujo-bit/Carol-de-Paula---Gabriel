/**
 * Smoothly scrolls to an in-page anchor and keeps the URL hash in sync.
 * Returns false when the anchor is not on the current page.
 */
export function scrollToHash(hash: string) {
  const target = document.getElementById(hash.replace(/^#/, ""));
  if (!target) return false;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  history.pushState(null, "", hash);
  // Move focus for keyboard and screen reader users without a second jump.
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  return true;
}
