import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: "/",
        redirect: "/console",
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login"),
    },
    {
        path: '/console',
        name: 'root',
        component: () => import('../views/Home'),
        children: [{
            path: '/console',
            name: 'Console',
            component: () => import('../views/Console'),
        }, {
            path: '/user',
            name: 'User',
            component: () => import('../views/sys/User'),

        }, {
            path: '/role',
            name: '/Role',
            component: () => import('../views/sys/Role'),
        }]
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (!token && to.path !== '/login') {
        next({
            path: '/login'
        })
    } else {
        next()
    }
})
export default router;
