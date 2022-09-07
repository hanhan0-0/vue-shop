//search模块小仓库
import { reqGoodesInfo } from '../../api'
import { reqAddOrUpdateShopCart } from '../../api'
//封装游客身份模块uuid--->生成一个随机字符串（不能改变）
import { getUUID } from '../../utils/uuid_token';
const state = {
    goodsInfo: {},
    //游客的临时身份
    uuid_token: getUUID(),

}
const mutations = {
    GetGoodsInfo(state, value) {
        state.goodsInfo = value;
    },
}
const actions = {
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodesInfo(skuId);
        if (result.code == 200) {
            commit('GetGoodsInfo', result.data);
        }
    },
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        //当前的这个函数如果执行返回promise
        if (result.code == 200) { return "success" } else {
            return Promise.reject(new Error('faile'));
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