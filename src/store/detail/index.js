//search模块小仓库
import { reqGoodesInfo } from '../../api'

const state = {
    goodsInfo: {}
}
const mutations = {
    GetGoodsInfo(state, value) {
        state.goodsInfo = value;
    }
}
const actions = {
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodesInfo(skuId);
        if (result.code == 200) {
            commit('GetGoodsInfo', result.data);
        }
    }
}
const getters = {
    // 路径导航
    categoryView(state) {
        return state.goodsInfo.categoryView || {};
    },
    // 产品信息
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {};
    },
    //产品售卖属性
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || [];
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}