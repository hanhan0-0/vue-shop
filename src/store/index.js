import Vue from 'vue';
import Vuex from 'vuex'
//引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
Vue.use(Vuex);




//对外暴露
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail
    }
})