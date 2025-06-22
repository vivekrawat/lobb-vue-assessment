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
      meta: { requiresAuth: true }
    },
    {
      path: '/details',
      name: 'Details',
      component: () => import('../views/ContentDetails.vue'),
      meta: { requiresAuth: true }
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' });
  } else if(to.path === '/login' && isAuthenticated){
    next({ name: 'Content' });
  } else {
    next();
  }
});

export default router
