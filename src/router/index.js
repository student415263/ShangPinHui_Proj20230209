import Vue from 'vue';

// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// import home from '../pages/Home'
const home = () => import('@/pages/Home') //懒加载
// import login from '@/pages/Login'
const login = () => import('@/pages/Login')
// import register from '@/pages/Register'
const register = () => import('@/pages/Register')
// import search from '@/pages/Search'
//search写在router里面了
// import detail from '@/pages/Detail'
// import addcartsuccess from '@/pages/AddCartSuccess'
// import shopcart from '@/pages/ShopCart'
// import trade from '@/pages/Trade'
// import pay from '@/pages/Pay'
// import paysuccess from '@/pages/PaySuccess'
// import center from '@/pages/Center'

import centerMyrder from '@/pages/Center/myOrder'
import centerGrouprder from '@/pages/Center/groupOrder'

import store from "@/store"

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

console.log('@@@@@@originPush', originPush);

//重写push方法，以解决push语法报错的那个问题，（编程式导航的一个问题：就是从第二次开始点搜索会报错的那个问题······）
//第一个参数：告诉原来的push方法你往哪跳（传递哪些参数），第二三参数是成功失败的回调，叫啥都行。
VueRouter.prototype.push = function (location, resolve, reject) {
    console.log(location, resolve, reject);
    if (resolve && reject) {
        //call可以调用函数一次，都可以篡改上下文一次。（apply也可以）
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    console.log(location, resolve, reject);
    if (resolve && reject) {
        //originReplace()这样调用的话，上下文就是Windows了，所以不这么调用，用this。
        //call可以调用函数一次，都可以篡改上下文一次。（apply也可以,apply传递参数时传递数组）
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

const routerMain = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/center',
            component: () => import('@/pages/Center'), // 这个组件有很多子组件（二级路由）
            meta: {
                showHeader: true,
                isGuard: 'shopCarAbout'
            },
            children: [
                {
                    path: '/center/myorder',
                    component: centerMyrder, // 
                    meta: {
                        showHeader: true,
                        isGuard: 'shopCarAbout'
                    },
                },
                {
                    path: '/center/grouporder',
                    component: centerGrouprder, // 这个组件有很多子组件（二级路由）
                    meta: {
                        showHeader: true,
                        isGuard: 'shopCarAbout'
                    },
                },
                {
                    path: '/center',
                    redirect: '/center/myorder'
                }
            ]
        },
        {
            path: '/paysuccess',
            component: () => import('@/pages/PaySuccess'),
            meta: {
                showHeader: true,
                isGuard: 'shopCarAbout'
            },
            beforeEnter(a, b, c) { // 只能从pay进
                if (b.path.indexOf('pay') != -1) {
                    c()
                } else {
                    c(false)
                }
            }
        },
        {
            path: '/pay',
            component: () => import('@/pages/Pay'),
            meta: {
                showHeader: true,
                isGuard: 'shopCarAbout',
                topaysuccess: true
            },
            beforeEnter(to, from, next) { // 只能从trade进入
                if (from.meta.topay) {
                    next()
                } else {
                    next(false)
                }
            }
        },
        {
            path: '/trade',
            component: () => import('@/pages/Trade'),
            meta: {
                showHeader: true,
                isGuard: 'shopCarAbout',
                topay: true,
            },
            beforeEnter: (to, from, next) => { // 订单结算交易页只能从购物车页进入
                if (from.meta.totrade) {
                    // gogogo('/Home')
                    next() 
                } else {
                    next(false)
                }
            }
        },
        {
            path: '/shopcart',
            component: () => {
                return import('@/pages/ShopCart')
            },
            meta: {
                showHeader: true,
                isGuard: 'shopCarAbout',
                totrade: true,
            }
        },
        {
            path: "/addcartsuccess", //都小写(下面的之前写的，以后注意)
            component: () => import('@/pages/AddCartSuccess'), //
            meta: {
                showHeader: true,
                isGuard: 'shopCarAbout'
            }
        },

        {
            path: "/Detail/:skuId",
            component: () => import('@/pages/Detail'),
            meta: {
                showHeader: true,
            }
        },
        {
            path: "/Home",
            component: home,
            meta: {
                showHeader: true,
            }
        },

        {
            path: "/Login",
            component: login,
            meta: {
                showHeader: false,
                isGuard: 'login'
            }
        },
        {
            path: "/Register",
            component: register,
            meta: {
                showHeader: false,
            }
        },

        {
            //接收路由跳转传过来的参数,加一个问号，表示参数可以传也可以不传，不会导致不传params参数时的路径问题
            path: "/Search/:searchValue?",
            component: () => import('@/pages/Search'), // 懒加载简写
            name: "Route1Search",
            meta: {
                showHeader: true,
            },
            /*             props:{
                            a:1,
                            b:2,
                        } */
            ////路由最常用的传params参方法：对象写法：
            props: ($route) => ({
                searchValue: $route.params.searchValue,
                k: $route.query.k.toUpperCase()
            })
        },

        //重定向：
        {
            path: '*',
            component: home,
            meta: {
                showHeader: true,
            }
        },
    ],

    // 始终滚动到顶部
    // scrollBehavior(to, from, savedPosition) {
    scrollBehavior() {
        // 始终滚动到顶部
        return { top: 0 }
    },
})

routerMain.beforeEach(async (to, from, next) => {
    console.log("to::", to, "from::", from, 'next::', next);
    // to 可以获取到 要去的 路由 的信息（包括路径, meta 等）  from 可以获取从哪个组件（获取它的路由路径等信息）去，
    console.log("router里面能拿到store里的state吗？：能:", store.state, "能拿到token吗？：能:", store.state.UserStore.userToken); //需要引入
    // 用户信息 store.state.UserStore.userAllData
    // console.log("@@@@@@@@@@@@@@@@", to);
    // next() // 以后注释掉！  // 为了后面练习方便，这里就全部都放行了（以避免反复需要登录）
    //--下面的功能都没问题，为了避免反复需要登录 ，都放行了，
    if (store.state.UserStore.userToken) {
        if (to.meta.isGuard == 'login') {
            alert("您已经登录")
            next('/Home')
        } else {
            // next()
            if (store.state.UserStore.userAllData.name) {
                next()
            } else {
                try {
                    await store.dispatch("getuserLoginedInfo")
                    next()
                } catch (error) { // 有token但是获取不到用户信息，说明token过期了
                    alert("身份信息过期，请重新登录。错误信息：", error.message)
                    await store.dispatch('userLoginout')
                    next('/Login')
                }
            }
        }
    } else {
        // next()
        let topath = to.path // 储存着想去的那个路由的地址
        if (to.meta.isGuard == 'shopCarAbout') {
            alert("请先登录")
            next('/Login?redirect=' + topath)  // query参数
        } else {
            next()
        }
    }
    /* if (to.meta.isGuard == 'login') {
        if (store.state.UserStore.userToken) {
            alert("您已经登录")
            next('/Home')
        } else {
            next()
        }
    } else {
        // next()
        if (to.meta.isGuard == 'shopCarAbout') {
            if (store.state.UserStore.userToken) {
                next()
            } else {
                alert('请先登录')
                next('/Home')
            }
        } else {
            next()
        }
    } */
})



export default routerMain

