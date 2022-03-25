import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'


Vue.use(VueRouter);

// 默认路由
const baseRoutes = [
  {
    path: '/',
    name: 'Home',
    meta: { requireAuth: false },
    component: () => import('@/views/HomePage/Home.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: { requireAuth: false },
    component: () => import("@/views/Error/index.vue")
  }
];

// 子页面路由
import accountRoutes from './AccountRoutes';
import answerRoutes from './AnswerRoutes';
import problemRoutes from './ProblemRoutes';
import runcodeRoutes from './RuncodeRoutes';

const routes = baseRoutes.concat(
  accountRoutes,
  answerRoutes,
  problemRoutes,
  runcodeRoutes
)



const router = new VueRouter({
  routes
});


// Vue-路由守卫
router.beforeEach((to, from, next) => {

  // 是否存在的路由
  if (to.matched.length === 0) { next('/404'); return; }

  // 是否需要登陆
  if (to.meta.requireAuth) {
    // 判断权限
    if (localStorage.userToken) {
      next();
      return;
    } else {
      // 需要登陆才允许进入
      Message.error("请您先登陆再来吧～");
      return;
    }
  } else {
    // 不需要则放行
    next();
  }
});

export default router
