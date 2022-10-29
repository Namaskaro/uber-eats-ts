import { useMe } from '@/hooks/useGetCurrentUser';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';



const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      layout: 'uber',
      isAuthenticated: true,
    },
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/category/:slug',
    name: 'category',
    meta: {
      layout: 'uber',
      isAuthenticated: true,
    },
    component: () => import('@/views//Category.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      layout: 'auth',
    },
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'auth',
    },
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      layout: 'auth',
      isAuthenticated: true,
    },
    component: () => import('@/views/UserProfile.vue'),
  },
  {
    path: '/search/:term?',
    name: 'search',
    meta: {
      layout: 'uber',
      isAuthenticated: true,
    },
    component: () => import('@/views//Search.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
