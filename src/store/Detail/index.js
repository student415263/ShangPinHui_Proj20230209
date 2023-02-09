
/////Detail
import { reqGoodsDetailInfo, reqAddSkuShopCar } from "@/api";

import { getUuid } from '@/utils/uuid_token'

const state = {
    goodInfo: {},
    //游客的临时身份：
    uuid_token: getUuid()
};
const mutations = {
    //a是state， b是GoodInfo（也就是result.data）
    GETGOODSDETAILINFO(a, b) {
        state.goodInfo = b;
    }
};
const actions = {
    //获取产品信息的action
    async getGoodsDetailInfo({ commit }, skuId) {
        let result = await reqGoodsDetailInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODSDETAILINFO', result.data)
        }
    },
    //添加到购物车：因为reqAddSkuShopCar请求是post请求，没有返回data，所以不用三连环存数据啥的了
    async postAddSkuShopCar({ commit }, { skuId, skuNum }) { // {commit} is never be used
        let result = await reqAddSkuShopCar(skuId, skuNum);//解构
        console.log(result, { commit });//ok, its code = 200
        // commit
        if (result.code == 200) {
            return "add sku to shop car --OK" //只要返回一个非空字符串，就表示成功了
        } else {
            return Promise.reject(new Error('faile')) // 代表加入购物车失败了
        }
    }
};
const getters = {
    categoryView(state) {
        //如果不加上空对象，直接返回会导致假警告（功能正常，但是会报错），因为我们在state里面把goodinfo定义成了空对象（初始状态是个空对象）；
        //加上  ||空对象  就好了，功能一样但是不会报假警告。
        return state.goodInfo.categoryView || {};
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    //似乎是后台老师吧名字写错了？是spu: 
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    }
    //skuInfo.skuAttrValueList
    //skuInfo.skuSaleAttrValueList

};

export default {
    state,
    actions,
    mutations,
    getters,
}