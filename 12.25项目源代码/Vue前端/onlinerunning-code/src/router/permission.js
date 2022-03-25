// 路由跳转拦截 - 安全路由
import router from './index';

router.beforeEach((to, from, next) => {
    console.log();
    if (to.matched.length === 0) {                                        //如果未匹配到路由
      console.log("404");
      next('/404');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    } else {
      next();                                                                            //如果匹配到正确跳转
    }
  
});