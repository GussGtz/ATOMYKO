<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fixScrollTriggerPositions } from '../composables/scrollFix'
import { useReveal } from '../composables/reveal'
import apelacionesProjectVideo from '../assets/apelaciones-project.mp4'
import barberAdminVideo from '../assets/barber-admin.mp4'
import barberPublicVideo from '../assets/barber-public.mp4'
import erpProjectVideo from '../assets/erp-project.mp4'
import gcsProjectVideo from '../assets/gcs-project.mp4'
import transferPublicVideo from '../assets/transfer-public.mp4'
import transferAdminVideo from '../assets/transfer-admin.mp4'

gsap.registerPlugin(ScrollTrigger)

useReveal()

const projects = [
  {
    index: '01',
    category: 'INDUSTRIA / ERP A MEDIDA',
    title: 'De la cotización a la factura, sin salir del sistema.',
    text: 'Para una empresa dedicada a la industria del aluminio desarrollamos el ERP que opera todo su negocio: inventario por almacén con kardex, compras, producción y ventas, con cotizaciones en PDF que se envían por correo o WhatsApp y facturación CFDI 4.0 integrada. Alertas de stock en tiempo real y reportes exportables a Excel para decidir con datos, no con corazonadas.',
    metric: '5',
    detail: 'roles de usuario, cada uno con su propio nivel de acceso',
    accent: 'var(--c-green)',
    videos: [{ src: erpProjectVideo, label: 'ERP a medida' }]
  },
  {
    index: '02',
    category: 'GOBIERNO / SISTEMA A MEDIDA',
    title: 'El sistema de apelaciones del estado de Quintana Roo.',
    text: 'Para el Tribunal Superior de Justicia construimos la plataforma que concentra las apelaciones de todo el estado: registro y seguimiento de cada expediente, dashboard con indicadores en tiempo real y reportes exportables a PDF y Excel. Lo que antes vivía en hojas de cálculo ahora se consulta en segundos.',
    metric: '10,000+',
    detail: 'apelaciones al año: la capacidad para la que está diseñado',
    accent: 'var(--c-blue)',
    // Framed (not full-bleed): a dashboard loses its edges when cropped to fill.
    videos: [{ src: apelacionesProjectVideo, label: 'Sistema de apelaciones' }]
  },
  {
    index: '03',
    category: 'TRANSPORTE / CMS A MEDIDA',
    title: 'Todo su negocio, en un panel a la medida.',
    text: 'Para Transfer-Cancun construimos un sitio de reservas en 4 idiomas y un panel de administración completo: gestionan vehículos, tarifas por zona, hoteles, tours y hasta el contenido del sitio sin tocar una línea de código.',
    metric: '4',
    detail: 'idiomas disponibles en el sitio',
    accent: 'var(--c-pink)',
    videos: [
      { src: transferPublicVideo, label: 'Sitio público' },
      { src: transferAdminVideo, label: 'Panel admin' }
    ]
  },
  {
    index: '04',
    category: 'CONTABILIDAD / WEB',
    title: 'Confianza contable, en un sitio claro.',
    text: 'Diseñamos y desarrollamos desde cero el sitio de un despacho contable: una presencia digital moderna que transmite la seriedad de la firma desde el primer scroll, con un recorrido pensado para convertir visitas en consultas agendadas.',
    checkText: 'Otro cliente satisfecho',
    accent: 'var(--c-amber)',
    video: gcsProjectVideo
  },
  {
    index: '05',
    category: 'BARBERÍA / SISTEMA DE RESERVAS',
    title: 'De elegir el corte a la cita confirmada, sin una sola llamada.',
    text: 'Para una barbería construimos el sitio y el sistema que opera su agenda: el cliente entra con su cuenta de Google y reserva en 4 pasos, viendo solo los horarios realmente libres de cada barbero. Cada barbero administra su propia agenda y su horario semanal, y el cliente recibe un correo cuando su cita se confirma o se cancela. Desde el panel de administración se gestionan servicios, barberos, citas, reseñas, blog y mensajes, sin tocar una línea de código.',
    metric: '4',
    detail: 'pasos para reservar una cita: servicio, barbero, fecha y hora, confirmar',
    accent: 'var(--c-violet)',
    videos: [
      { src: barberPublicVideo, label: 'Sitio público' },
      { src: barberAdminVideo, label: 'Panel admin' }
    ]
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
          <div class="project-art" :class="{ '-video': project.video || project.videos }">
            <div v-if="project.videos" class="project-video-split">
              <div v-for="v in project.videos" :key="v.label" class="project-video-split-item">
                <div class="project-video-frame">
                  <div class="pb-bar"><i></i><i></i><i></i><span>{{ v.label }}</span></div>
                  <video
                    class="project-video"
                    :src="v.src"
                    autoplay
                    muted
                    loop
                    playsinline
                  ></video>
                </div>
              </div>
            </div>

            <video
              v-else-if="project.video"
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
