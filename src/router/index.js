//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Home from '../pages/Home'
import Search from '../pages/Search'
import Login from '../pages/Login'
import Register from '../pages/Register'

// 先把vuerouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
// 先把vuerouter原型对象的replace，先保存一份
let originReplace = VueRouter.prototype.replace;
//重写push|replace
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}

export default new VueRouter({
    //配置路由
    routes: [{
            path: '/',
            redirect: "/home",
            meta: { show: true }
        },
        {
            path: "/home",
            component: Home,
            meta: { show: true }
        },
        {
            path: '/search/:keyword?',
            component: Search,
            name: "Search",
            meta: { show: true }
        },
        {
            path: '/login',
            component: Login,
            meta: { show: false }
        },
        {
            path: '/register',
            component: Register,
            meta: { show: false }
        }
    ]
})