// Base64 工具类
import Base64Util from "./Base64";

// 整合所有工具类导出
const install = function (Vue) {
    Vue.$Base64Util = Vue.prototype.$Base64Util = Base64Util;
}
export default {
    install
}