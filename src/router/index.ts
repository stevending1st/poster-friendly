import { createRouter, createWebHistory,  RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import("../pages/page-home.vue"),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import("../pages/page-about.vue"),
    },
    {
        path: '/poster',
        name: 'Poster',
        component: () => import("../pages/page-poster.vue"),
    },
]

const router = createRouter({  
    history: createWebHistory(),  
    routes
})

export default router;
