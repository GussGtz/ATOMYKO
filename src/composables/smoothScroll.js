/* =========================
   SHARED SMOOTH-SCROLL HANDLE
   App.vue owns the Lenis instance; pages reach it through here.

   `intercept` lets a page take over wheel / touch input before Lenis
   turns it into scrolling (see the stepped services sequence in
   Servicios.vue). It receives Lenis' virtual-scroll data
   ({ deltaX, deltaY, event }) and returns false when it has handled
   the input itself, true to let Lenis scroll as usual.
========================= */

export const smoothScroll = {
  lenis: null,
  intercept: null
}
