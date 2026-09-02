<script setup>
import workSoftwarePhoto from '../assets/work/software-team.jpg'
import workMobilePhoto from '../assets/work/mobile-app.jpg'
import workBrandPhoto from '../assets/work/brand-presence.jpg'
import workProductPhoto from '../assets/work/product-tool.jpg'
import workMarketingPhoto from '../assets/work/marketing-content.jpg'
import workExperiencePhoto from '../assets/work/brand-experience.jpg'

// Real photos of the kind of work we do — not client screenshots
// (we don't have those to show yet), so this teases our craft
// without passing off a mockup as an actual delivery.
const workCards = [
  { type: 'photo', photo: workSoftwarePhoto, accent: 'var(--c-blue)', text: 'Plataformas web a medida, construidas para crecer con el negocio.' },
  { type: 'photo', photo: workMobilePhoto, accent: 'var(--c-violet)', text: 'Apps móviles pensadas de punta a punta, del primer boceto al lanzamiento.' },
  { type: 'photo', photo: workBrandPhoto, accent: 'var(--c-amber)', text: 'Presencia digital renovada para marcas que ya operan en el mercado.' },
  { type: 'photo', photo: workProductPhoto, accent: 'var(--c-green)', text: 'Herramientas de producto con una interfaz simple y directa.' },
  { type: 'photo', photo: workMarketingPhoto, accent: 'var(--c-pink)', text: 'Sistemas de marketing y contenido pensados para convertir.' },
  { type: 'photo', photo: workExperiencePhoto, accent: 'var(--c-blue)', text: 'Identidad y experiencia digital consistentes en cada punto de contacto.' }
]
</script>

<template>
  <section class="section work-section">
    <h2 class="reveal-mask">
      <span class="mask-line"><span class="mask-line-inner">¿Qué podemos hacer por ti?</span></span>
    </h2>

    <div class="work-grid">
      <div v-for="card in workCards" :key="card.text" class="work-item reveal-up">
        <div class="work-art" :style="{ '--accent': card.accent }">
          <img v-if="card.type === 'photo'" :src="card.photo" alt="" class="work-photo" />

          <div v-else-if="card.type === 'browser'" class="project-browser work-browser">
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

          <div v-else class="work-phone">
            <div class="work-phone-notch"></div>
            <div class="work-phone-body">
              <div class="pb-title" style="width: 65%;"></div>
              <div class="pb-card" style="height: 70px;"></div>
              <div class="pb-card"></div>
              <div class="pb-card"></div>
            </div>
          </div>
        </div>
        <p class="work-caption">{{ card.text }}</p>
      </div>
    </div>
  </section>
</template>
