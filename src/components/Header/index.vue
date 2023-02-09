<template>
    <!--  -->
    <!-- 头部 -->
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p v-if="!userInfo">
                        <span>请</span>
                        <!-- <a href="###">登录</a> -->
                        <router-link to="/Login">登录</router-link>
                        <router-link class="register" to="/Register">免费注册</router-link>
                        <!-- <a href="###" class="register">免费注册</a> -->
                    </p>
                    <p v-if="userInfo">
                        <span>欢迎&nbsp;</span>
                        <!-- <a href="###">登录</a> -->
                        <!-- 下面这俩的to地址应该改，以后改 -->
                        <a class="allcursor">{{ userInfo }}</a>
                        <a class="register allcursor"  @click="loginout">退出登录</a>
                        <!-- <a href="###" class="register">免费注册</a> -->
                    </p>
                </div>
                <div class="typeList">
                    <a class="allcursor" @click="tocenter">我的订单</a>
                    <!-- <a href="###">我的购物车</a> -->
                    <router-link to="/shopcart">我的购物车</router-link>
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <router-link class="logo" title="尚品汇" to="/home" target="_blank">
                    <img src="./images/logo.png" alt="">
                </router-link>
                <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
                  <img src="./images/logo.png" alt="">
              </a> -->
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="searchValue"
                        v-on:keydown.enter="enterGoSearch" />
                    <button class="sui-btn btn-xlarge btn-danger" type="button" v-on:click="goSearch">
                        搜索
                    </button>
                </form>
            </div>
        </div>
    </header>

</template>


<script>
export default {
    name: 'Com1Header',
    data() {
        return {
            searchValue: '',
            // userInfo: ''
        }
    },
    mounted() {
        /*   clearKeyword(){
          } */
        this.$bus.$on("clearKeyword", () => {
            this.keyword = ''; //--不造是不是这个
            this.searchValue = ''; //--或者是这个

        });
    },
    computed: {
        userInfo: function(){
            return this.$store.state.UserStore.userAllData.name
        }
    },
    methods: {

        goSearch() {
            //也可以实现跳转
            //1-字符串写法：/+传一个params参数，和一个k=XXX的query参数
            /*             this.$router.push('/Search/'+this.searchValue+'?k='+this.searchValue.toUpperCase()); */
            //2-模板字符串：
            /*             this.$router.push(`/Search/${this.searchValue}?k=${this.searchValue.toUpperCase()}`) */
            //3-对象写法- 常用：
            let result1 = this.$router.push(
                //promise的第一个参数
                {
                    //用name最好。如果用path而不用name，会导致无法传递params的参数
                    name: "Route1Search",
                    params: {
                        //undefined防止params参数传递空字符串导致路径问题。空字符串为false
                        searchValue: this.searchValue || undefined
                    },
                    query: {
                        k: this.searchValue.toUpperCase()
                    }
                },
                //新版的vue-router的push方法本质上是一个promise函数，需要传入成功或者是白的回调。
                //所以传入成功或者失败的回调就好了，没有异常了。
                //但是我们在router.js里重写了push方法，一劳永逸的解决了这个异常。所以下面的两个回调注释掉了。
                /*                 () => {
                
                              },
                              (error) => {
                                  console.log(error);
                              } */
            )
            console.log(result1);//返回的是一个promise
            console.log('@@@@@@@', this.$router);

            console.log('####@#$#$location : ', location);

        },
        enterGoSearch() {
            this.goSearch()
        },
        async loginout(){
            // alert("111")
            // 发请求，退出登录，服务器清除一些数据，   // ok
            // 删除本地的一些数据，比如 token 的数据  // ok
            try {
                await this.$store.dispatch('userLoginout')
                this.$router.push("/Home") // 退出登录后要回到 home 主页
            } catch (error) {
                alert(error.message)
            }
        },
        tocenter(){
            this.$router.push({path: '/center'})
        }
    },
}
</script>


<style scoped lang="less">
.header {

    // 
    &>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;
                margin-left: 10px;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    &+a {
                        border-left: 1px solid #b3aeae;
                    }
                }

            }

        }
    }

    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>