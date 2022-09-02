//search模块小仓库
import { reqGetSearchInfo } from '../../api'

const state = {
    searchList: {},
}
const mutations = {
    GetSearchList(state, value) {
        state.searchList = value;
    }
}
const actions = {
    async getSearchList({ commit }, params) {
        let result = await reqGetSearchInfo(params);
        if (result.code == 200) commit('GetSearchList', result.data);
    }
}
const getters = {
    attrsList(state) {
        return state.searchList.attrsList;
    },
    goodsList(state) {
        return state.searchList.goodsList;
    },
    trademarkList(state) {
        return state.searchList.trademarkList;
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}