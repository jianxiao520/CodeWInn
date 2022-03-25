let routes = [{
    path: '/answerPage/:pid',
    name: 'AnswerPage',
    props: true,
    meta: { requireAuth: true },
    component: () => import('../views/AnswerPage/index.vue')
}]

export default routes;