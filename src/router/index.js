//配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);




import store from '../store'




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
let router = new VueRouter({
    //配置路由
    routes: [{
            path: '/',
            redirect: "/home",
            meta: { show: true, nologin: true }
        },
        {
            path: "/home",
            component: () =>
                import ("../pages/Home"),
            meta: { show: true, nologin: true }
        },
        {
            path: '/search/:keyword?',
            component: () =>
                import ("../pages/Search"),
            name: "Search",
            meta: { show: true, nologin: true }
        },
        {
            path: '/login',
            component: () =>
                import ("../pages/Login"),
            meta: { show: false, nologin: true }
        },
        {
            path: '/register',
            component: () =>
                import ("../pages/Register"),
            meta: { show: false, nologin: true }
        },
        {
            path: "/detail/:skuId",
            component: () =>
                import ("../pages/Detail"),
            meta: { show: true, nologin: true }
        },
        {
            path: "/addCartSuccess",
            name: 'addCartSuccess',
            component: () =>
                import ("../pages/AddCartSuccess"),
            meta: { show: true, nologin: true }
        },
        {
            path: "/shopcart",
            name: 'shopcart',
            component: () =>
                import ("../pages/ShopCart"),
            meta: { show: true, nologin: true }
        }, {
            path: "/trade",
            name: 'trade',
            component: () =>
                import ("../pages/Trade"),
            meta: { show: true, nologin: false },
            beforeEnter: (to, from, next) => {
                if (from.path == "/shopcart") {
                    next();
                } else {
                    Vue.prototype.$message({
                        message: '请从购物车进入交易页面',
                        type: 'warning',
                        duration: 1000
                    });
                    next(false);
                }
            }
        },
        {
            path: "/pay",
            name: 'pay',
            component: () =>
                import ("../pages/Pay"),
            meta: { show: true, nologin: false },
            beforeEnter: (to, from, next) => {
                if (from.path == "/trade") {
                    next();
                } else {
                    Vue.prototype.$message({
                        message: '请从交易页面进入支付页面',
                        type: 'warning',
                        duration: 1000
                    });
                    next(false);
                }
            }
        },
        {
            path: "/paysuccess",
            name: 'paysuccess',
            component: () =>
                import ("../pages/PaySuccess"),
            meta: { show: true, nologin: false },
            beforeEnter: (to, from, next) => {
                if (from.path == "/pay") {
                    next();
                } else {
                    Vue.prototype.$message({
                        message: '请从支付页面进入支付成功页面',
                        type: 'warning',
                        duration: 1000
                    });
                    next(false);
                }
            }
        },
        {
            path: "/center",
            name: 'center',
            component: () =>
                import ("../pages/Center"),
            meta: { show: true, nologin: false },
            redirect: "/center/myorder",
            children: [{
                    path: "myorder",
                    name: 'myorder',
                    component: () =>
                        import ("../pages/Center/myOrder"),
                },
                {
                    path: "grouporder",
                    name: 'grouporder',
                    component: () =>
                        import ("../pages/Center/groupOrder"),
                }
            ]
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});
router.beforeEach(async(to, from, next) => {
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    if (token) {
        if (to.path == '/login') {
            next(from.path);
            Vue.prototype.$message({
                message: '请退出登陆后，再重新登陆',
                duration: 1000
            });
        } else {
            if (name) {
                next();
            } else {
                try {
                    //获取用户信息在首页展示
                    await store.dispatch("user/getUserInfo");
                    next();
                } catch (error) {
                    //当token失效时
                    store.dispatch("user/userLogOut");
                    next('/login');
                }
            }
        }
    } else {
        //未登录不能去交易相关，支付相关，个人中心
        if (!to.meta.nologin) {
            Vue.prototype.$message({
                message: '请退出登陆后，再重新登陆',
                duration: 1000
            });
            next('/login?redirect=' + to.path);
        } else {
            next();
        }
    }

})
export default router;