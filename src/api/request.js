
//老师那里这个文件叫  ajax.js

import axios from "axios";

import nProgress from "nprogress";
//上面有start和done方法，start进度条开始，done进度条结束。
//引入进度条样式：node_modules\nprogress\nprogress.css
//D:\1A-All\Web\webxuexi\period4_vueProject\Day48\mine_practice_project_clicreate\node_modules\nprogress\nprogress.css
import "D:/1A-All/Web/webxuexi/period4_vueProject/Day48/mine_practice_project_clicreate/node_modules/nprogress/nprogress.css";
// import "../node_modules/nprogress/nprogress.css"

import store from '@/store'

//-----创建axios实例
const requests = axios.create(
    {
        //基础路径
        baseURL:'/api',
        // 请求时间不超过五秒
        timeout:5000,
    },
);
// 请求拦截器
requests.interceptors.request.use(
    (config)=>{
        console.log("store:::",store.state.DetailStore.uuid_token);  //ok（先打印store再慢慢找）
        if (store.state.DetailStore.uuid_token) {
            //请求头后面的字段：userTempId是跟后台老师商量好的，不是想些啥就写啥
            config.headers.userTempId = store.state.DetailStore.uuid_token;
        }
        if (store.state.UserStore.userToken) {
            //token字段是后端老师定的
            console.log("request里面的请求头带的参数：", store.state.UserStore.userToken);
            config.headers.token = store.state.UserStore.userToken;
        }
        nProgress.start();
        return config;
    }, 
    (error)=>{
        Promise.reject(error)
    }
)
// 响应拦截器
requests.interceptors.response.use(
    (response)=>{
        nProgress.done();
        return response.data;
    }, 
    (error)=>{
        return (
        Promise.reject(error),
        Promise.reject(new Error('false'))
        )
    }
)
//-----------



export default requests;