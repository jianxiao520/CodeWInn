import { LOCALHOST } from '@/config/Service';
import axios from "axios";
import Qs from 'qs';
// 写入axios自动附加头
import setAuthorizationToken from '@/utils/setAuthorizationToken';

// 对象转为params
function ObjectToParams(params) {
    return Object.keys(params).map(key => key + '=' + params[key]).join('&');
}

// 简单封装 HTTP 请求，自动附加域名
export const request = (Url_, Params_ = '', Method_) => {
    return axios({
        method: Method_,
        url: `${LOCALHOST}${Url_}${Method_.toLowerCase() === 'get' ? '?' + ObjectToParams(Params_) : ''}`,
        // 序列化GET类型参数
        data: Method_.toLowerCase() === 'post' ? Qs.stringify(Params_) : '',
    }).then(res => {
        // 每当有token传过来就更新 [登陆成功、窗口滑动机制]
        if (res.headers.authorization != undefined) setAuthorizationToken(res.headers.authorization);
        return res;
    })
}