// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home       from '../components/Home.vue'
import Water      from '../components/Water.vue'
import Vegetation from '../components/Vegetation.vue'
import Drone      from '../components/Drone.vue'

const routes = [
  { path: '/',           name: 'Home',       component: Home },
  { path: '/water',      name: 'Water',      component: Water },
  { path: '/vegetation', name: 'Vegetation', component: Vegetation },
  { path: '/drone',      name: 'Drone',      component: Drone },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
