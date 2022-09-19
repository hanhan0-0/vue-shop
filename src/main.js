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
//引入请求
import * as API from './api'
Vue.component(TypeNav.name, TypeNav);
Vue.component(carousel.name, carousel);
Vue.component(Pagination.name, Pagination);


//引入swiper样式
import "swiper/css/swiper.css"
Vue.config.productionTip = false

import { MessageBox, Message } from 'element-ui'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

//引入懒加载
import VueLazyLoad from 'vue-lazyload'
import lazyImg from './assets/loading-svg/loading-bars.svg'
Vue.use(VueLazyLoad, {
    //懒加载默认图片
    loading: lazyImg,
    preload: 0.5,
});

//引入表单认证插件
import VeeValidate from 'vee-validate'
//中文提示信息
import zh_CN from "vee-validate/dist/locale/zh_CN";
Vue.use(VeeValidate);

//表单验证
VeeValidate.Validator.localize("zh_CN", {
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同`, // 修改内置规则的 message，让确认密码和密码相同
    },
    attributes: {
        phone: "手机号",
        code: "验证码",
        password: "密码",
        password1: "确认密码",
        agree: '协议'
    },
});

//自定义校验规则
VeeValidate.Validator.extend("tongyi", {
    validate: (value) => {
        return value;
    },
    getMessage: (field) => field + "必须同意",
});


new Vue({
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
    },
    router,
    store
}).$mount('#app')