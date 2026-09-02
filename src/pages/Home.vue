<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onAppReady } from '../composables/appReady'
import { fixScrollTriggerPositions } from '../composables/scrollFix'
import { useReveal } from '../composables/reveal'
import heroVideo from '../assets/hero-video.mp4'
import correCancunLogo from '../assets/clients/corre-cancun.png'
import gcsLogo from '../assets/clients/gcs-asociados-light.png'
import cwcLogo from '../assets/clients/cancun-world-class.png'
import jugarLaPelotaLogo from '../assets/clients/jugarlapelota.png'
import glassCaribeLogo from '../assets/clients/glass-caribe.svg'
import WorkShowcase from '../components/WorkShowcase.vue'

gsap.registerPlugin(ScrollTrigger)

useReveal()

const serviceTeasers = [
  {
    number: '01',
    title: 'Desarrollo de Software',
    text: 'Plataformas, sistemas y aplicaciones a medida diseñadas para resolver problemas reales y escalar contigo.',
    accent: 'var(--c-blue)',
    shape: 'bars'
  },
  {
    number: '02',
    title: 'Marketing Digital',
    text: 'Estrategia, contenido, campañas y adquisición para convertir atención en clientes y crecimiento.',
    accent: 'var(--c-violet)',
    shape: 'chevron'
  },
  {
    number: '03',
    title: 'Diseño & Branding',
    text: 'Identidades y experiencias digitales que hacen que una empresa se vea tan buena como realmente es.',
    accent: 'var(--c-amber)',
    shape: 'arcs'
  }
]

// Continuous 0-1 "how open" value per row, recalculated on every
// scroll tick — driven purely by scroll position, never the cursor.
// Each row peaks fully open exactly at its own point in the track
// and fades out smoothly as the next one takes over. Row 0 starts
// open since the section loads showing its first item.
const teaserOpen = ref(serviceTeasers.map((_, i) => (i === 0 ? 1 : 0)))

const stack = ['VUE.JS', 'JAVASCRIPT', 'NODE.JS', 'POSTGRESQL', 'API', 'CLOUD', 'SEO', 'ADS', 'ANALYTICS']

// Real clients only.
const logoCloud = [
  // hidden: true — temporarily off at the client's request, not deleted.
  { name: 'Corre Cancún', image: correCancunLogo, alt: 'Corre Cancún — Escuela de fútbol formativo', hidden: true },
  { name: 'GCS & Asociados', image: gcsLogo, alt: 'GCS & Asociados — Contabilidad y asesoría fiscal' },
  { name: 'Cancún World Class', image: cwcLogo, alt: 'Cancún World Class — Traslados privados desde el Aeropuerto de Cancún' },
  { name: 'JugarLaPelota', image: jugarLaPelotaLogo, alt: 'JugarLaPelota — Plataforma web para la gestión de torneos deportivos' },
  { name: 'Glass Caribe', image: glassCaribeLogo, alt: 'Glass Caribe' }
]

// No invented quotes — these placeholders sit here honestly until
// each client actually gives Atomyko a testimonial to publish.
const PENDING_TESTIMONIAL = 'Testimonio pendiente — lo agregamos en cuanto nos lo compartan.'
const testimonials = [
  // hidden: true — temporarily off at the client's request, not deleted.
  {
    name: 'Corre Cancún',
    logo: correCancunLogo,
    text: 'Desde el primer momento, Atomyko entendió lo que queríamos transmitir como equipo y logró llevarlo a un sitio web moderno, atractivo y diferente, que realmente nos distingue de otros equipos formativos en Cancún.',
    rotate: -7,
    x: -60,
    y: 50,
    hidden: true
  },
  {
    name: 'GCS & Asociados',
    logo: gcsLogo,
    text: 'Quedé muy satisfecho con el trabajo de Atomyko. Desde el principio entendieron lo que buscaba y fueron adaptando el diseño hasta llegar al resultado que quería. El sitio quedó moderno, profesional y mucho mejor de lo que tenía pensado.',
    rotate: 6,
    x: 55,
    y: -55
  },
  { name: 'Cancún World Class', logo: cwcLogo, text: PENDING_TESTIMONIAL, rotate: -5, x: 65, y: 45 },
  {
    name: 'JugarLaPelota',
    logo: jugarLaPelotaLogo,
    text: 'Estamos muy agradecidos con Atomyko por el trabajo que realizaron. Lograron entender nuestra visión y convertirla en una plataforma que va más allá de lo que existe en el mercado. El resultado superó nuestras expectativas.',
    rotate: 9,
    x: -70,
    y: -35
  },
  {
    name: 'Glass Caribe',
    logo: glassCaribeLogo,
    text: 'Llevamos tiempo trabajando con Atomyko y hemos desarrollado dos proyectos juntos, digitalizando prácticamente toda nuestra operación con una plataforma web y una app móvil. Su trabajo nos ha ayudado a ser mucho más eficientes.',
    rotate: -10,
    x: 45,
    y: 60
  }
]

