/* eslint-disable prettier/prettier */
import { useMe } from '@/hooks/useGetCurrentUser';
import { getDirectiveNames } from '@apollo/client/utilities';
import { nextTick } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const role = localStorage.getItem('role');
const accessToken = localStorage.getItem('token');
console.log(role);
const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: 'uber',
      requiresAuth: false,
    },
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/category/:slug',
    name: 'category',
    meta: {
      layout: 'uber',
      requiresAuth: false,
    },
    component: () => import('@/views//Category.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      layout: 'auth',
      requiresAuth: false,
    },
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'auth',
      requiresAuth: false,
    },
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      layout: 'auth',
      requiresAuth: true,
      isOwner: true,
      isClient: true,
      isDelivery: true,
    },
    component: () => import('@/views/UserProfile.vue'),
  },
  {
    path: '/add-restaurant',
    name: 'AddRestaurant',
    meta: {
      layout: 'auth',
      requiresAuth: true,
      isOwner: true,
      isClient: false,
      isDelivery: false,
    },
    component: () => import('@/views/Owner/CreateRestaurant.vue'),
  },
  {
    path: '/search/:term?',
    name: 'search',
    meta: {
      layout: 'uber',
      requiresAuth: false,
    },
    component: () => import('@/views//Search.vue'),
  },
  {
    path: '/restaurant/:id',
    name: 'restaurant',
    meta: {
      layout: 'uber',
      requiresAuth: true,
      isOwner: true,
      isClient: false,
      isDelivery: false,
    },
    component: () => import('@/views/Restaurant.vue'),
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      layout: 'dashboard',
      requiresAuth: true,
      isOwner: true,
      isClient: false,
      isDelivery: false,
    },
    children: [
      {
        path: '/dashboard/my-restaurants',
        name: 'my-restaurants',
        meta: {
          layout: 'dashboard',
          requiresAuth: true,
          isOwner: true,
          isClient: false,
          isDelivery: false,
        },
        component: () => import('@/views/Owner/OwnerRestaurants.vue'),
      },
      {
        path: '/dashboard/my-restaurants/:id',
        name: 'my-restaurant',
        meta: {
          layout: 'dashboard',
          requiresAuth: true,
          isOwner: true,
          isClient: false,
          isDelivery: false,
        },
        component: () => import('@/views/Owner/OwnerRestaurant.vue'),
      },
      {
        path: '/dashboard/my-restaurant/:id/create-dish',
        name: 'create-dish',
        meta: {
          layout: 'dashboard',
          requiresAuth: true,
          isOwner: true,
          isClient: false,
          isDelivery: false,
        },
        component: () => import('@/views/Owner/OwnerCreateDish.vue'),
      },
    ],
    component: () => import('@/views/Owner/OwnerDashboard.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!role || !accessToken) {
      router.push({ path: '/login' });
    } else {
      if (to.meta.isOwner) {
        if (role === 'Owner') {
          return next();
        } else {
          router.push({ path: '/login' });
        }
      } else if (to.meta.isClient) {
        if (role === 'Client') {
          return next();
        } else {
          router.push({ path: '/login' });
        }
      } else if (to.meta.isDelivery) {
        if (role === 'Delivery') {
          return next();
        } else {
          router.push({ path: '/login' });
        }
      }
    }
  } else {
    return next();
  }
});

export default router;
