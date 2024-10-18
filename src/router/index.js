import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FormCreateView from '@/views/FormCreateView.vue'
import DetailView from '@/views/DetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create',
      name: 'create',
      component: FormCreateView
    },
    {
      path: '/student-detail/:id',
      name: 'student-detail',
      component: DetailView
    }
  ]
})

export default router
