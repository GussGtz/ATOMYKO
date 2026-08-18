<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gugodexLogo from './assets/gugodex-navbar.png'

gsap.registerPlugin(ScrollTrigger)

const menuOpen = ref(false)
const scrolled = ref(false)

const services = [
  {
    number: '01',
    title: 'Desarrollo de Software',
    text: 'Plataformas, sistemas y aplicaciones a medida diseñadas para resolver problemas reales y escalar contigo.',
    label: 'BUILD',
    icon: 'code'
  },
  {
    number: '02',
    title: 'Marketing Digital',
    text: 'Estrategia, contenido, campañas y adquisición para convertir atención en clientes y crecimiento.',
    label: 'GROW',
    icon: 'chart'
  },
  {
    number: '03',
    title: 'Diseño & Branding',
    text: 'Identidades y experiencias digitales que hacen que una empresa se vea tan buena como realmente es.',
    label: 'CREATE',
    icon: 'spark'
  }
]

const projects = [
  {
    index: '01',
    category: 'SAAS / PRODUCT',
    title: 'Software que simplifica operaciones.',
    accent: '01',
    metric: '+42%',
    detail: 'eficiencia operativa'
  },
  {
    index: '02',
    category: 'E-COMMERCE / GROWTH',
    title: 'Experiencias que convierten.',
    accent: '02',
    metric: '3.8×',
    detail: 'retorno de campaña'
  },
  {
    index: '03',
    category: 'BRAND / DIGITAL',
    title: 'Marcas que se hacen notar.',
    accent: '03',
    metric: '2.4M',
    detail: 'personas alcanzadas'
  }
]

const process = [
  [
    '01',
    'Descubrimos',
    'Entendemos tu negocio, audiencia y el problema que realmente hay que resolver.'
  ],
  [
    '02',
    'Diseñamos',
    'Convertimos estrategia en una experiencia clara, memorable y medible.'
  ],
  [
    '03',
    'Construimos',
    'Desarrollamos rápido, con calidad y una arquitectura lista para crecer.'
  ],
  [
    '04',
    'Aceleramos',
    'Lanzamos, medimos y optimizamos para que el producto siga avanzando.'
  ]
]

const stack = [
  'VUE.JS',
  'JAVASCRIPT',
  'NODE.JS',
  'POSTGRESQL',
  'API',
  'CLOUD',
  'SEO',
  'ADS',
  'ANALYTICS'
]

function handleScroll() {
  scrolled.value = window.scrollY > 40
}

