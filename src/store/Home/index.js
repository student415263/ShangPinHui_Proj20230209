//这是小仓库：
//home小仓库//

import {requestCategoryList, mockReqGetBannerList} from '@/api/index.js'

//这几个的名字不能乱写。：

//仓库：储存数据的地方：
const state = {
    categoryList:[],
    bannerList:[]
};

//修改state的唯一手段：
const mutations = {
    //第一个参数是state，第二个是categoryList(好像就是reqResult.data)
    CATEGORYLIST(a, b){
        console.log('HomeMutations', a, b);
        a.categoryList = b;
    },
    GETMOCKBANNERLIST(state, bannerList){
        state.bannerList = bannerList;
    }
};

//处理actions，书写自己的逻辑、书写异步：
const actions = {
    //src\pages\Home\TypeNavigator\index.vue挂载完之后执行下面这个函数：
    async categoryList({commit}){
        // async 用于声明一个函数是异步的。 await 用于等待一个异步方法执行完成。
        let reqResult = await requestCategoryList();
        console.log('home-reqResult', reqResult);//如果没有 async 、 await ，那么返回的是个Promise对象。加了 async 、 await ，返回的是处理后的结果。
        if(reqResult.code == 200){
            commit("CATEGORYLIST", reqResult.data);
        }
    },
    //轮播图
    async getMockBannerList({commit}){
        let mockReqRes = await mockReqGetBannerList();
        if(mockReqRes.code == 200){
            commit('GETMOCKBANNERLIST', mockReqRes.data);
        }
    },
};

//getters可以理解为计算属性，可以让组件获取数据更加方便：
const getters = {};

export default {
    state,
    actions,
    mutations,
    getters,
}