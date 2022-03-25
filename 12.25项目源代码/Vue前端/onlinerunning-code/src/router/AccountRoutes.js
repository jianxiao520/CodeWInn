let routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/AccountPage/index.vue")
    }
]

export default routes;