import { onMounted, onBeforeUnmount } from 'vue'
import { smoothScroll } from './smoothScroll'

/* =========================
   STEPPED SCROLL — ONE GESTURE, ONE STEP
   Drives a pinned sequence (a tall track whose first child is a
   sticky, viewport-high stage) so that each scroll gesture advances
   exactly one step, no matter how hard or how long the user scrolls.

   Mapping raw scroll distance to steps doesn't work for this: a soft
   trackpad swipe doesn't reach the next threshold (feels stuck), a
   strong one or its inertia tail crosses several (steps get skipped).
   Here the gesture only decides the direction; the step itself is a
   fixed, short scroll animation, and input is ignored until it ends.

   - Wheel / trackpad: a step fires on a new gesture, told apart from
     the previous gesture's inertia tail by whether deltas are growing.
   - Touch: a swipe that starts inside the sequence moves one step.
   - Keyboard: arrows, PageUp/PageDown and space move one step.
   - Scrolling past the first / last step leaves the sequence normally.
   - Anything else (scrollbar, touch momentum) scrolls freely and the
     sequence then settles onto the nearest step once scrolling stops.
========================= */

const STEP_DURATION = 0.55
const ENTER_DURATION = 0.7
const SETTLE_DURATION = 0.45
// Pause (ms) between wheel events that marks the start of a new gesture.
const GESTURE_GAP = 200
// Wheel events are compared over these two time windows (ms) to tell a
// new push from inertia, and a push weaker than MIN_PUSH is never new.
const WHEEL_RECENT = 120
const WHEEL_WINDOW = 800
const MIN_PUSH = 4
// Finger travel (px) before a swipe counts as a step.
const SWIPE_DISTANCE = 24

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const average = (list) => list.reduce((sum, n) => sum + n, 0) / (list.length || 1)

