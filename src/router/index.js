import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path:'/login',
      name:'login',
      component:()=> import('../views/LoginView.vue') 
    },
    {
      path:'/libros',
      name:'libros',
      component:()=> import('../views/admin/Libros.vue') 
    },
    {
      path:'/autores',
      name:'autores',
      component:()=> import('../views/admin/Autores.vue')  
    },
    {
      path:'/categorias',
      name:'categorias',
      component:()=> import('../views/admin/Categorias.vue') 
    },
    {
      path:'/mapa',
      name:'mapa',
      component:()=> import('@/components/Mapa.vue') 
    },
  ]
})

export default router
