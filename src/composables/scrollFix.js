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

   Calls are coalesced: every page mount and every route transition
   asks for this, and a refresh re-lays-out the whole page, so stacking
   them up mid-transition is what made page changes stutter. A new
   call replaces the pending timers instead of adding to them.
========================= */

let timers = []
let fontsHooked = false

export function fixScrollTriggerPositions() {
  timers.forEach(clearTimeout)
  // 700ms lands after the route transition has finished; 1600ms covers
  // slower settles (hero video metadata, late images).
  timers = [700, 1600].map((ms) => setTimeout(() => ScrollTrigger.refresh(), ms))

  if (!fontsHooked) {
    fontsHooked = true
    document.fonts?.ready?.then(() => ScrollTrigger.refresh())
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
  }
}
