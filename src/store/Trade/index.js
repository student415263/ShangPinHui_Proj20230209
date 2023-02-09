
import { reqGetUserAddressInfo } from "@/api"
import { reqGetUserJiaoyiyeshangpinxinxi } from "@/api"

const state = {
    userAddress: [],
    orderSkuInfo: {}
}

const mutations = {
    GETUSERADDRESSINFO(state, b) {
        state.userAddress = b
    },
    GETUSERORDERSKULISTINFO(state, b){
        state.orderSkuInfo = b
    }
}

const actions = {
    async GetUserAddressInfo(context) {
        let a = await reqGetUserAddressInfo()
        console.log("获取用户 地址 ：", a);
        if (a.code == 200) {
            context.commit("GETUSERADDRESSINFO", a.data)
            return "GetUserAddressInfo --OK"
        } else {
            return Promise.reject(new Error(a.message || 'faile'))
        }
    },
    async getUserOrderSkuListInfo(context) {
        let a = await reqGetUserJiaoyiyeshangpinxinxi()
        console.log("获取订单页商品信息：", a);
        if (a.code == 200) {
            context.commit("GETUSERORDERSKULISTINFO", a.data)
            return "getUserOrderSkuListInfo --OK"
        } else {
            return Promise.reject(new Error(a.message || 'faile'))
        }
    },

}

const getters = {}


export default {
    state,
    actions,
    mutations,
    getters,
}