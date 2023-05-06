import { createRouter, createWebHistory } from 'vue-router'
import QuizView from '../views/QuizView.vue'
import CategoryView from '../views/CategoryView.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/category',
            name: 'category',
            component: CategoryView,
        },
        {
            path: '/:id/quiz',
            name: 'quiz',
            component: QuizView,
        },

        {
            path: '/about',
            name: 'about',
            component: AboutView
        }
    ]
})

export default router