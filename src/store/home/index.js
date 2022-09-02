import { reqCategoryList } from '../../api'
import { reqGetBannerList } from '../../api'
import { reqFloorList } from '../../api'



//home模块小仓库
const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
}
const mutations = {
    CategoryList(state, value) {
        state.categoryList = value;
    },
    BannerList(state, value) {
        state.bannerList = value;
    },
    FloorList(state, value) {
        state.floorList = value;
    }
}
const actions = {
    //通过api向服务器发送请求
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit("CategoryList", result.data)
        }
    },
    async bannerList({ commit }) {
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit("BannerList", result.data)
        }
    },
    async floorList({ commit }) {
        let result = await reqFloorList();
        if (result.code == 200) {
            commit("FloorList", result.data)
        }
    }
}
const getters = {
    categoryList(state) {
        if (state.categoryList.length > 15)
            return state.categoryList.slice(0, 15);
        else return state.categoryList;
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}