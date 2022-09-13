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
    //当前这个接口（获取搜索模块的数据)，给服务器传递参数params，至少是一个空对象

export const reqGetSearchInfo = (params) => {
        return requests({ url: '/list', method: 'post', data: params || {} });
    }
    //获取产品详情信息的接口URL: /api/item/{skuId}

export const reqGoodesInfo = (skuId) => {
    return requests({ url: `/item/${skuId}`, method: 'get' });
};
// 将产品添加到购物车中，获取更新某一个产品的个数
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
    return requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });
};
// 获取购物车列表数据接口
export const reqCartList = () => {
    return requests({ url: `/cart/cartList`, method: 'get' });
};
//删除购物车产品的接口 
export const reqDeleteCartById = (skuId) => {
    return requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });
};
//修改产品选中的状态
export const reqUpdateCheckedById = ({ skuId, isChecked }) => {
    return requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'delete' });
}