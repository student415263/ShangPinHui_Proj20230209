
import Vue from "vue";

import Vuex from "vuex";

Vue.use(Vuex);

//这几个的名字不能乱写。：
//仓库：储存数据的地方：
const state = {};
//修改state的唯一手段：
const mutations = {};
//处理actions，书写自己的逻辑，书写异步：
const actions = {};
//getters可以理解为计算属性，可以让组件获取数据更加方便：
const getters = {};

//引入小仓库
import HomeStore from '@/store/Home'
import SearchStore from '@/store/Search'
import DetailStore from '@/store/Detail/index'
import ShopCartStore from '@/store/ShopCart'
import UserStore from "@/store/User"
import TradeStore from "@/store/Trade"


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    ShopCartStore,

    //小仓库
    modules:{
        HomeStore: HomeStore,
        SearchStore,
        DetailStore: DetailStore,
        ShopCartStore,
        UserStore,
        TradeStore: TradeStore,
    }
}); 