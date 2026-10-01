import { ref, watch } from 'vue'

/* =========================
   SHARED "APP READY" FLAG
   Pages watch this to know when the
   boot preloader has finished, so their
   own entrance animation starts at the
   right moment (on first load) or runs
   immediately (when navigated to later).
========================= */

export const appReady = ref(false)

export function onAppReady(cb) {
  if (appReady.value) {
    cb()
    return
  }
  const stop = watch(appReady, (v) => {
    if (v) {
      cb()
      stop()
    }
  })
}

/* =========================
   "PAGE SHOWN" FLAG
   False while the route-transition curtain covers the screen.
   A page mounts underneath the curtain, so entrance animations
   started at mount time would play (partly or entirely) unseen.
   onPageShown waits for both the preloader and the curtain, and
   returns a function that cancels the wait (call it on unmount).
========================= */

export const pageShown = ref(true)

export function onPageShown(cb) {
  if (appReady.value && pageShown.value) {
    cb()
    return () => {}
  }
  const stop = watch([appReady, pageShown], ([ready, shown]) => {
    if (ready && shown) {
      stop()
      cb()
    }
  })
  return stop
}
