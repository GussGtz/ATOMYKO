<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { appReady, pageShown } from './composables/appReady'
import { fixScrollTriggerPositions } from './composables/scrollFix'
import { smoothScroll } from './composables/smoothScroll'
import brandIcon from './assets/atomyko-icon-color.png'
import brandIconOnDark from './assets/atomyko-icon-color-onDark.png'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()
const router = useRouter()

/* =========================
   STATE
========================= */

const menuOpen = ref(false)
const scrolled = ref(false)
const loading = ref(true)
const loadCount = ref(0)

let lenis = null

const navItems = [
  { path: '/', name: 'inicio', label: 'Inicio' },
  { path: '/servicios', name: 'servicios', label: 'Servicios' },
  { path: '/proyectos', name: 'proyectos', label: 'Proyectos' },
  { path: '/proceso', name: 'proceso', label: 'Proceso' },
  { path: '/contacto', name: 'contacto', label: 'Contacto' }
]

/* =========================
   HELPERS
========================= */

function closeMenu() {
  menuOpen.value = false
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function handleScroll() {
  scrolled.value = window.scrollY > 40
}

/* =========================
   PAGE TRANSITION
========================= */

// The curtain fully covers the screen before the old page is swapped
// out, and only lifts once the new one has mounted and settled. All
// the heavy work of a route change (unmount, mount, scroll reset,
// ScrollTrigger measuring) happens while nothing is visible, instead
// of landing in the middle of the animation.

let transitionId = 0

// Runs cb after n GSAP ticks. Unlike requestAnimationFrame this keeps
// going in a background tab, so a transition can't get stuck half-way.
function afterTicks(n, cb) {
  const tick = () => {
    if (--n > 0) return
    gsap.ticker.remove(tick)
    cb()
  }
  gsap.ticker.add(tick)
}

function onPageLeave(el, done) {
  transitionId++
  pageShown.value = false
  lenis?.stop()

  gsap.killTweensOf([el, '.page-curtain'])
  gsap.set('.page-curtain', { transformOrigin: 'bottom' })
  gsap.to(el, { opacity: 0, y: -16, duration: .35, ease: 'power2.in' })
  gsap.to('.page-curtain', { scaleY: 1, duration: .5, ease: 'power3.inOut', onComplete: done })
}

function onPageEnter(el, done) {
  const id = ++transitionId

  gsap.set(el, { opacity: 0 })
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  window.scrollTo(0, 0)

  // Give the freshly mounted page two frames to lay out and paint
  // under the curtain before anything starts moving.
  afterTicks(2, () => {
    if (id !== transitionId) return

    ScrollTrigger.refresh()
    lenis?.start()

    // The curtain leaves upwards, so the top of the page is uncovered
    // last — entrance animations wait until it's mostly out of the way.
    gsap.delayedCall(.3, () => {
      if (id === transitionId) pageShown.value = true
    })

    gsap.killTweensOf('.page-curtain')
    gsap.set('.page-curtain', { transformOrigin: 'top' })
    gsap.to('.page-curtain', { scaleY: 0, duration: .55, ease: 'power3.inOut' })
    gsap.fromTo(
      el,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: .55, ease: 'power3.out', delay: .12, clearProps: 'transform,opacity', onComplete: done }
    )
  })

  fixScrollTriggerPositions()
}

watch(
  () => route.fullPath,
  () => {
    closeMenu()
    // The hovered link that triggered navigation is often removed
    // from the DOM by the route swap before a real mouseout fires,
    // which would otherwise leave the custom cursor stuck enlarged.
    document.querySelector('.cursor-ring')?.classList.remove('-hover')
  }
)

/* =========================
   LIFECYCLE
========================= */

onMounted(async () => {
  window.addEventListener('scroll', handleScroll, { passive: true })

  // Scroll is reset by the page transition, under the curtain. Left
  // on "auto", back/forward would jump the outgoing page first.
  history.scrollRestoration = 'manual'

  /* ---- LENIS SMOOTH SCROLL ---- */
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    virtualScroll: (data) => (smoothScroll.intercept ? smoothScroll.intercept(data) : true)
  })
  smoothScroll.lenis = lenis
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  /* ---- CURSOR ---- */
  const dotX = gsap.quickTo('.cursor-dot', 'x', { duration: .05, ease: 'none' })
  const dotY = gsap.quickTo('.cursor-dot', 'y', { duration: .05, ease: 'none' })
  const ringX = gsap.quickTo('.cursor-ring', 'x', { duration: .35, ease: 'power3.out' })
  const ringY = gsap.quickTo('.cursor-ring', 'y', { duration: .35, ease: 'power3.out' })

  function onMove(e) {
    dotX(e.clientX)
    dotY(e.clientY)
    ringX(e.clientX)
    ringY(e.clientY)
  }
  window.addEventListener('mousemove', onMove)

  function onOver(e) {
    if (e.target.closest('a, button, .-cursor-hover')) {
      document.querySelector('.cursor-ring')?.classList.add('-hover')
    }
  }
  function onOut(e) {
    if (e.target.closest('a, button, .-cursor-hover')) {
      document.querySelector('.cursor-ring')?.classList.remove('-hover')
    }
  }
  window.addEventListener('mouseover', onOver)
  window.addEventListener('mouseout', onOut)

  /* ---- PRELOADER ---- */
  document.body.style.overflow = 'hidden'

  const loadTl = gsap.timeline({
    onUpdate() {
      loadCount.value = Math.round(loadTl.progress() * 100)
    },
    onComplete() {
      loading.value = false
      document.body.style.overflow = ''
      appReady.value = true
    }
  })
  loadTl.to({}, { duration: 1.9 })

  await nextTick()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  ScrollTrigger.getAll().forEach((t) => t.kill())
  lenis?.destroy()
  smoothScroll.lenis = null
})
</script>