function closeMenu() {
  menuOpen.value = false
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll, { passive: true })

  await nextTick()

  /* =========================
     HERO INTRO
  ========================= */

  const intro = gsap.timeline({
    defaults: {
      ease: 'power4.out'
    }
  })

  intro
    .from('.hero-kicker', {
      y: 25,
      opacity: 0,
      duration: 0.7
    })
    .from(
      '.hero-title .line',
      {
        y: 100,
        opacity: 0,
        rotateX: -70,
        stagger: 0.11,
        duration: 1.05
      },
      '-=.35'
    )
    .from(
      '.hero-description',
      {
        y: 25,
        opacity: 0,
        duration: 0.7
      },
      '-=.45'
    )
    .from(
      '.hero-actions',
      {
        y: 20,
        opacity: 0,
        duration: 0.6
      },
      '-=.4'
    )
    .from(
      '.hero-visual',
      {
        scale: 0.86,
        opacity: 0,
        duration: 1.1
      },
      '-=.7'
    )
    .from(
      '.hero-trust',
      {
        y: 15,
        opacity: 0,
        duration: 0.55
      },
      '-=.5'
    )

  /* =========================
     HERO BACKGROUND
  ========================= */

  gsap.to('.orb.orb-a', {
    x: 45,
    y: -30,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })

  gsap.to('.orb.orb-b', {
    x: -35,
    y: 35,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })

  /* =========================
      HERO VISUAL
  ========================= */

  gsap.to('.hero-orbit-1', {
    rotation: 360,
    duration: 22,
    repeat: -1,
    ease: 'none'
  })

  gsap.to('.hero-orbit-2', {
    rotation: -360,
    duration: 30,
    repeat: -1,
    ease: 'none'
  })

  gsap.to('.hero-orbit-3', {
    rotation: 360,
    duration: 38,
    repeat: -1,
    ease: 'none'
  })

  gsap.to('.hero-logo-core', {
    y: -10,
    duration: 2.8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })

  gsap.to('.hero-pulse', {
    scale: 1.25,
    opacity: 0.15,
    duration: 2.2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })

  gsap.to('.hero-dot-1', {
    y: -18,
    x: 10,
    duration: 2.4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })

  gsap.to('.hero-dot-2', {
    y: 15,
    x: -12,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })

  gsap.to('.hero-dot-3', {
    y: -10,
    x: -15,
    duration: 3.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })

  /* =========================
     SCROLL REVEALS
  ========================= */

  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.from(el, {
      y: 55,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        once: true
      }
    })
  })

  /* =========================
     SERVICES
  ========================= */

  gsap.utils.toArray('.service-card').forEach((el, i) => {
    gsap.from(el, {
      y: 70,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 78%',
        once: true
      }
    })
  })

  /* =========================
     PROJECTS
  ========================= */

  gsap.utils.toArray('.project-card').forEach((el, i) => {
    gsap.from(el, {
      x: i % 2 ? 70 : -70,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        once: true
      }
    })
  })

  /* =========================
     MARQUEE
  ========================= */

  gsap.to('.marquee-track', {
    xPercent: -50,
    duration: 25,
    ease: 'none',
    repeat: -1
  })

  /* =========================
     SERVICE HOVER
  ========================= */

  gsap.utils.toArray('.service-card').forEach((card) => {
    const icon = card.querySelector('.service-icon')

    card.addEventListener('mouseenter', () => {
      gsap.to(icon, {
        rotate: 8,
        scale: 1.08,
        duration: 0.35,
        ease: 'power2.out'
      })
    })

    card.addEventListener('mouseleave', () => {
      gsap.to(icon, {
        rotate: 0,
        scale: 1,
        duration: 0.35,
        ease: 'power2.out'
      })
    })
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)

  ScrollTrigger.getAll().forEach((trigger) => {
    trigger.kill()
  })
})
</script>

