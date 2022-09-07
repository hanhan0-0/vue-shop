//购物车模块小仓库
import { reqCartList } from '../../api'

const state = {
    cartList: [],
}
const mutations = {
    GrtCartList(state, value) {
        state.cartList = value;
    }
}
const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit('GrtCartList', result.data)
        }
    }

}
const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}