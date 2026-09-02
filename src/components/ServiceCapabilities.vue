<script setup>
const capIconPaths = {
  globe: 'M32 8a24 24 0 1 0 0 48 24 24 0 0 0 0-48Z M8 32h48 M32 8v48',
  layers: 'M32 8 L58 22 L32 36 L6 22 Z M6 34 L32 48 L58 34 M6 46 L32 60 L58 46',
  phone: 'M20 6h24a4 4 0 0 1 4 4v44a4 4 0 0 1-4 4h-24a4 4 0 0 1-4-4v-44a4 4 0 0 1 4-4z M27 54h10',
  bolt: 'M36 6 12 38h16l-4 20 28-32h-16z',
  megaphone: 'M8 26v12h9l21 16V10L17 26H8Z M44 24a12 12 0 0 1 0 16',
  spark: 'M32 8 L38.2 24.8 L56 26 L42.4 37.2 L46.8 54.4 L32 44.6 L17.2 54.4 L21.6 37.2 L8 26 L25.8 24.8 Z'
}

const capabilities = [
  {
    number: '01',
    icon: 'globe',
    accent: 'var(--c-blue)',
    title: 'Desarrollo Web',
    text: 'Sitios web, landing pages, plataformas web y CMS.',
    tags: ['Sitios corporativos', 'Landing pages', 'E-commerce', 'CMS administrable']
  },
  {
    number: '02',
    icon: 'layers',
    accent: 'var(--c-violet)',
    title: 'Desarrollo de Software',
    text: 'ERP, CRM, sistemas empresariales y software a medida.',
    tags: ['ERP', 'CRM', 'Dashboards', 'Automatización de procesos']
  },
  {
    number: '03',
    icon: 'phone',
    accent: 'var(--c-pink)',
    title: 'Aplicaciones',
    text: 'Aplicaciones Android, iOS, PWA y aplicaciones empresariales.',
    tags: ['Android', 'iOS', 'PWA', 'Apps empresariales']
  },
  {
    number: '04',
    icon: 'bolt',
    accent: 'var(--c-amber)',
    title: 'Automatización',
    text: 'Digitalización y automatización de procesos empresariales.',
    tags: ['Reportes automáticos', 'Notificaciones en vivo', 'Integraciones', 'Facturación (CFDI)']
  },
  {
    number: '05',
    icon: 'megaphone',
    accent: 'var(--c-green)',
    title: 'Marketing & Branding',
    text: 'Identidad de marca, contenido, redes sociales y publicidad digital.',
    tags: ['Branding', 'Redes sociales', 'Publicidad digital', 'SEO']
  },
  {
    number: '06',
    icon: 'spark',
    accent: 'var(--c-blue)',
    title: 'IA & Tecnología',
    text: 'Inteligencia artificial, integraciones y soluciones tecnológicas avanzadas.',
    tags: ['Chatbots', 'Asistentes con IA', 'Integraciones', 'Automatización inteligente']
  }
]

const extras = [
  { title: 'Soporte & Mantenimiento', text: 'Acompañamiento continuo después del lanzamiento: correcciones, mejoras y monitoreo.' },
  { title: 'Hosting & Servicios digitales', text: 'Dominios, correo empresarial, SSL y administración de servidores.' },
  { title: 'Consultoría tecnológica', text: 'Analizamos cómo funciona tu negocio y diseñamos la solución digital adecuada.' }
]
</script>

<template>
  <section class="section cap-section">
    <div class="section-head">
      <div>
        <div class="eyebrow reveal-up">TODO LO QUE OFRECEMOS</div>
        <h2 class="reveal-mask">
          <span class="mask-line"><span class="mask-line-inner">¿Qué podemos hacer por ti?</span></span>
        </h2>
      </div>
      <p class="reveal-up">
        Software, marketing y todo lo que hay en medio. Seis frentes, un mismo equipo.
      </p>
    </div>

    <div class="cap-grid">
      <div
        v-for="cap in capabilities"
        :key="cap.number"
        class="cap-card reveal-up"
        :style="{ '--accent': cap.accent }"
      >
        <div class="cap-card-head">
          <div class="cap-card-icon">
            <svg viewBox="0 0 64 64" fill="none"><path :d="capIconPaths[cap.icon]" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </div>
          <span class="index-tag">{{ cap.number }}</span>
        </div>
        <h3>{{ cap.title }}</h3>
        <p>{{ cap.text }}</p>
        <div class="cap-tags">
          <span v-for="tag in cap.tags" :key="tag" class="cap-tag">{{ tag }}</span>
        </div>
      </div>
    </div>

    <div class="cap-extras">
      <div v-for="extra in extras" :key="extra.title" class="cap-extra reveal-up">
        <h4>{{ extra.title }}</h4>
        <p>{{ extra.text }}</p>
      </div>
    </div>
  </section>
</template>
