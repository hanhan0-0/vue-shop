import Vue from 'vue'
import App from './App.vue'




import router from './router';
import store from './store';
//引入mock
import "./mock/mockServer";

//三级联动组件--全局组件
import TypeNav from './components/TypeNav';
import carousel from './components/Carousel'
import Pagination from './components/Pagination'

Vue.component(TypeNav.name, TypeNav);
Vue.component(carousel.name, carousel);
Vue.component(Pagination.name, Pagination);


//引入swiper样式
import "swiper/css/swiper.css"
Vue.config.productionTip = false





new Vue({
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this;
    },
    router,
    store
}).$mount('#app')