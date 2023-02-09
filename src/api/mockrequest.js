
//老师那里这个文件叫  mockAjax.js

import axios from "axios";

import nProgress from "nprogress"; 
//上面有start和done方法，start进度条开始，done进度条结束。
//引入进度条样式：node_modules\nprogress\nprogress.css
//D:\1A-All\Web\webxuexi\period4_vueProject\Day48\mine_practice_project_clicreate\node_modules\nprogress\nprogress.css
import "D:/1A-All/Web/webxuexi/period4_vueProject/Day48/mine_practice_project_clicreate/node_modules/nprogress/nprogress.css";
// import "../node_modules/nprogress/nprogress.css"

//-----
const mockRequests = axios.create(
    {
        baseURL:'/mock',
        timeout:5000,
    },
);
mockRequests.interceptors.request.use(
    (config)=>{
        nProgress.start();
        return config;
    }, 
    (error)=>{
        Promise.reject(error)
    }
)
mockRequests.interceptors.response.use(
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



export default mockRequests;