const visibleLogoCloud = computed(() => logoCloud.filter((l) => !l.hidden))
const visibleTestimonials = computed(() => testimonials.filter((t) => !t.hidden))

const whyIconPaths = {
  star: 'M32 8 L38.2 24.8 L56 26 L42.4 37.2 L46.8 54.4 L32 44.6 L17.2 54.4 L21.6 37.2 L8 26 L25.8 24.8 Z',
  grid: 'M10 10h18v18h-18z M36 10h18v18h-18z M10 36h18v18h-18z M36 36h18v18h-18z',
  heart: 'M32 54C32 54 10 40 10 24C10 15 17 9 25 9C28.5 9 31 11 32 14C33 11 35.5 9 39 9C47 9 54 15 54 24C54 40 32 54 32 54Z',
  layers: 'M32 8 L58 22 L32 36 L6 22 Z M6 34 L32 48 L58 34 M6 46 L32 60 L58 46',
  bars: 'M14 46h10v-14h-10z M27 46h10v-24h-10z M40 46h10v-34h-10z'
}

// Honest, non-numeric claims only — no invented years-of-experience or
// project counts for a brand this new. Real facts or qualitative
// statements, never fabricated stats.
const whyCards = [
  { icon: 'star', text: 'Atención personalizada en cada proyecto, sin perdernos entre cuentas grandes.' },
  { icon: 'grid', text: 'Clientes de distintos giros — deporte, contabilidad, transporte, tecnología — ya confían en nosotros.' },
  { icon: 'heart', text: 'Construimos relaciones de largo plazo, no proyectos de una sola vez.' },
  { icon: 'layers', text: 'Estrategia, diseño y desarrollo bajo un mismo equipo, sin intermediarios.' },
  { icon: 'bars', text: 'Medimos el éxito en resultados reales para tu negocio, no solo en entregables bonitos.' }
]

// 0 = scattered/overlapping like a dropped hand of cards, 1 = settled
// into the grid — driven continuously by scroll position as the
// section enters view, never a one-shot trigger.
const testimonialScatter = ref(1)

let ctx
let onVisible = null

onMounted(() => {
  ctx = gsap.context(() => {
    onAppReady(runHeroIntro)

    // Some browsers pause background-tab video playback even with
    // autoplay/loop set. Nudge it back into motion once the tab
    // (or this preview pane) becomes visible again.
    onVisible = () => {
      if (!document.hidden) document.querySelector('.hv-video')?.play().catch(() => {})
    }
    document.addEventListener('visibilitychange', onVisible)

    const teaserCount = serviceTeasers.length

    ScrollTrigger.create({
      trigger: '.teaser-scroll',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate(self) {
        // p walks 0 → (count - 1), landing exactly on each row's
        // index as its turn to be open comes up.
        const p = self.progress * (teaserCount - 1)
        teaserOpen.value = serviceTeasers.map((_, i) => Math.max(0, 1 - Math.abs(p - i)))
      }
    })

    ScrollTrigger.create({
      trigger: '.testimonials-grid',
      start: 'top 95%',
      end: 'top 35%',
      scrub: true,
      onUpdate(self) {
        testimonialScatter.value = 1 - self.progress
      }
    })

    // Web fonts and the hero video can reflow the page after this
    // component measured its ScrollTrigger positions, which would
    // otherwise leave every trigger below the hero slightly (or
    // completely) misaligned. Re-measure once everything settles.
    fixScrollTriggerPositions()

    gsap.to('.marquee-track', { xPercent: -50, duration: 26, ease: 'none', repeat: -1 })
    gsap.to('.stack-track.-forward', { xPercent: -50, duration: 30, ease: 'none', repeat: -1 })
    gsap.to('.stack-track.-reverse', { xPercent: 50, x: '-50%', duration: 34, ease: 'none', repeat: -1 })
  })
})

onBeforeUnmount(() => {
  ctx?.revert()
  if (onVisible) document.removeEventListener('visibilitychange', onVisible)
})

const heroIntroTargets = ['.hero-eyebrow', '.hero-title .mask-line-inner', '.hero-desc', '.hero-actions', '.hero-visual']

