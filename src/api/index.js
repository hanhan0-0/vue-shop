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
};
//获取验证码
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });
//注册
export const reqUserRegister = (data) => requests({ url: `/user/passport/register`, data, method: 'post' });
//登录
export const reqUserLogin = (data) => requests({ url: `/user/passport/login`, data, method: 'post' });

//获取用户信息【需要带着用户的token向服务器要用户信息】
//URL:/api/user/passport/auth/getUserInfo  method:get 
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' });

//退出登录
//URL:/api/user/passport/logout  get
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' });


//获取用户地址信息
//URL:/api/user/userAddress/auth/findUserAddressList  method:get
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' });

//获取商品清单
//URL:/api/order/auth/trade   method:get
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' });


//提交订单的接口
//URL:/api/order/auth/submitOrder?tradeNo={tradeNo}  method:post

export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' });

//获取支付信息
//URL:/api/payment/weixin/createNative/{orderId}  GET
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });

//获取支付订单状态
//URL:/api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });


//获取个人中心的数据
//api/order/auth/{page}/{limit}  get 
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });