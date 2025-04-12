import { createRouter, createWebHistory } from 'vue-router'
import Index from '../pages/index.vue'
import Quiz from '../pages/Quiz.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
      props: { msg: 'Welcome to Your Vue.js App' }
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: Quiz
    }
  ]
})

export default router 