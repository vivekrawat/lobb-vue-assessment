import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/',
      name: 'Content',
      component: () => import('../views/Content.vue'),
    },
    {
      path: '/details',
      name: 'Details',
      component: () => import('../views/ContentDetails.vue'),
    },
  ],
})

export default router
