<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fixScrollTriggerPositions } from '../composables/scrollFix'
import { useReveal } from '../composables/reveal'
import spotlightVideo from '../assets/servicios-bg.mp4'
import introVideo from '../assets/servicios-intro.mp4'
import ServiceCapabilities from '../components/ServiceCapabilities.vue'

gsap.registerPlugin(ScrollTrigger)

useReveal()

const activeService = ref(0)

const services = [
  {
    number: '01',
    title: 'Desarrollo Web',
    text: 'Sitios corporativos, landing pages, tiendas en línea y plataformas administrables. Sitios que no solo se ven bien, sino que resuelven un objetivo de negocio concreto.',
    accent: 'var(--c-blue)'
  },
  {
    number: '02',
    title: 'Desarrollo de Software',
    text: 'ERP, CRM y sistemas empresariales a la medida, diseñados para resolver problemas reales y escalar contigo. Arquitectura pensada desde el día uno para crecer sin reescrituras.',
    accent: 'var(--c-violet)'
  },
  {
    number: '03',
    title: 'Aplicaciones',
    text: 'Apps para Android, iOS y PWA que conectan tu operación con tus clientes y tu equipo, dentro de un mismo ecosistema con tu software y tu sitio web.',
    accent: 'var(--c-pink)'
  },
  {
    number: '04',
    title: 'Automatización',
    text: 'Digitalizamos procesos manuales, conectamos sistemas y generamos reportes en tiempo real, para que la información fluya sola en vez de vivir en hojas de cálculo.',
    accent: 'var(--c-amber)'
  },
  {
    number: '05',
    title: 'Marketing & Branding',
    text: 'Identidad de marca, contenido, redes sociales y publicidad digital pensados para convertir atención en clientes, no solo en alcance.',
    accent: 'var(--c-green)'
  },
  {
    number: '06',
    title: 'IA & Tecnología',
    text: 'Chatbots, asistentes con IA e integraciones con las herramientas que ya usas — WhatsApp, Stripe, sistemas de facturación — para automatizar lo repetitivo.',
    accent: 'var(--c-blue)'
  }
]

let ctx

onMounted(() => {
  ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: '.spotlight-track',
      start: 'top top',
      end: 'bottom bottom',
      pin: '.spotlight-stage',
      scrub: .4,
      onUpdate(self) {
        const idx = Math.min(services.length - 1, Math.floor(self.progress * services.length))
        activeService.value = idx
      }
    })

    fixScrollTriggerPositions()
  }, '.servicios-page')
})

onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <main class="servicios-page">

    <!-- =========================
         PAGE HEAD
    ========================== -->

    <section class="page-head">
      <div class="eyebrow reveal-up">SERVICIOS</div>
      <h1 class="reveal-mask">
        <span class="mask-line"><span class="mask-line-inner">Una idea.</span></span>
        <span class="mask-line"><span class="mask-line-inner">Todo el stack.</span></span>
      </h1>
      <p class="reveal-up">
        Del primer concepto al usuario final. Diseñamos, construimos
        y hacemos crecer productos digitales bajo un mismo equipo.
      </p>
    </section>

    <!-- =========================
         SPOTLIGHT SEQUENCE
    ========================== -->

    <section class="spotlight-track" :style="{ height: services.length * 100 + 'vh' }">
      <div class="spotlight-stage">

        <div class="spotlight-head">
          <div class="eyebrow on-dark">LO QUE HACEMOS</div>
          <div class="spotlight-count"><b>{{ String(activeService + 1).padStart(2, '0') }}</b> / {{ String(services.length).padStart(2, '0') }}</div>
        </div>

        <div class="spotlight-media">
          <video
            class="spotlight-media-video"
            :src="spotlightVideo"
            autoplay
            muted
            loop
            playsinline
          ></video>
          <div class="spotlight-media-fade"></div>
        </div>

        <router-link
          v-for="(service, i) in services"
          :key="service.number"
          to="/contacto"
          class="spotlight-panel -cursor-hover"
          :class="{ '-active': activeService === i }"
        >
          <span class="index-tag">{{ service.number }} / {{ service.title.toUpperCase() }}</span>
          <h3>{{ service.title }}</h3>
          <p>{{ service.text }}</p>
        </router-link>

        <div class="spotlight-dots">
          <span
            v-for="(service, i) in services"
            :key="'dot' + service.number"
            :class="{ '-active': activeService === i }"
          ></span>
        </div>

      </div>
    </section>

    <ServiceCapabilities />

    <!-- =========================
         VIDEO DE MARCA
    ========================== -->

    <section class="section services-intro-section">
      <div class="eyebrow reveal-up" style="justify-content: center;">ATOMYKO</div>
      <h2 class="reveal-up">Una marca, un solo lenguaje visual.</h2>
      <div class="services-intro-video reveal-up">
        <video :src="introVideo" autoplay muted loop playsinline></video>
      </div>
    </section>

    <!-- =========================
         CTA
    ========================== -->

    <section class="section-cta reveal-up">
      <h2>¿Ya sabes qué necesitas?</h2>
      <router-link to="/contacto" class="hero-button">
        Hablemos de tu proyecto <b>↗</b>
      </router-link>
    </section>

  </main>
</template>
