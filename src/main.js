import Vue from 'vue'
import App from './App.vue'

//三级联动组件--全局组件
import TypeNav from './components/TypeNav'
Vue.component(TypeNav.name, TypeNav);

import router from './router'
import store from './store'

Vue.config.productionTip = false





new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')