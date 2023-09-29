import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import PeoplesView from '@/views/peoples/PeoplesView.vue'
import PeoplesIdView from "@/views/peoples/PeoplesIdView.vue"
import Favorites from "@/views/favorites/Favorites.vue";

const router = createRouter({
  end: undefined, sensitive: undefined, strict: undefined,
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/peoples/',
      name: 'peoples',
      component: PeoplesView,
    },
    {
      path: '/people/:id',
      name: 'peoplesId',
      component: PeoplesIdView
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites

    }
  ]
})

export default router