<template>
  <div class="app">

    <!-- =========================
         PRELOADER
    ========================== -->

    <div v-if="loading" class="preloader">
      <div class="preloader-logo">
        <img :src="brandIconOnDark" alt="" class="preloader-logo-base" />
        <div class="preloader-logo-fill" :style="{ height: loadCount + '%' }">
          <img :src="brandIconOnDark" alt="" class="preloader-logo-fill-img" />
        </div>
      </div>
      <div class="preloader-label">ATOMYKO</div>
    </div>

    <!-- =========================
         PAGE TRANSITION CURTAIN
    ========================== -->

    <div class="page-curtain"></div>

    <!-- =========================
         CURSOR
    ========================== -->

    <div class="cursor-ring"></div>
    <div class="cursor-dot"></div>

    <!-- =========================
         NAVBAR
    ========================== -->

    <header class="navbar" :class="{ compact: scrolled }">
      <router-link to="/" class="brand">
        <img :src="brandIcon" alt="" class="brand-icon" />
        <span class="brand-word">atomyk<span class="brand-accent">o</span></span>
      </router-link>

      <div class="desktop-nav">
        <nav class="nav-links">
          <router-link
            v-for="item in navItems.slice(0, 4)"
            :key="item.path"
            :to="item.path"
            :class="{ '-active': route.name === item.name }"
          >
            {{ item.label }}
          </router-link>
        </nav>

        <router-link to="/contacto" class="nav-cta">
          Hablemos <b>↗</b>
        </router-link>
      </div>

      <button
        class="menu-toggle"
        :class="{ '-open': menuOpen }"
        aria-label="Abrir navegación"
        @click="toggleMenu"
      >
        <i></i><i></i><i></i>
      </button>
    </header>

    <!-- =========================
         FULLSCREEN MENU
    ========================== -->

    <div v-if="menuOpen" class="menu-overlay">
      <nav class="menu-links">
        <router-link
          v-for="(item, i) in navItems"
          :key="item.path"
          :to="item.path"
          :class="{ '-active': route.name === item.name }"
        >
          <small>{{ String(i + 1).padStart(2, '0') }}</small>{{ item.label }}
        </router-link>
      </nav>

      <div class="menu-foot">
        <a href="mailto:hola@atomyko.com">hola@atomyko.com</a>
        <span>© 2026 ATOMYKO</span>
      </div>
    </div>

    <!-- =========================
         SIDE NAV
    ========================== -->

    <nav class="side-nav">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        :data-label="item.label"
        :class="{ '-active': route.name === item.name }"
        :aria-label="item.label"
      ></router-link>
    </nav>

    <!-- =========================
         PAGE CONTENT
    ========================== -->

    <router-view v-slot="{ Component }">
      <transition :css="false" mode="out-in" @leave="onPageLeave" @enter="onPageEnter">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>

    <!-- =========================
         FOOTER
    ========================== -->

    <footer>
      <div class="footer-top">
        <div class="footer-brand">
          <router-link to="/" class="brand">
            <img :src="brandIconOnDark" alt="" class="brand-icon" />
            <span class="brand-word">atomyk<span class="brand-accent">o</span></span>
          </router-link>
          <p>Software y marketing digital para empresas que quieren marcar el ritmo, no seguirlo.</p>
        </div>

        <div class="footer-cols">
          <div class="footer-col">
            <h4>Navegación</h4>
            <ul>
              <li v-for="item in navItems.slice(1)" :key="item.path">
                <router-link :to="item.path">{{ item.label }}</router-link>
              </li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Contacto</h4>
            <ul>
              <li><a href="mailto:hola@atomyko.com">hola@atomyko.com</a></li>
              <li><span>México / Worldwide</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© 2026 ATOMYKO · SOFTWARE · MARKETING · DESIGN</span>
        <router-link class="back-top" to="/">Inicio ↑</router-link>
      </div>

      <div class="footer-watermark">ATOMYKO</div>
    </footer>

  </div>
</template>
