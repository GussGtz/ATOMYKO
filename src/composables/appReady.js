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
