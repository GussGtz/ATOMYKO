import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Servicios from './pages/Servicios.vue'
import Proyectos from './pages/Proyectos.vue'
import Proceso from './pages/Proceso.vue'
import Contacto from './pages/Contacto.vue'

const routes = [
  { path: '/', name: 'inicio', component: Home, meta: { label: 'Inicio' } },
  { path: '/servicios', name: 'servicios', component: Servicios, meta: { label: 'Servicios' } },
  { path: '/proyectos', name: 'proyectos', component: Proyectos, meta: { label: 'Proyectos' } },
  { path: '/proceso', name: 'proceso', component: Proceso, meta: { label: 'Proceso' } },
  { path: '/contacto', name: 'contacto', component: Contacto, meta: { label: 'Contacto' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