export function useSteppedScroll(trackRef, count, active) {
  let stepping = false
  let stepTimer = null
  let settleTimer = null

  // Recent wheel events of the current gesture, as { time, size }.
  let wheelLog = []
  let lastWheelTime = 0
  // The current wheel gesture is scrolling out of the sequence.
  let exiting = false

  let touch = null

  const clampIndex = (i) => Math.min(count - 1, Math.max(0, i))

  // Read live on every use, so a late layout shift can't leave them stale.
  function metrics() {
    const track = trackRef.value
    const stage = track.firstElementChild
    const top = track.getBoundingClientRect().top + window.scrollY
    const span = track.offsetHeight - stage.offsetHeight
    return { top, end: top + span, step: span / (count - 1) }
  }

  const isInside = (m, y) => y >= m.top - 2 && y <= m.end + 2

  function goTo(index, duration = STEP_DURATION) {
    const m = metrics()
    const target = Math.round(m.top + index * m.step)
    const finish = () => {
      stepping = false
      clearTimeout(stepTimer)
    }

    // The content switches right away; the scroll position catches up.
    active.value = index
    stepping = true
    clearTimeout(settleTimer)
    clearTimeout(stepTimer)
    // Safety net in case the scroll animation is interrupted.
    stepTimer = setTimeout(finish, duration * 1000 + 250)

    const lenis = smoothScroll.lenis
    if (lenis) lenis.scrollTo(target, { duration, easing: easeInOut, lock: true, force: true, onComplete: finish })
    else window.scrollTo(0, target)
  }

  function settle() {
    if (stepping || touch?.down || !trackRef.value) return
    const m = metrics()
    const y = window.scrollY
    if (y <= m.top + 2 || y >= m.end - 2) return
    if (Math.abs(y - (m.top + active.value * m.step)) > 2) goTo(active.value, SETTLE_DURATION)
  }

  function onScroll() {
    if (!trackRef.value) return
    if (!stepping) {
      const m = metrics()
      active.value = clampIndex(Math.round((window.scrollY - m.top) / m.step))
    }
    clearTimeout(settleTimer)
    settleTimer = setTimeout(settle, 160)
  }

  function onTouch(deltaY, event, consume) {
    if (event.type === 'touchstart') {
      touch = { mode: null, travelled: 0, stepped: false, down: true }
      return true
    }
    if (!touch) return true
    if (event.type !== 'touchmove') {
      touch.down = false
      clearTimeout(settleTimer)
      settleTimer = setTimeout(settle, 160)
      return true
    }

    if (touch.mode === null) {
      const inside = isInside(metrics(), window.scrollY)
      if (!inside || !event.cancelable) touch.mode = 'pass'
      else if (!deltaY) return consume()
      else {
        // At either end, a swipe outwards scrolls away as usual.
        const next = active.value + Math.sign(deltaY)
        touch.mode = next >= 0 && next < count ? 'step' : 'pass'
      }
    }
    if (touch.mode === 'pass') return true

    touch.travelled += deltaY
    if (!touch.stepped && !stepping && Math.abs(touch.travelled) >= SWIPE_DISTANCE) {
      touch.stepped = true
      goTo(clampIndex(active.value + Math.sign(touch.travelled)))
    }
    return consume()
  }

  function intercept({ deltaX, deltaY, event }) {
    const lenis = smoothScroll.lenis
    if (!lenis || lenis.isStopped || !trackRef.value) return true

    const consume = () => {
      if (event.cancelable) event.preventDefault()
      return false
    }

    if (event.type.includes('touch')) return onTouch(deltaY, event, consume)
    if (event.ctrlKey || !deltaY || Math.abs(deltaX) > Math.abs(deltaY)) return true

    const now = performance.now()
    const size = Math.abs(deltaY)
    const startsGesture = now - lastWheelTime > GESTURE_GAP
    if (startsGesture) {
      wheelLog = []
      exiting = false
    }
    lastWheelTime = now
    wheelLog.push({ time: now, size })
    wheelLog = wheelLog.filter((entry) => now - entry.time <= WHEEL_WINDOW)
    // A trackpad's inertia tail only ever decays; a new push (or a mouse
    // wheel's steady notches) doesn't. So: are the last few events at
    // least as strong as the gesture has been lately?
    const recent = wheelLog.filter((entry) => now - entry.time <= WHEEL_RECENT)
    const sizes = (list) => list.map((entry) => entry.size)
    const isNewPush =
      startsGesture || (size >= MIN_PUSH && average(sizes(recent)) >= average(sizes(wheelLog)))

    if (stepping) return consume()
    if (exiting) return true

    const m = metrics()
    const y = window.scrollY
    const dir = deltaY > 0 ? 1 : -1

    if (!isInside(m, y)) {
      // Catch the scroll as it arrives, so it lands on the first (or
      // last) step instead of sliding somewhere into the middle.
      const target = lenis.targetScroll + deltaY
      const fromAbove = y < m.top && dir > 0 && target >= m.top
      const fromBelow = y > m.end && dir < 0 && target <= m.end
      if (!fromAbove && !fromBelow) return true
      goTo(fromAbove ? 0 : count - 1, ENTER_DURATION)
      return consume()
    }

    if (!isNewPush) return consume()

    const next = active.value + dir
    if (next < 0 || next >= count) {
      exiting = true
      return true
    }
    goTo(next)
    return consume()
  }

  function onKeydown(event) {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey || !trackRef.value) return

    let dir = 0
    if (event.key === 'ArrowDown' || event.key === 'PageDown') dir = 1
    else if (event.key === 'ArrowUp' || event.key === 'PageUp') dir = -1
    else if (event.key === ' ' && !event.target.closest?.('a, button, input, textarea, select')) dir = event.shiftKey ? -1 : 1
    if (!dir || smoothScroll.lenis?.isStopped) return

    if (!isInside(metrics(), window.scrollY)) return
    const next = active.value + dir
    if (next < 0 || next >= count) return

    event.preventDefault()
    if (!stepping) goTo(next)
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('keydown', onKeydown)
    smoothScroll.intercept = intercept
    onScroll()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    window.removeEventListener('keydown', onKeydown)
    if (smoothScroll.intercept === intercept) smoothScroll.intercept = null
    clearTimeout(stepTimer)
    clearTimeout(settleTimer)
  })

  return { goTo }
}
