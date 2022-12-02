import { createRouter, createWebHistory,  RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import("../pages/Home.vue"),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import("../pages/About.vue"),
    },
    {
        path: '/poster',
        name: 'Poster',
        component: () => import("../pages/Poster.vue"),
    },
]

const router = createRouter({  
    history: createWebHistory(),  
    routes
})

export default router;
