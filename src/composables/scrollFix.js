import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* =========================
   SCROLLTRIGGER POSITION FIX
   ScrollTrigger measures each trigger's pixel position once, when
   it's created. Web fonts swapping in, the hero video reporting its
   real height, or any other late layout shift after that moment
   leaves every trigger below it slightly — or completely — stale,
   which can strand a scroll-revealed element permanently invisible
   (it's still there, just waiting for a scroll position that no
   longer lines up with anything). Call this once per page mount to
   re-measure everything after the page has actually settled.
========================= */

export function fixScrollTriggerPositions() {
  document.fonts?.ready?.then(() => ScrollTrigger.refresh())
  window.addEventListener('load', () => ScrollTrigger.refresh())
  // Covers slower settles (hero video metadata, late images) that
  // neither of the above catches.
  setTimeout(() => ScrollTrigger.refresh(), 400)
  setTimeout(() => ScrollTrigger.refresh(), 1200)
}
