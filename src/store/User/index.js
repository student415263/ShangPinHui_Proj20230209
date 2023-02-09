import { reqGetPhoneCode } from "@/api"
import { reqFinishUserRegister } from "@/api"
import { reqLogin } from "@/api"
import { reqUserLoginedInfo } from "@/api"
import { reqLoginout } from "@/api"

const state = {
    // userToken: '',
    // 91WF5AS54ADFO9B    就是    token     的    Key
    userToken: localStorage.getItem("91WF5AS54ADFO9B"),
    userAllData: {}, // 这玩意是个对象
}

const mutations = {
    LOGIN(state, token) {
        state.userToken = token
    },
    GETUSERLOGINEDINFO(state, userData) {
        state.userAllData = userData
    },
    // 退出登录成功后，删除本地的 token
    CLEARUSERINFO(state){
        state.userToken = '',
        state.userAllData = {}
        localStorage.removeItem("91WF5AS54ADFO9B")
    }
}

const actions = {

    async getPhoneCode(context, phone) {
        let result = await reqGetPhoneCode(phone)
        console.log("获取手机号", result);
        if (result.code == 200) {
            return "getPhoneCode --ok"
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    async FinishUserRegister({ comments }, user) {
        let result = await reqFinishUserRegister(user)
        console.log("FinishUserRegister", result, { comments });
        console.log("注册的action已经被派发了！！");
        if (result.code == 200) {
            //注册成功
            return 'ok';
        } else {
            //注册失败
            return Promise.reject(new Error(result.message));
        }
    },

    async login({ commit }, user) {
        let a = await reqLogin(user)
        console.log("Login登录请求被发送了，结果：", a, commit);
        // a.data 里面有一个token属性（服务器给我们的一个唯一表示，服务器区分我们是谁）
        // token 有点像是 uuid （ 用户的唯一标识 ）
        if (a.code == 200) {
            //成功
            commit("LOGIN", a.data.token)
            // 把 token 本地化存储： 
            localStorage.setItem("91WF5AS54ADFO9B", a.data.token)
            return 'ok';
        } else {
            //失败
            return Promise.reject(new Error(a.message));
        }
    },

    //get user info (phoneNum & password)
    async getuserLoginedInfo(context) {
        let a = await reqUserLoginedInfo() //  ok
        console.log("getuserLoginedInfo", a);  // ok 200
        if (a.code == 200) {
            context.commit("GETUSERLOGINEDINFO", a.data)
            return 'getuserLoginedInfo --ok';
        } else {
            //失败
            return Promise.reject(new Error(a.message));
        }
    },

    async userLoginout(context) {
        let a = await reqLoginout()
        console.log("是否退出成功？ ：", a);
        if (a.code == 200) {
            // action 不能操作 state , 要提交 mutations 去删除
            context.commit("CLEARUSERINFO")
            return 'userLoginout --OK'
        } else {
            return Promise.reject(new Error(a.message));
        }
    }
}

const getters = {}


export default {
    state,
    actions,
    mutations,
    getters,
}