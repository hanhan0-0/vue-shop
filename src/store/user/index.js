//登录注册模块小仓库

import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '../../api'
import { setToken, removeToken } from "../../utils/token"
const state = {
    code: "",
    token: localStorage.getItem('TOKEN'),
    userInfo: {}
}
const mutations = {
    GetCode(state, code) {
        state.code = code;
    },
    UserLogin(state, token) {
        state.token = token;
    },
    GetUserInfo(state, userInfo) {
        state.userInfo = userInfo
    },
    Clear(state) {
        state.token = "";
        state.userInfo = "";
        removeToken();
    }
}
const actions = {
    //  获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit("GetCode", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    //用户登录
    async userLogin({ commit }, user) {
        let result = await reqUserLogin(user);
        if (result.code == 200) {
            commit("UserLogin", result.data.token);
            setToken(result.data.token);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit("GetUserInfo", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    //退出登录
    async userLogOut({ commit }) {
        let result = await reqLogout();
        if (result.code == 200) {
            commit("Clear");
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {

}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}