//订单模块小仓库
import { reqAddressInfo, reqOrderInfo } from '../../api'

const state = {
    address: [],
    orderInfo: {}
}
const mutations = {
    GetUserAddress(state, data) {
        state.address = data;
    },
    GetOrderInfo(state, data) {
        state.orderInfo = data;
    },
}
const actions = {
    //获取用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo();
        if (result.code == 200) {
            commit("GetUserAddress", result.data);
        }
    },
    //获取商品清单
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        if (result.code == 200) {
            commit("GetOrderInfo", result.data);
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