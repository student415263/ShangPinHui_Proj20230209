//这是小仓库：
//Search小仓库//

import { requestGetSearchInfo } from "@/api";

//这几个的名字不能乱写。：
//仓库：储存数据的地方：
const state = {
    searchList:{},
};
//修改state的唯一手段：

const mutations = {
    GETSEARCHLIST(state, searchData){
        state.searchList = searchData;
    }
};
//处理actions，书写自己的逻辑，书写异步：
const actions = {
    async getSearchList({commit}, params){
        //params 是用户派发action的时候，第二个参数传递过来的，至善是一个空对象
        let result = await requestGetSearchInfo(params);
        if( result.code == 200 ){
            commit('GETSEARCHLIST', result.data)
        }
    },
};
//getters可以理解为计算属性，可以让组件获取数据更加方便：
const getters = {
    goodsList(currentState){
        // currentState参数是当前小仓库的state
        //如果前面的没有（网络嘎了，啥都没返回），那么也至少返回一个空数组。
        return currentState.searchList.goodsList || [];
    },
    trademarkList(currentState){
        // currentState参数是当前小仓库的state
        return currentState.searchList.trademarkList;
    },
    attrsList(currentState){
        // currentState参数是当前小仓库的state
        return currentState.searchList.attrsList;
    },
};

export default {
    state,
    actions,
    mutations,
    getters,
}