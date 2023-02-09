
import { reqShopCartList } from "@/api"
import { reqDeleteOneShopCart } from "@/api";
import { reqChangeSkuIOsChenked } from "@/api";

const state = {
    cartList: []
};

const mutations = {
    GETSHOPCARTLIST(state, aaacartlist) {
        state.cartList = aaacartlist
    }
};

const actions = {
    // getShopCartList
    async getShopCartList({ commit }) { // 上下文参数里 解构 commit
        let result = await reqShopCartList()
        console.log(" getShopCartList's result:", result); //
        if (result.code == 200) {
            commit('GETSHOPCARTLIST', result.data)
        }
    },
    // Delete
    async DeleteOneShopCart({ commit }, skuId) {  //{commit} is not be used, but it is necessary
        let result = await reqDeleteOneShopCart(skuId)
        console.log('Action--DeleteOneShopCart:', result, { commit });
        if (result.code == 200) {
            return 'DeleteOneShopCart: OK'
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    // ChangeSkuIOsChenked 改变选中状态
    async ChangeSkuIsChenked({ commit }, { skuId, isChecked }) {  //func - {commit} is not be used, but it is necessary
        let result = await reqChangeSkuIOsChenked(skuId, isChecked)
        console.log("action--修改选中状态：result:", result, { commit });
        if (result.code == 200) {
            return 'ChangeSkuIsChenked: OK'
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    //deleteAllCheked,  参数 context 名字可以随便写，都一样。-- context用以接收产品的skuId
    // 派发 action 的时候不需要传参，默认传 context
    deleteAllCheked(context) {
        console.log("111:context:", context)//ok  //可以拿到很多东西
        console.log('购物车数据：拿到了吗？：：', context.getters.cartInfoListccc.cartInfoList);  // OK  //获取购物车中的数据， context.state.中也能拿到购物车的数据
        // console.log(); context.dispatch
        let PromiseAll = []
        context.getters.cartInfoListccc.cartInfoList.forEach(items => {
            if (items.isChecked == 1) {
                context.dispatch('DeleteOneShopCart', items.skuId)  // OK
                console.log("删除了一个");
                PromiseAll.push(Promise)
            }
            // context.dispatch('DeleteOneShopCart', items.skuId)
        });
        //等待都成功或有一个失败，再返回
        return Promise.all(PromiseAll)
    },
    //changeAllChecked
    changeAllChecked(context, allChecked) {
        let PromiseAll = []
        console.log('购物车数据：拿到了吗？：：', context.getters.cartInfoListccc.cartInfoList);  // OK  //获取购物车中的数据， context.state.中也能拿到购物车的数据
        context.getters.cartInfoListccc.cartInfoList.forEach(items => {
            let promise = context.dispatch('ChangeSkuIsChenked', { skuId: items.skuId, isChecked: allChecked })  // OK
            console.log("修改了一个");
            PromiseAll.push(promise)

            // context.dispatch('DeleteOneShopCart', items.skuId)
        });
        //等待都成功或有一个失败，再返回
        return Promise.all(PromiseAll)
    }
};

const getters = {
    //cartList.0.cartInfoList
    cartInfoListccc(state) {
        // return state.cartList[0].cartInfoList || [] //XXX
        // return state.cartList[0].cartInfoList || [] //XXX
        return state.cartList[0] || {}  //cartInfoList 在shopCart 组件里面计算！！
    }
};


export default {
    state,
    actions,
    mutations,
    getters,
}