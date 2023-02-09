
//本文件用来统一管理api，

import mockRequests from "./mockrequest";

import requests from "./request";


/* 
http://gmall-h5-api.atguigu.cn

三级目录：
http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList
http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList
    get
    没得参数 parameter
 */



export const requestCategoryList = ()=>{
    return requests({
        method: 'get',
        url:'/product/getBaseCategoryList',
    });
}

export const mockReqGetBannerList = ()=>mockRequests.get('/banner')

//Search
export const requestGetSearchInfo = (params)=>{
    return requests({
        method: 'post', 
        url: '/list',
        data:params,
    })
}


//获取产品详情的接口
export const reqGoodsDetailInfo = (skuId) => requests({url: `/item/${ skuId }`, method: 'get'})


//post    //添加到购物车：接口：/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddSkuShopCar = (skuId, skuNum) => requests({url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post'})


//获取购物车数据列表
export const reqShopCartList = () => {
    return requests({
        method: 'get',
        url: '/cart/cartList',
    })
}

//删除购物车内的商品接口：
//    /api/cart/deleteCart/{skuId}      methods:DELETE
export const reqDeleteOneShopCart = (skuId) => requests({method: 'delete', url: `/cart/deleteCart/${skuId}`})

//切换商品的选中状态：
//    /api/cart/checkCart/{skuId}/{isChecked}     get
export const reqChangeSkuIOsChenked = (skuId, isChecked) => requests({method: "get", url: `/cart/checkCart/${skuId}/${isChecked}`})

//获取手机验证码的接口：
export const reqGetPhoneCode = (phone) => {
    return requests({
        method: 'get',
        url: `/user/passport/sendCode/${phone}`
    })
}

//注册
export const reqFinishUserRegister = (data) => {
    return requests({
        method: 'post',
        url: `/user/passport/register`,
        data: data,
    })
}

//登录 // token: 令牌
export const reqLogin = (data) => {
    return requests({
        method: 'post',
        url: `/user/passport/login`,
        data,
    })
}

//登录后获取用户信息：参数用请求头带过去(把token带过去)
export const reqUserLoginedInfo = () => {
    return requests({
        method: 'get',
        url: `/user/passport/auth/getUserInfo`
    })
}

export const reqLoginout = () => {
    return requests({
        url: '/user/passport/logout',
        method: 'get'
    })
}

// 获取用户的 地址 
export const reqGetUserAddressInfo = () => {
    return requests({
        url: '/user/userAddress/auth/findUserAddressList',
        method: 'get',
    })
}

//10.获取订单交易页信息
export const reqGetUserJiaoyiyeshangpinxinxi = () => {
    return requests({
        url: '/order/auth/trade',
        method: 'get',
    })
}

//提交订单  /order/auth/submitOrder?tradeNo={tradeNo}     post    很多参数
export const reqCommitOrder = (tradeNo, data) => {
    return requests({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method: 'post',
        data,
    })
}

//获取订单支付信息
export const reqGetPayInfo = (orderId) => {
    return requests({
       url: `/payment/weixin/createNative/${orderId}`,
       mryhod: "get",
    })
}

// /api/payment/weixin/queryPayStatus/{orderId}
// 获取订单支付状态
export const reqGetPayState = (orderId) => {
    return requests({
        url: `/payment/weixin/queryPayStatus/${orderId}`,
        method: 'get',
    })
}

///api/order/auth/{page}/{limit}
// 获取个人中心数据
export const reqGetCenterData = (page, limit) => {
    return requests({
        url: `/order/auth/${page}/${limit}`,
        method: 'get'
    })
}