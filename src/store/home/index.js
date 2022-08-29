import { reqCategoryList } from '../../api'

//home模块小仓库
const state = {
    categoryList: [],
}
const mutations = {
    CategoryList(state, value) {
        state.categoryList = value;
    }
}
const actions = {
    //通过api向服务器发送请求
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit("CategoryList", result.data)
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