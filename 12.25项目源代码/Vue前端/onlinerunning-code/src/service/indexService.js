// 设置 axios 附加 Header
import setAuthorizationToken from '../utils/setAuthorizationToken';
// element 全局弹窗
import { Message } from 'element-ui';

// 处理 Token -> 判断浏览器中 Token 的有效性。
// 有效 -> 写入 axios 的默认 Header 中 且将其中的 ·载荷· 写入 store
// 无效 -> 清空当前浏览器中的 Token

export default (store) => {
    if (localStorage.userToken) {
        // localStorage 中有 token 则发送此 token 至服务器查询其有效性。
        setAuthorizationToken(localStorage.userToken);
        // 携带 Token 至 Header 访问服务器 校验其有效性
        store.dispatch('user/verifyToken').then(
            () => {
                Message({
                    message: "欢迎回来",
                    type: "success",
                });
            },
            (resMessage) => {
                setAuthorizationToken("");
                Message({
                    message: resMessage,
                    type: "warning",
                });
            }
        )
    }
}