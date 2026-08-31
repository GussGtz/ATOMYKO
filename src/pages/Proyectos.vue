<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fixScrollTriggerPositions } from '../composables/scrollFix'
import { useReveal } from '../composables/reveal'

gsap.registerPlugin(ScrollTrigger)

useReveal()

const projects = [
  {
    index: '01',
    category: 'SAAS / PRODUCT',
    title: 'Software que simplifica operaciones.',
    metric: '+42%',
    detail: 'eficiencia operativa',
    accent: 'var(--c-blue)'
  },
  {
    index: '02',
    category: 'E-COMMERCE / GROWTH',
    title: 'Experiencias que convierten.',
    metric: '3.8×',
    detail: 'retorno de campaña',
    accent: 'var(--c-pink)'
  },
  {
    index: '03',
    category: 'BRAND / DIGITAL',
    title: 'Marcas que se hacen notar.',
    metric: '2.4M',
    detail: 'personas alcanzadas',
    accent: 'var(--c-amber)'
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
      <div class="eyebrow reveal-up">PROYECTOS</div>
      <h1 class="reveal-mask">
        <span class="mask-line"><span class="mask-line-inner">Trabajo que</span></span>
        <span class="mask-line"><span class="mask-line-inner">habla solo.</span></span>
      </h1>
      <p class="reveal-up">
        Una muestra de cómo unimos producto, marca y crecimiento
        en resultados medibles.
      </p>
    </section>

    <section class="section" style="padding-top: 0;">
      <div class="projects">
        <article
          v-for="project in projects"
          :key="project.index"
          class="project-card reveal-up"
          :style="{ '--accent': project.accent }"
        >
          <div class="project-art">
            <div class="project-browser">
              <div class="pb-bar"><i></i><i></i><i></i><span>atomyko.digital</span></div>
              <div class="pb-body">
                <div class="pb-title"></div>
                <div class="pb-grid">
                  <div class="pb-card -big"></div>
                  <div class="pb-card"></div>
                  <div class="pb-card"></div>
                </div>
                <div class="pb-chart"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
              </div>
            </div>
          </div>

          <div class="project-info">
            <div class="project-tag">{{ project.category }}</div>
            <h3>{{ project.title }}</h3>
            <div class="project-result">
              <strong>{{ project.metric }}</strong>
              <span>{{ project.detail }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="section-cta reveal-up">
      <h2>¿Tienes un reto parecido?</h2>
      <router-link to="/contacto" class="hero-button">
        Cuéntanos tu proyecto <b>↗</b>
      </router-link>
    </section>

  </main>
</template>