<template>
  <div class="app">

    <div class="cursor-glow"></div>

    <!-- =========================
         NAVBAR
    ========================== -->

    <header
      class="navbar"
      :class="{ compact: scrolled }"
    >
      <a
        href="#inicio"
        class="brand"
        @click="closeMenu"
      >
        <img
          :src="gugodexLogo"
          alt="GUGODEX"
          class="brand-logo"
        />
      </a>

      <nav class="desktop-nav">
        <a href="#servicios">Servicios</a>
        <a href="#proyectos">Proyectos</a>
        <a href="#proceso">Proceso</a>

        <a
          href="#contacto"
          class="nav-cta"
        >
          Hablemos
          <span>↗</span>
        </a>
      </nav>

      <button
        class="menu-toggle"
        aria-label="Abrir navegación"
        @click="menuOpen = !menuOpen"
      >
        <i></i>
        <i></i>
      </button>

      <nav
        v-if="menuOpen"
        class="mobile-nav"
      >
        <a
          href="#servicios"
          @click="closeMenu"
        >
          Servicios
        </a>

        <a
          href="#proyectos"
          @click="closeMenu"
        >
          Proyectos
        </a>

        <a
          href="#proceso"
          @click="closeMenu"
        >
          Proceso
        </a>

        <a
          href="#contacto"
          @click="closeMenu"
        >
          Hablemos ↗
        </a>
      </nav>
    </header>


    <main>

      <!-- =========================
           HERO
      ========================== -->

      <section
        id="inicio"
        class="hero"
      >
        <div class="hero-grid"></div>
        <div class="hero-noise"></div>

        <div class="orb orb-a"></div>
        <div class="orb orb-b"></div>

        <!-- HERO CONTENT -->

        <div class="hero-content">

          <div class="hero-kicker">
            <span class="live-dot"></span>

            SOFTWARE + MARKETING DIGITAL

            <span class="year">
              / 2026
            </span>
          </div>


          <h1 class="hero-title">

            <span class="line">
              Ideas que se
            </span>

            <span class="line gradient-text line-vuelven">
              convierten
            </span>

            <span class="line">
              en impacto<span class="blue-dot">.</span>
            </span>

          </h1>


          <p class="hero-description">
            Construimos software, marcas y estrategias digitales
            para empresas que quieren dejar de seguir tendencias
            y empezar a marcar el ritmo.
          </p>


          <div class="hero-actions">

            <a
              href="#contacto"
              class="button primary-button"
            >
              <span>
                Iniciar un proyecto
              </span>

              <b>↗</b>
            </a>

            <a
              href="#proyectos"
              class="button ghost-button"
            >
              Ver nuestro trabajo
              <b>↓</b>
            </a>

          </div>


          <div class="hero-trust">

            <span>ESTRATEGIA</span>

            <i></i>

            <span>DISEÑO</span>

            <i></i>

            <span>TECNOLOGÍA</span>

            <i></i>

            <span>MARKETING</span>

          </div>

        </div>


        <!-- =========================
             NUEVO HERO VISUAL
        ========================== -->

        <div class="hero-visual">

          <div class="visual-label label-top">
            GUGODEX / DIGITAL SYSTEM
          </div>


          <div class="visual-stage">

            <!-- Grid circular -->

            <div class="stage-grid"></div>


            <!-- ÓRBITAS -->

            <div class="hero-orbit hero-orbit-1">
              <div class="orbit-point hero-dot-1"></div>
            </div>

            <div class="hero-orbit hero-orbit-2">
              <div class="orbit-point hero-dot-2"></div>
            </div>

            <div class="hero-orbit hero-orbit-3">
              <div class="orbit-point hero-dot-3"></div>
            </div>


            <!-- ANILLO CENTRAL -->

            <div class="hero-pulse"></div>


            <!-- LOGO CENTRAL -->

            <div class="hero-logo-core">

              <div class="core-glow"></div>

              <div class="core-logo">
                G
              </div>

              <small>
                GUGODEX
              </small>

            </div>


            <!-- CARD GROWTH -->

            <div class="float-card analytics-card">

              <div class="card-head">

                <span>
                  GROWTH
                </span>

                <b>
                  ↗
                </b>

              </div>

              <strong>
                +128.4%
              </strong>

              <div class="mini-chart">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>

            </div>


            <!-- CARD CODE -->

            <div class="float-card code-card">

              <div>
                <span class="syntax">
                  const
                </span>

                future
                <span class="syntax">
                  =
                </span>
              </div>

              <div class="indent">
                build
                <span class="syntax">
                  (
                </span>

                ideas

                <span class="syntax">
                  )
                </span>
              </div>

              <div class="indent result">
                →
                impact<span>.</span>
              </div>

            </div>


            <!-- STATUS -->

            <div class="float-pill">
              <span>●</span>
              SYSTEM ONLINE
            </div>


            <!-- CROSS -->

            <div class="visual-cross cross-one">
              +
            </div>

            <div class="visual-cross cross-two">
              +
            </div>

          </div>


          <div class="visual-label label-bottom">
            MX / WORLDWIDE
          </div>

        </div>


        <div class="scroll-cue">

          <span></span>

          SCROLL PARA EXPLORAR

          <b>
            ↓
          </b>

        </div>

      </section>


      <!-- =========================
           MARQUEE
      ========================== -->

      <section
        class="marquee-section"
        aria-hidden="true"
      >

        <div class="marquee-track">

          <span>SOFTWARE</span>
          <b>✦</b>

          <span>MARKETING</span>
          <b>✦</b>

          <span>DISEÑO</span>
          <b>✦</b>

          <span>GROWTH</span>
          <b>✦</b>

          <span>SOFTWARE</span>
          <b>✦</b>

          <span>MARKETING</span>
          <b>✦</b>

          <span>DISEÑO</span>
          <b>✦</b>

          <span>GROWTH</span>
          <b>✦</b>
            <span>MARKETING</span>
          <b>✦</b>

          <span>INNOVACIÓN</span>
          <b>✦</b>

          <span>GROWTH</span>
          <b>✦</b>

        </div>

      </section>


      <!-- =========================
           MANIFESTO
      ========================== -->

      <section class="manifesto section reveal">

        <div class="section-index">
          01 / GUGODEX
        </div>

        <div class="manifesto-content">

          <div class="eyebrow dark">
            NO SOMOS UNA AGENCIA MÁS.
          </div>

          <h2>
            Somos el equipo que convierte
            <em>complejidad</em>
            en
            <span>posibilidad.</span>
          </h2>

          <p>
            Unimos desarrollo de software y marketing digital
            en un mismo equipo para que estrategia, producto
            y crecimiento trabajen en la misma dirección.
          </p>

        </div>

      </section>


      <!-- =========================
           SERVICIOS
      ========================== -->

      <section
        id="servicios"
        class="services section"
      >

        <div class="section-head reveal">

          <div>

            <div class="section-index">
              02 / LO QUE HACEMOS
            </div>

            <h2>
              Una idea.
              <br />
              <em>Todo el stack.</em>
            </h2>

          </div>

          <p>
            Del primer concepto al usuario final.
            Diseñamos, construimos y hacemos crecer
            productos digitales.
          </p>

        </div>


        <div class="services-grid">

          <article
            v-for="service in services"
            :key="service.number"
            class="service-card"
          >

            <div class="service-top">

              <span>
                {{ service.number }}
              </span>

              <span class="service-label">
                {{ service.label }}
              </span>

            </div>


            <div
              class="service-icon"
              :class="service.icon"
            >

              <svg
                v-if="service.icon === 'code'"
                viewBox="0 0 64 64"
                fill="none"
              >
                <path d="M25 18 9 32l16 14M39 18l16 14-16 14M36 12 28 52" />
              </svg>


              <svg
                v-else-if="service.icon === 'chart'"
                viewBox="0 0 64 64"
                fill="none"
              >
                <path d="M10 52V12M10 52h44M18 43l10-12 8 7 17-23" />
                <path d="M45 15h8v8" />
              </svg>


              <svg
                v-else
                viewBox="0 0 64 64"
                fill="none"
              >
                <path d="M32 7v50M7 32h50M14 14l36 36M50 14 14 50" />
                <circle
                  cx="32"
                  cy="32"
                  r="9"
                />
              </svg>

            </div>


            <h3>
              {{ service.title }}
            </h3>

            <p>
              {{ service.text }}
            </p>

            <a
              href="#contacto"
              class="service-link"
            >
              Explorar servicio
              <span>↗</span>
            </a>

          </article>

        </div>

      </section>


      <!-- =========================
           PROYECTOS
      ========================== -->

      <section
        id="proyectos"
        class="work section"
      >

        <div class="section-head reveal">

          <div>

            <div class="section-index">
              03 / PROYECTOS
            </div>

            <h2>
              Trabajo que
              <br />
              <em>habla solo.</em>
            </h2>

          </div>

          <a
            href="#contacto"
            class="simple-link"
          >
            ¿Tienes un reto? ↗
          </a>

        </div>


        <div class="projects">

          <article
            v-for="(project, i) in projects"
            :key="project.index"
            class="project-card"
          >

            <div class="project-meta">

              <span>
                {{ project.index }}
              </span>

              <span>
                {{ project.category }}
              </span>

            </div>


            <div
              class="project-art"
              :class="'art-' + i"
            >

              <div class="browser">

                <div class="browser-bar">

                  <i></i>
                  <i></i>
                  <i></i>

                  <span>
                    gugodex.digital
                  </span>

                </div>


                <div class="browser-body">

                  <div class="dashboard-title"></div>

                  <div class="dashboard-grid">

                    <div class="dashboard-card big"></div>

                    <div class="dashboard-card"></div>

                    <div class="dashboard-card"></div>

                  </div>


                  <div class="dashboard-chart">

                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>

                  </div>

                </div>

              </div>

              <div class="art-glow"></div>

            </div>


            <div class="project-info">

              <div class="project-tag">
                {{ project.category }}
              </div>

              <h3>
                {{ project.title }}
              </h3>

              <div class="project-result">

                <strong>
                  {{ project.metric }}
                </strong>

                <span>
                  {{ project.detail }}
                </span>

              </div>

            </div>

          </article>

        </div>

      </section>


      <!-- =========================
           PROCESO
      ========================== -->

      <section
        id="proceso"
        class="process section"
      >

        <div class="section-head reveal">

          <div>

            <div class="section-index">
              04 / PROCESO
            </div>

            <h2>
              De la idea
              <br />
              <em>al impacto.</em>
            </h2>

          </div>

          <p>
            Sin burocracia innecesaria.
            Un proceso diseñado para avanzar rápido
            sin sacrificar calidad.
          </p>

        </div>


        <div class="process-grid">

          <article
            v-for="item in process"
            :key="item[0]"
            class="process-card"
          >

            <span class="process-number">
              {{ item[0] }}
            </span>

            <div class="process-line"></div>

            <h3>
              {{ item[1] }}
            </h3>

            <p>
              {{ item[2] }}
            </p>

            <span class="process-arrow">
              ↗
            </span>

          </article>

        </div>

      </section>


      <!-- =========================
           STACK
      ========================== -->

      <section
        class="stack-section section reveal"
      >

        <div class="stack-copy">

          <div class="section-index">
            05 / NUESTRO STACK
          </div>

          <h2>
            Herramientas
            <br />
            <em>para avanzar.</em>
          </h2>

          <p>
            Elegimos tecnología por lo que puede hacer
            por tu negocio, no por moda.
          </p>

        </div>


        <div class="stack-orbit">

          <div class="stack-ring"></div>

          <div class="stack-center">
            G
          </div>

          <span
            v-for="(item, i) in stack"
            :key="item"
            class="stack-pill"
            :style="{ '--i': i }"
          >
            {{ item }}
          </span>

        </div>

      </section>


      <!-- =========================
           CONTACTO
      ========================== -->

      <section
        id="contacto"
        class="contact"
      >

        <div class="contact-grid"></div>

        <div class="contact-orb"></div>

        <div class="section-index light">
          06 / HABLEMOS
        </div>

        <h2>
          Tu próximo
          <br />
          <em>gran proyecto</em>
          <br />
          empieza aquí<span>.</span>
        </h2>

        <p>
          Cuéntanos qué quieres construir.
          Nosotros ponemos estrategia, diseño,
          código y crecimiento.
        </p>

        <a
          class="contact-button"
          href="mailto:hola@gugodex.com"
        >
          <span>
            hola@gugodex.com
          </span>

          <b>
            ↗
          </b>

        </a>

      </section>

    </main>


    <!-- =========================
         FOOTER
    ========================== -->

    <footer>

      <a
        href="#inicio"
        class="brand"
      >
        <img
          :src="gugodexLogo"
          alt="GUGODEX"
          class="brand-logo"
        />
      </a>

      <span>
        SOFTWARE · MARKETING · DESIGN
      </span>

      <span>
        © 2026 GUGODEX
      </span>

    </footer>

  </div>
</template>