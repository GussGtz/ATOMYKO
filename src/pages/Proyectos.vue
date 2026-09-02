<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fixScrollTriggerPositions } from '../composables/scrollFix'
import { useReveal } from '../composables/reveal'
import gcsProjectVideo from '../assets/gcs-project.mp4'

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
    category: 'CONTABILIDAD / WEB',
    title: 'Confianza contable, en un sitio claro.',
    text: 'Diseñamos y desarrollamos desde cero el sitio de GCS y Asociados: una presencia digital moderna que transmite la seriedad de un despacho contable desde el primer scroll, con un recorrido pensado para convertir visitas en consultas agendadas.',
    checkText: 'Otro cliente satisfecho',
    accent: 'var(--c-amber)',
    video: gcsProjectVideo
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
          <div class="project-art" :class="{ '-video': project.video }">
            <video
              v-if="project.video"
              class="project-video"
              :src="project.video"
              autoplay
              muted
              loop
              playsinline
            ></video>

            <div v-else class="project-browser">
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
            <p v-if="project.text" class="project-text">{{ project.text }}</p>

            <div v-if="project.checkText" class="project-check">
              <svg viewBox="0 0 64 64" fill="none"><path d="M14 34 L28 48 L52 18" stroke-linecap="round" stroke-linejoin="round" /></svg>
              <span>{{ project.checkText }}</span>
            </div>

            <div v-else class="project-result">
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
