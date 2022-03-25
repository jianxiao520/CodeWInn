let routes = [{
    path: '/problem',
    name: 'Problem',
    meta: { requireAuth: false },
    component: () => import('@/views/ProblemListPage/index.vue')
}]

export default routes;