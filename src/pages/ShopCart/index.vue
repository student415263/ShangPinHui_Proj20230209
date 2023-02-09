<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">

        <!-- //-- cartInfoList 数据解释：
          cartPrice:6999
          couponInfoList:null
          createTime:"2023-01-16 21:02:06"
          id:35805
          imgUrl:"http://47.93.148.192:8080/group1/M00/00/01/rBHu8l-rfvmAcbl2AAFopp2WGBQ404.jpg"
          isChecked:1
          isOrdered:0
          operateTime:"2023-01-16 21:31:04"
          orderTime:null
          skuId:2
          skuName:"小米10 至尊纪念版 双模5G 骁龙865 120W快充 12GB+256GB 陶瓷黑 游戏手机"
          skuNum:4
          skuPrice:6999
          sourceId:2
          sourceType:"QUERY"
          userId:"a90dba65-ddda-4305-90b9-0e3d09dab37f"
        -->

        <ul class="cart-list" v-for="(a, index) in cartInfoList" :key="index">

          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="a.isChecked == 1"
              @click="methodsChangeSkuIsChenked(a.skuId, $event)">
          </li>
          <li class="cart-list-con2">
            <!-- <img src="./images/goods1.png"> -->
            <img :src="a.imgUrl">
            <!-- <div class="item-msg">米家（MIJIA） 小米小白智能摄像机增强版 1080p高清360度全景拍摄AI增强</div> -->
            <div class="item-msg">{{ a.skuName }}</div>
          </li>
          <!-- <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li> -->
          <li class="cart-list-con4">
            <span class="price">{{ a.cartPrice }}</span>
          </li>
          <!-- // 数量 -->
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeShopCarSkuNum('dec', -1, a)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="a.skuNum"
              @change="changeShopCarSkuNum('inp', ($event.target.value - a.skuNum) * 1, a)">
            <a href="javascript:void(0)" class="plus" @click="changeShopCarSkuNum('inc', 1, a)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ a.cartPrice * a.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet curPoint" @click="methodsDeleteOneShopCart(a.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>

        </ul>

        <!-- <ul class="cart-list">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" id="" value="">
          </li>
          <li class="cart-list-con2">
            <img src="./images/goods2.png">
            <div class="item-msg">华为（MIJIA） 华为metaPRO 30 浴霸4摄像 超清晰</div>
          </li> -->
        <!-- <li class="cart-list-con3">
            <div class="item-txt">黑色版本</div>
          </li> -->
        <!-- <li class="cart-list-con4">
            <span class="price">5622.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins">-</a>
            <input autocomplete="off" type="text" value="1" minnum="1" class="itxt">
            <a href="javascript:void(0)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">5622</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul> -->

        <!-- <ul class="cart-list">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" id="" value="">
          </li>
          <li class="cart-list-con2">
            <img src="./images/goods3.png">
            <div class="item-msg">iphone 11 max PRO 苹果四摄 超清晰 超费电 超及好用</div>
          </li> -->
        <!-- <li class="cart-list-con3">
            <div class="item-txt">墨绿色</div>
          </li> -->
        <!-- <li class="cart-list-con4">
            <span class="price">11399.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins">-</a>
            <input autocomplete="off" type="text" value="1" minnum="1" class="itxt">
            <a href="javascript:void(0)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">11399</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul> -->
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="allChecked && cartInfoList.length > 0" @click="changeAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a class="curPoint" @click="deleteAllCheked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalSum }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="toTradeCom">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',

  // beforeCreate(){
  //   this.$store.dispatch('getShopCartList')
  // },

  mounted() {
    this.$store.dispatch('getShopCartList')
  },

  updated() {

  },

  computed: {
    ...mapGetters(['cartInfoListccc' || []]),  //OK 组件身上有了
    cartInfoList: function () {
      return this.cartInfoListccc.cartInfoList || []
    },

    /**
      every()
      调用every()并不能改变数组的值，只能检测数组中的每个值是否满足给定的条件。
      当遍历到某一个值不满足条件时，函数立即返回false，不再继续遍历。
      当数组中的每一个值都满足给定的条件时，函数返回true。
      forEach()
      从头到尾的遍历数组，可以改变数组的值。
      为数组中的每个元素都执行一遍传递给forEach()的回调函数
     */
    totalSum: function () {
      let aaasun = 0;
      this.cartInfoList.forEach(item => {
        aaasun += item.skuPrice * item.skuNum
      });
      return aaasun
    },

    allChecked: function () {
      //array.every()  是遍历每一个元素。
      //下面的这一坨的意思是，如果每一个item的isChecked都是1，就返回true，否则返回false
      return this.cartInfoList.every((item) => {
        return item.isChecked == 1
      }) //可以简写  /*  == true ? '1' : '0' */
    },
    // allNoCheked: function(){
    //   return this.cartInfoList.every(item => {
    //     return item.isChecked == 0
    //   })
    // }

  },


  methods: {
    toTradeCom(){
      this.$router.push('/trade') // ok
    },

    // Checked All 全（不）选功能  
    changeAllChecked: throttle(async function (event) {
      console.log("changeAllChecked", event.target.checked); // ok

      try {
        let aaachecked = event.target.checked ? '1' : '0' // ok 但看不懂
        // console.log("checked", aaachecked);
        await this.$store.dispatch('changeAllChecked', aaachecked)
        this.$store.dispatch('getShopCartList')  // 成功执行本条
      } catch (error) {
        alert(error.message)  // 失败执行本条
      }
    }, 200),
    /*     changeAllChecked: throttle(async function(){ 
          // if (this.allChecked) {
          // }
          try {
            await this.$store.dispatch("changeAllChecked")
            this.$store.dispatch('getShopCartList')  // 成功执行本条
          } catch (error) {
            alert(error.message)  // 失败执行本条
          }
        },700), */

    // 删除全部选中的商品
    deleteAllCheked: throttle(async function () {
      // 因为不能直接拿到a.skuId，所以先派发一个action
      try {
        await this.$store.dispatch("deleteAllCheked")
        this.$store.dispatch('getShopCartList')  // 成功执行本条
      } catch (error) {
        alert(error.message)  // 失败执行本条
      }
    }, 1000),

    //单个商品的选中与否：
    methodsChangeSkuIsChenked: throttle(function (skuId, event) {
      let aaaa
      if (event.target.checked == true) {
        aaaa = '1'
      } else {
        aaaa = '0'
      }
      try {
        this.$store.dispatch('ChangeSkuIsChenked', {
          skuId,
          isChecked: aaaa
        })
        this.$store.dispatch('getShopCartList')
      } catch (error) {
        alert(error.message)
      }
    }, 900),

    /*  
    decreaseShopCarSkuNum(){ // +  //no used
    },*/
    // // + - inp
    changeShopCarSkuNum: throttle(async function (type, variableQuantity, cart) { //   +  -  input 三个都是这个methods
      //type：知道点的那个。。variableQuantity知道变化量改变多少。。cartSkuId知道点的哪个商品
      // console.log('type', type, variableQuantity, cartSkuId); // OK
      let TRUEVariableQuantity
      switch (type) {
        case 'inc': // +
          if (cart.skuNum < 99) {
            variableQuantity = 1
          } else {
            variableQuantity = 0
          }
          break;

        case 'dec': // -
          if (cart.skuNum > 1) {
            variableQuantity = -1
          } else {
            variableQuantity - 0
          }
          break;

        case 'inp':
          // input 里 传的那个target.value已经减去了原来的skuNum，是变化量，并且这个变化量已经乘了 1
          // let testariableQuantity =  variableQuantity  /XX
          // -- 先处理输入的非正常情况：
          if (isNaN(variableQuantity)) { //如果 输入的那个值 是NaN （原来参数乘了 1 ）
            variableQuantity = 1;
          } else {
            if (variableQuantity < -97) {
              variableQuantity = -99;
            } else {
              if (variableQuantity > 97) {
                variableQuantity = 99;
              } else {
                TRUEVariableQuantity = Math.ceil(variableQuantity);
              }
            }
          }
          // this.skuNum = parseInt(inputValue);
          TRUEVariableQuantity = Math.ceil(variableQuantity);
          console.log("修正后的：TRUE:targetValue", TRUEVariableQuantity);
          // 赋值给原来的参数：
          variableQuantity = TRUEVariableQuantity
          console.log("重新赋值给 variableQuantity:", variableQuantity);  // OK
          break;
        // default:
        //   break;
      }
      try { // 代表的是 如果修改成功：
        //console.log('variableQuantity:', variableQuantity); //OK
        await this.$store.dispatch(
          'postAddSkuShopCar', //在 detail.js 的store里
          { skuId: cart.skuId, skuNum: variableQuantity } // 带过去的是变化量，而不是变化后得到的数
        )
        this.$store.dispatch('getShopCartList')
      } catch (error) { // 如果失败：
        alert(error.message)
      }
    }, 1000),
    //-- + - inp  不节流时的函数备份：
    /* async changeShopCarSkuNum(type, variableQuantity, cart){ //   +  -  input 三个都是这个methods
      //type：知道点的那个。。variableQuantity知道变化量改变多少。。cartSkuId知道点的哪个商品
      // console.log('type', type, variableQuantity, cartSkuId); // OK
      let TRUEVariableQuantity
      switch (type) {
        case 'inc': // +
            if (cart.skuNum < 99) {
              variableQuantity = 1
            } else {
              variableQuantity = 0
            }
          break;

        case 'dec': // -
            if (cart.skuNum > 1) {
              variableQuantity = -1
            } else {
              variableQuantity - 0
            }
          break;

        case 'inp':
            // input 里 传的那个target.value已经减去了原来的skuNum，是变化量，并且这个变化量已经乘了 1
            // let testariableQuantity =  variableQuantity  /XX
            // -- 先处理输入的非正常情况：
            if (isNaN(variableQuantity)) { //如果 输入的那个值 是NaN （原来参数乘了 1 ）
              variableQuantity = 1;
            } else {
              if (variableQuantity < -97) {
                variableQuantity = -99;
              } else {
                if (variableQuantity > 97) {
                  variableQuantity = 99;
                } else {
                  TRUEVariableQuantity = Math.ceil(variableQuantity);
                }
              }
            }
            // this.skuNum = parseInt(inputValue);
            TRUEVariableQuantity = Math.ceil(variableQuantity);
            console.log("修正后的：TRUE:targetValue", TRUEVariableQuantity);
            // 赋值给原来的参数：
            variableQuantity = TRUEVariableQuantity
            console.log("重新赋值给 variableQuantity:", variableQuantity);  // OK
          break;
        // default:
        //   break;
      }
      try { // 代表的是 如果修改成功：
        //console.log('variableQuantity:', variableQuantity); //OK
        await this.$store.dispatch(
          'postAddSkuShopCar', //在 detail.js 的store里
          {skuId: cart.skuId, skuNum: variableQuantity } // 带过去的是变化量，而不是变化后得到的数
        )
        this.$store.dispatch('getShopCartList')
      } catch (error) { // 如果失败：
        alert(error.message)
      }
    }, */

    // 删除  加上节流(加不加都行), 注意async放的地方： //-- a.throttle(function(X){XXX}, 100)
    methodsDeleteOneShopCart: throttle(async function (skuId) {
      console.log("Delete--skuID::", skuId); //OK
      try { //methodsDeleteOneShopCart
        await this.$store.dispatch('DeleteOneShopCart', skuId)
        this.$store.dispatch('getShopCartList')
      } catch (error) {
        alert(error.message)
      }
    }, 700)

    /*不节流时：源代码备份：  async methodsDeleteOneShopCart(skuId){
       console.log("Delete--skuID::", skuId); //OK
 
       try { //methodsDeleteOneShopCart
         await this.$store.dispatch('DeleteOneShopCart', skuId)
         this.$store.dispatch('getShopCartList')
       } catch ( error) {
         alert(error.message)
       }
     }
  */
  }

}
</script>

<style lang="less" scoped>
.curPoint {
  cursor: pointer;

  &:hover {
    color: blue !important;
  }
}

.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 8.1667%;
        }

        .cart-list-con2 {
          width: 41.8%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;

        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>