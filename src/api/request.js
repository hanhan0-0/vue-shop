//对于axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import "nprogress/nprogress.css"
import store from '../store';

//利用axios对象的方法创建一个axios实例
//2.request就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //在发请求的路径上都带上/api不用自己写了
    baseURL: '/api',
    //代表请求超时的时间5s，如果超过5s代表请求超时失败
    timeout: 5000,
});

//请求拦截器，在请求发送之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
        //config是配置对象，对象里有一个属性很重要，header请求头
        if (store.state.detail.uuid_token) {
            config.headers.userTempId = store.state.detail.uuid_token;
        }

        //进度条开始动
        nprogress.start();

        return config;
    })
    //响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数，服务器相应数据回来以后，响应拦截器可以检测到可以做一些事情
    //进度条结束
    nprogress.done();

    return res.data;
}, (error) => {
    //响应失败的回调函数
    return Promise.reject(new Error('faile'));

})

export default requests;