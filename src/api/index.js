//当前这个模块，API进行统一管理

import requests from './request.js';
import mockRequests from './mockAjax'

//三级联动接口
// /api/product/getBaseCategoryList get 无参数

export const reqCategoryList = () => {
    //发请求:axios发请求返回的结果是promise对象
    return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}
export const reqGetBannerList = () => {
    return mockRequests.get('/banner');
}
export const reqFloorList = () => {
        return mockRequests.get('/floor');
    }
    //当前这个接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params) => {
    return requests({ url: '/list', method: 'post', data: params || {} });
}