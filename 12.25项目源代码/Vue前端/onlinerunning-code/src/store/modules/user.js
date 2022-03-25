// 用户状态模块
import { loginAccount, registerAccount, verifyUserAccount } from '@/service/userService';
// jwt 解码
import jwtdecode from 'jwt-decode';
// 设置 axios 附加 Header
import setAuthorizationToken from '@/utils/setAuthorizationToken';

// state
const state = () => ({
    // 注册时的邮箱
    registerEmail: "",
    // 是否已登陆
    isAuthenticated: false,
    // 用户登陆信息
    userInfo: {},

})

// mutations
const mutations = {
    SET_LOGIN_SUCCESS(state, userInfo) {
        state.isAuthenticated = true;
        state.userInfo = userInfo;
    },
    SET_LOGIN_FAIL(state) {
        state.isAuthenticated = false;
        state.userInfo = null;
    },
    SET_REGISTER_EMAIL(state, email) {
        state.registerEmail = email;
    },
}

// actions
const actions = {
    // 登陆
    login({ commit }, user) {
        return loginAccount(user).then(
            user => {
                // 登陆成功
                // 把 Token 中的信息解码放入至状态中
                commit('SET_LOGIN_SUCCESS', jwtdecode(localStorage.userToken));
                return Promise.resolve(user);
            },
            ({ response }) => {
                commit('SET_LOGIN_FAIL');
                return Promise.reject(response.data);
            }
        );
    },
    // 注册
    register({ commit }, user) {
        return registerAccount(user).then(
            user => {
                commit('SET_REGISTER_EMAIL', user.data.message.username);
                return Promise.resolve(user.data.message);
            },
            ({ response }) => {
                return Promise.reject(response.data.message);
            }
        );
    },
    // 校验Token
    verifyToken({ commit }) {
        return verifyUserAccount().then(
            () => {
                // 解析JWT为User对象
                commit("SET_LOGIN_SUCCESS", jwtdecode(localStorage.userToken));
                return Promise.resolve(localStorage.userToken);
            }, ({ response }) => {
                // 显示错误信息
                return Promise.reject(response.data.message);
            });
    },
    // 退出登陆
    logOut({ commit }) {
        commit("SET_LOGIN_FAIL");
        setAuthorizationToken();
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}