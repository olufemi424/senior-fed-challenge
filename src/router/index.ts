import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
    },
    {
        path: '/pokemon/:id',
        name: 'pokemon',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "pokenmon" */ '../views/PokemonDetails.vue'),
    },
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'pokemon',
    //     component: () => import(/* webpackChunkName: "page-not-found" */ '../views/PageNotFound.vue'),
    // },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
