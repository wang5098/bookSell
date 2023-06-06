import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../components/login.vue'),
  },
  {
    path: '/form/:username',
    name: 'form',
    component: () => import('../components/form.vue'),
  },
  {
    path: '/userBuy/:username',
    name: 'userBuy',
    component: () => import('../components/userBuy.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
