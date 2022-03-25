let routes = [{
    path: '/coding',
    name: 'Runcode',
    meta: { requireAuth: true },
    component: () => import('@/views/RuncodePage/index.vue')
}]

export default routes;