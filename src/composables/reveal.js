import { onMounted, onBeforeUnmount } from 'vue'
import { onPageShown } from './appReady'

/* =========================
   SCROLL REVEALS — INTERSECTION OBSERVER
   Replaces scroll-position-based GSAP triggers for .reveal-up and
   .reveal-mask elements. A ScrollTrigger built with a "once true"
   position has to get that pixel calculation right exactly once,
   at mount time — if a web font swap or the hero video settling in
   afterwards shifts the layout even slightly, the trigger's cached
   position goes stale and the element can stay invisible forever.
   IntersectionObserver has no such cache: it always reflects the
   element's real, current position in the viewport, so there is
   nothing to go stale. Once revealed, an element is unobserved —
   these are one-time entrances, same as the old "once: true".

   Observing only starts once the page is actually on screen (after
   the preloader / route curtain), so the reveals above the fold are
   seen from their first frame instead of playing behind the curtain.
========================= */

export function useReveal(rootSelector = null) {
  let observer
  let cancelWait

  onMounted(() => {
    cancelWait = onPageShown(() => {
      const root = rootSelector ? document.querySelector(rootSelector) : document
      if (!root) return

      const targets = root.querySelectorAll('.reveal-up, .reveal-mask')
      if (!targets.length) return

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0, rootMargin: '0px 0px -12% 0px' }
      )

      targets.forEach((el) => observer.observe(el))
    })
  })

  onBeforeUnmount(() => {
    cancelWait?.()
    observer?.disconnect()
  })
}
