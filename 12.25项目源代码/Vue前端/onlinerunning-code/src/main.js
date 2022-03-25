import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Element UI库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// CodeMirror 代码编辑器
import VueCodeMirror from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
// 字体图标
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
// 处理 Token
import verifyJwtToken from './service/indexService';
// 自定义工具类
import MyUtils from './utils/index';


// icon组件
Vue.component('icon', Icon);
// 阻止启动生产消息
Vue.config.productionTip = false

// 中间件
// ElementUI库
Vue.use(ElementUI);
// 代码编辑器
Vue.use(VueCodeMirror);
// 自定义工具类
Vue.use(MyUtils);

// 先行校验 localStorage 中的token
verifyJwtToken(store);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
