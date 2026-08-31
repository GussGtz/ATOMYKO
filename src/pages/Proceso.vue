<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fixScrollTriggerPositions } from '../composables/scrollFix'
import { useReveal } from '../composables/reveal'

gsap.registerPlugin(ScrollTrigger)

useReveal()

const process = [
  ['01', 'Descubrimos', 'Entendemos tu negocio, audiencia y el problema que realmente hay que resolver.'],
  ['02', 'Diseñamos', 'Convertimos estrategia en una experiencia clara, memorable y medible.'],
  ['03', 'Construimos', 'Desarrollamos rápido, con calidad y una arquitectura lista para crecer.'],
  ['04', 'Aceleramos', 'Lanzamos, medimos y optimizamos para que el producto siga avanzando.']
]

const benefits = [
  {
    title: 'Un solo equipo',
    text: 'Estrategia, diseño y código bajo el mismo techo, sin fricción entre agencias distintas.',
    accent: 'var(--c-blue)',
    icon: 'M32 8 12 18v14c0 12 8.4 19.8 20 24 11.6-4.2 20-12 20-24V18L32 8Z'
  },
  {
    title: 'Comunicación directa',
    text: 'Hablas con quien construye, no con un intermediario que traduce tus mensajes.',
    accent: 'var(--c-violet)',
    icon: 'M10 16h44v28H24l-9 9v-9h-5V16Z'
  },
  {
    title: 'Presupuesto claro',
    text: 'Alcance y precio definidos antes de empezar, sin sorpresas a mitad de camino.',
    accent: 'var(--c-amber)',
    icon: 'M32 6v52M20 16h17a8 8 0 0 1 0 16H27a8 8 0 0 0 0 16h19'
  },
  {
    title: 'Pensado para crecer',
    text: 'Arquitectura de producto y marketing preparados para tu siguiente etapa, no solo el lanzamiento.',
    accent: 'var(--c-green)',
    icon: 'M8 46 24 30l10 10L56 16M56 16H40M56 16v16'
  }
]

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    fixScrollTriggerPositions()
  })
})

onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <main>

    <section class="page-head">
      <div class="eyebrow reveal-up">PROCESO</div>
      <h1 class="reveal-mask">
        <span class="mask-line"><span class="mask-line-inner">De la idea</span></span>
        <span class="mask-line"><span class="mask-line-inner">al impacto.</span></span>
      </h1>
      <p class="reveal-up">
        Sin burocracia innecesaria. Un proceso diseñado para avanzar
        rápido sin sacrificar calidad.
      </p>
    </section>

    <section class="section" style="padding-top: 0;">
      <div class="process-grid">
        <article v-for="item in process" :key="item[0]" class="process-card reveal-up">
          <span class="index-tag">{{ item[0] }}</span>
          <div class="process-line"></div>
          <h3>{{ item[1] }}</h3>
          <p>{{ item[2] }}</p>
          <span class="process-arrow">↗</span>
        </article>
      </div>
    </section>

    <section class="section benefits">
      <div class="section-head">
        <div>
          <div class="eyebrow reveal-up">POR QUÉ ATOMYKO</div>
          <h2 class="reveal-mask">
            <span class="mask-line"><span class="mask-line-inner">Trabajar con nosotros</span></span>
            <span class="mask-line"><span class="mask-line-inner">se siente distinto.</span></span>
          </h2>
        </div>
        <p class="reveal-up">
          Menos capas, más avance. Así es como lo hacemos posible.
        </p>
      </div>

      <div class="benefits-list">
        <div
          v-for="benefit in benefits"
          :key="benefit.title"
          class="benefit-row reveal-up"
          :style="{ '--accent': benefit.accent }"
        >
          <div class="benefit-row-icon">
            <svg viewBox="0 0 64 64" fill="none"><path :d="benefit.icon" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </div>
          <span class="benefit-row-title">{{ benefit.title }}</span>
          <span class="benefit-row-desc">{{ benefit.text }}</span>
        </div>
      </div>
    </section>

    <section class="section-cta reveal-up">
      <h2>¿Avanzamos con tu proyecto?</h2>
      <router-link to="/contacto" class="hero-button">
        Hablemos <b>↗</b>
      </router-link>
    </section>

  </main>
</template>
