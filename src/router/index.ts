import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import BookingPage from '@/components/BookingPage.vue'
import BastePage from '@/components/BastePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/boka-stuga',
      name: 'booking',
      component: BookingPage,
    },
    {
      path: '/bada-bastu',
      name: 'bastu',
      component: BastePage,
    },
    {
      path: '/kalender',
      name: 'kalender',
      component: () => import('@/components/KalenderPage.vue'),
    },
  ],
})

export default router
