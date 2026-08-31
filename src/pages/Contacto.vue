<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fixScrollTriggerPositions } from '../composables/scrollFix'
import { useReveal } from '../composables/reveal'

gsap.registerPlugin(ScrollTrigger)

useReveal()

const openFaq = ref(0)
const selectedTags = ref([])
const contactName = ref('')
const contactEmail = ref('')
const contactMessage = ref('')

const interestTags = ['Software a medida', 'Marketing digital', 'Diseño & branding', 'E-commerce', 'Automatización', 'Otro']

const faqs = [
  {
    q: '¿Cómo empieza un proyecto con Atomyko?',
    a: 'Con una llamada de descubrimiento donde entendemos tu negocio, tu audiencia y el problema real que hay que resolver. De ahí definimos alcance, tiempos y el equipo que se involucra.'
  },
  {
    q: '¿Trabajan con proyectos pequeños o solo grandes?',
    a: 'Adaptamos el equipo y el proceso al tamaño del reto. Puede ser una landing page o una plataforma completa: el nivel de cuidado es el mismo.'
  },
  {
    q: '¿Qué tecnologías usan para construir?',
    a: 'Elegimos herramientas por lo que resuelven, no por moda: Vue.js, Node.js, PostgreSQL, APIs propias e infraestructura cloud, junto a SEO, ads y analítica para el lado de crecimiento.'
  },
  {
    q: '¿Cuánto tiempo toma un proyecto típico?',
    a: 'Depende del alcance. Trabajamos por fases con entregables visibles desde las primeras semanas, en lugar de un solo lanzamiento al final.'
  },
  {
    q: '¿Dan soporte después del lanzamiento?',
    a: 'Sí. Acompañamos la etapa de crecimiento con mejoras, mantenimiento y optimización continua de marketing y producto.'
  }
]

function toggleFaq(i) {
  openFaq.value = openFaq.value === i ? -1 : i
}

function toggleTag(tag) {
  const i = selectedTags.value.indexOf(tag)
  if (i === -1) selectedTags.value.push(tag)
  else selectedTags.value.splice(i, 1)
}

function submitContact() {
  const subject = `Nuevo proyecto: ${contactName.value || 'Sin nombre'}`
  const lines = [
    selectedTags.value.length ? `Interés: ${selectedTags.value.join(', ')}` : '',
    contactEmail.value ? `Email: ${contactEmail.value}` : '',
    '',
    contactMessage.value
  ].filter(Boolean)
  const body = lines.join('\n')
  window.location.href = `mailto:hola@atomyko.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

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
      <div class="eyebrow reveal-up">PREGUNTAS FRECUENTES</div>
      <h1 class="reveal-mask">
        <span class="mask-line"><span class="mask-line-inner">Dudas resueltas,</span></span>
        <span class="mask-line"><span class="mask-line-inner">antes de empezar.</span></span>
      </h1>
    </section>

    <section class="section" style="padding-top: 0;">
      <div class="faq-list">
        <div
          v-for="(item, i) in faqs"
          :key="item.q"
          class="faq-item reveal-up"
          :class="{ '-open': openFaq === i }"
        >
          <button class="faq-q" @click="toggleFaq(i)">
            {{ item.q }}
            <span class="faq-toggle">+</span>
          </button>
          <div class="faq-a-wrap">
            <div class="faq-a-inner">
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================
         CONTACTO
    ========================== -->

    <section class="contact">
      <div class="contact-grid"></div>
      <div class="contact-beam"></div>

      <div class="eyebrow contact-eyebrow on-dark reveal-up">HABLEMOS</div>

      <h2 class="reveal-mask">
        <span class="mask-line"><span class="mask-line-inner">Tu próximo gran proyecto</span></span>
        <span class="mask-line"><span class="mask-line-inner">empieza aquí.</span></span>
      </h2>

      <p class="reveal-up">
        Cuéntanos qué quieres construir. Nosotros ponemos estrategia,
        diseño, código y crecimiento.
      </p>

      <form class="contact-form reveal-up" @submit.prevent="submitContact">
        <div class="contact-form-label">¿Qué necesitas?</div>
        <div class="contact-tags">
          <button
            v-for="tag in interestTags"
            :key="tag"
            type="button"
            class="contact-tag"
            :class="{ '-active': selectedTags.includes(tag) }"
            @click="toggleTag(tag)"
          >
            {{ tag }}
          </button>
        </div>

        <div class="contact-fields">
          <input v-model="contactName" class="contact-input" type="text" placeholder="Tu nombre" />
          <input v-model="contactEmail" class="contact-input" type="email" placeholder="Tu email" required />
        </div>

        <div class="contact-fields -full">
          <textarea v-model="contactMessage" class="contact-textarea" placeholder="Cuéntanos brevemente tu proyecto..."></textarea>
        </div>

        <button type="submit" class="contact-submit">
          Enviar mensaje <b>↗</b>
        </button>
      </form>

      <a class="contact-button reveal-up" href="mailto:hola@atomyko.com" style="margin-top: 22px;">
        o escríbenos directo a hola@atomyko.com
      </a>
    </section>

  </main>
</template>
