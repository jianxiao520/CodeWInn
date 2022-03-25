import { request } from './request';
// 设置 axios 附加 Header
import API from './api';

export const loginAccount = (user) => {
    return request(API.ACCOUNT_LOGIN, {
        email: user.username,
        password: user.password
    }, 'post');
}

export const registerAccount = (user) => {
    return request(API.ACCOUNT_REGISTER, {
        email: user.username,
        password: user.password
    }, 'post');
}

export const verifyUserAccount = () => {
    return request(API.ACCOUNT_VERIFY, "", 'get');
}