function revealHero() {
  gsap.set(heroIntroTargets, { clearProps: 'all' })
}

function runHeroIntro() {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, onComplete: revealHero })

  tl.from('.hero-eyebrow', { y: 20, opacity: 0, duration: .6 })
    .from('.hero-title .mask-line-inner', { yPercent: 110, opacity: 0, stagger: .1, duration: 1 }, '-=.3')
    .from('.hero-desc', { y: 18, opacity: 0, duration: .6 }, '-=.5')
    .from('.hero-actions', { y: 16, opacity: 0, duration: .55 }, '-=.45')
    .from('.hero-visual', { y: 40, opacity: 0, duration: 1 }, '-=.4')

  setTimeout(revealHero, 3800)
}
</script>

<template>
  <main>

    <!-- =========================
         HERO
    ========================== -->

    <section class="hero">

      <div class="eyebrow hero-eyebrow">SOFTWARE + MARKETING DIGITAL / 2026</div>

      <h1 class="hero-title">
        <span class="mask-line"><span class="mask-line-inner">Ideas que se convierten</span></span>
        <span class="mask-line"><span class="mask-line-inner">en impacto.</span></span>
      </h1>

      <p class="hero-desc">
        Construimos software, marcas y estrategias digitales para empresas que quieren
        dejar de seguir tendencias y empezar a marcar el ritmo.
      </p>

      <div class="hero-actions">
        <router-link to="/contacto" class="hero-button">
          Iniciar un proyecto <b>↗</b>
        </router-link>
      </div>

      <div class="hero-visual">
        <video
          class="hv-video"
          :src="heroVideo"
          autoplay
          muted
          loop
          playsinline
        ></video>

        <div class="hv-video-fade"></div>

        <div class="hv-corner -tl">ATOMYKO / DIGITAL SYSTEM</div>
        <div class="hv-corner -br">MX / WORLDWIDE</div>
      </div>

      <div class="scroll-cue">SCROLL PARA EXPLORAR ↓</div>

    </section>

    <!-- =========================
         MARQUEE
    ========================== -->

    <section class="marquee-section" aria-hidden="true">
      <div class="marquee-track">
        <span>SOFTWARE</span><b>✦</b>
        <span>MARKETING</span><b>✦</b>
        <span>DISEÑO</span><b>✦</b>
        <span>GROWTH</span><b>✦</b>
        <span>INNOVACIÓN</span><b>✦</b>
        <span>SOFTWARE</span><b>✦</b>
        <span>MARKETING</span><b>✦</b>
        <span>DISEÑO</span><b>✦</b>
        <span>GROWTH</span><b>✦</b>
        <span>INNOVACIÓN</span><b>✦</b>
      </div>
    </section>

    <!-- =========================
         MANIFESTO
    ========================== -->

    <section class="manifesto section">
      <div class="blob-field">
        <span class="blob -a -blue"></span>
        <span class="blob -b -violet"></span>
      </div>

      <div class="eyebrow reveal-up">ATOMYKO</div>

      <p class="reveal-mask">
        <span class="mask-line"><span class="mask-line-inner">No somos una agencia más. Unimos <strong>desarrollo de software</strong></span></span>
        <span class="mask-line"><span class="mask-line-inner">y <strong>marketing digital</strong> en un mismo equipo para que estrategia,</span></span>
        <span class="mask-line"><span class="mask-line-inner">producto y crecimiento trabajen en la misma dirección.</span></span>
      </p>
    </section>

    <!-- =========================
         LOGO CLOUD
    ========================== -->

    <!-- Real client logos only — no invented/placeholder brands. -->
    <section class="section logo-cloud-section">
      <div class="eyebrow reveal-up" style="justify-content: center;">EMPRESAS QUE CONFÍAN</div>

      <div
        class="logo-cloud"
        v-if="visibleLogoCloud.length"
        :style="{ '--logo-count': visibleLogoCloud.length }"
      >
        <div v-for="logo in visibleLogoCloud" :key="logo.name" class="logo-cloud-item">
          <img :src="logo.image" :alt="logo.alt" />
        </div>
      </div>
    </section>

    <!-- =========================
         TRABAJO DESTACADO
    ========================== -->

    <WorkShowcase />

    <!-- =========================
         SERVICIOS — TEASER
    ========================== -->

    <section class="section">
      <div class="section-head">
        <div>
          <div class="eyebrow reveal-up">LO QUE HACEMOS</div>
          <h2 class="reveal-mask">
            <span class="mask-line"><span class="mask-line-inner">Una idea.</span></span>
            <span class="mask-line"><span class="mask-line-inner">Todo el stack.</span></span>
          </h2>
        </div>
        <router-link to="/servicios" class="section-link reveal-up">
          Ver todos los servicios <b>↗</b>
        </router-link>
      </div>

      <div class="teaser-scroll" :style="{ height: serviceTeasers.length * 60 + 'vh' }">
        <div class="teaser-scroll-inner">
          <router-link
            v-for="(s, i) in serviceTeasers"
            :key="s.number"
            to="/servicios"
            class="teaser-row -cursor-hover"
            :style="{ '--accent': s.accent, '--open': teaserOpen[i] }"
          >
            <div class="teaser-row-fill"></div>

            <div class="teaser-row-glow">
              <div class="shape-stack" :class="'-' + s.shape">
                <i></i><i></i><i></i><i></i><i></i>
              </div>
            </div>

            <div class="teaser-row-head">
              <span class="teaser-row-title">{{ s.title }}</span>
              <span class="index-tag">{{ s.number }}</span>
            </div>

            <div class="teaser-row-body">
              <p>{{ s.text }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- =========================
         TESTIMONIOS — SE ACOMODAN CON EL SCROLL
    ========================== -->

    <section class="section testimonials-section" style="background: var(--paper);">
      <div class="section-head">
        <div>
          <div class="eyebrow reveal-up">CLIENTES</div>
          <h2 class="reveal-mask">
            <span class="mask-line"><span class="mask-line-inner">Confiable por</span></span>
            <span class="mask-line"><span class="mask-line-inner">nuestra clientela.</span></span>
          </h2>
        </div>
      </div>

      <div
        class="testimonials-grid"
        :style="{ '--scatter': testimonialScatter }"
      >
        <article
          v-for="t in visibleTestimonials"
          :key="t.name"
          class="testimonial-card"
          :style="{ '--sr': t.rotate + 'deg', '--sx': t.x + 'px', '--sy': t.y + 'px' }"
        >
          <span class="testimonial-quote">&ldquo;</span>
          <p>{{ t.text }}</p>
          <div class="testimonial-divider"></div>
          <img :src="t.logo" :alt="t.name" class="testimonial-logo" />
        </article>
      </div>
    </section>

    <!-- =========================
         POR QUÉ ATOMYKO
    ========================== -->

    <section class="section why-section">
      <div class="why-head">
        <div class="eyebrow reveal-up">POR QUÉ ATOMYKO</div>
        <p class="reveal-up">
          No somos una agencia más entre muchas. Trabajamos con pocos clientes a la vez
          para poder dedicarle a cada proyecto la atención que merece, desde la estrategia
          hasta el código que lo sostiene.
        </p>
      </div>

      <div class="why-grid">
        <div
          v-for="card in whyCards"
          :key="card.text"
          class="why-card reveal-up"
        >
          <div class="why-card-icon">
            <svg viewBox="0 0 64 64" fill="none"><path :d="whyIconPaths[card.icon]" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </div>
          <p class="why-card-text">{{ card.text }}</p>
        </div>
      </div>
    </section>

    <!-- =========================
         STACK
    ========================== -->

    <section class="section stack-section">
      <div class="stack-head">
        <div class="eyebrow reveal-up" style="justify-content: center;">NUESTRO STACK</div>
        <h2 class="reveal-up">Herramientas para avanzar.</h2>
        <p class="reveal-up">Elegimos tecnología por lo que puede hacer por tu negocio, no por moda.</p>
      </div>

      <div class="stack-marquee">
        <div class="stack-track -forward">
          <span v-for="item in [...stack, ...stack]" :key="'a' + item + Math.random()" class="stack-pill">{{ item }}</span>
        </div>
        <div class="stack-track -reverse">
          <span v-for="item in [...stack, ...stack].reverse()" :key="'b' + item + Math.random()" class="stack-pill">{{ item }}</span>
        </div>
      </div>
    </section>

    <!-- =========================
         CTA TEASER
    ========================== -->

    <section class="contact idea-cta" style="padding: 170px var(--container);">
      <div class="idea-cta-beam"></div>

      <router-link to="/contacto" class="idea-cta-link -cursor-hover">
        <h2 class="reveal-mask" style="font-size: clamp(2.2rem, 5.6vw, 5rem);">
          <span class="mask-line"><span class="mask-line-inner">¿Tienes una idea?</span></span>
          <span class="mask-line"><span class="mask-line-inner idea-cta-underline">Cuéntanosla</span></span>
        </h2>
      </router-link>
    </section>

  </main>
</template>
