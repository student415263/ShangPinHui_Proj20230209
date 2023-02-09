<template>
  <div>
    <!-- <SearchSelector /> -->
    <TypeNavigator />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- //-- -->
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i
                @click="closeBreadCategoryName">×</i></li>
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="closeBreadKeyword">×</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(":")[1] }}<i
                @click="closeBreadTrademark">×</i></li>
            <!-- //-- 平台售卖属性的面包屑 -->
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">
              {{ attrValue.split(':')[1] }}
              <i @click="closeBreadAttrValue(index)">×</i>
            </li>
            <!--             <li class="with-x">iphone<i>×</i></li>
            <li class="with-x">华为<i>×</i></li>
            <li class="with-x">OPPO<i>×</i></li> -->
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trandemarkInfo='trandemarkInfo' @attrInfo='attrInfo' />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- //--排序的结构 -->
              <ul class="sui-nav">
                <li :class="{ active: searchParams.order.includes('1') }">
                  <a href="#" @click="changeOrder('1')">综合
                    <span v-show="searchParams.order.includes('1:asc')">↑</span>
                    <span v-show="searchParams.order.includes('1:desc')">↓</span></a>
                </li>
                <li>
                  <a href="#" style="opacity: 0.6">销量</a>
                </li>
                <li>
                  <a href="#" style="opacity: 0.6">新品</a>
                </li>
                <li>
                  <a href="#" style="opacity: 0.6">评价</a>
                </li>
                <li :class="{ active: searchParams.order.includes('2') }">
                  <a href="#" @click="changeOrder('2')">价格<!--⬆-->
                    <span v-show="searchParams.order.includes('2:asc')">↑</span>
                    <span v-show="searchParams.order.includes('2:desc')">↓</span>
                    <!-- //--老师这样写的：isOne是一个计算属性，就是我写的那种判断是否包含1之类的计算属性，不过来时用的.indexOf
                      <li :class="{ active: isOne }" @click="changeOrder">
                        //-- :class="{"icon-UP":isAsc, "icon-DOWN":isDesc} 有Asc（isAsc计算属性，yongdeindexOf）的时候显示icon-UP（百度iconfont） //--
                        <a>综合<span v-show="isOne" class="iconfont" :class="{"icon-UP":isAsc, "icon-UP":isDesc}"></a>
                      </li>
                    -->
                  </a>
                </li>
                <!-- <li>
                  <a href="#">价格⬇</a>
                </li> -->
              </ul>
            </div>
          </div>
          <!-- //-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <!-- //--- -->
              <li class="yui3-u-1-5" v-for="(goodListaaa, index) in goodsList" :key="goodListaaa.id || index">
                <!-- 数据库：
                  attrs:null
                  category1Id:null
                  category1Name:null
                  category2Id:null
                  category2Name:null
                  category3Id:null
                  category3Name:null
                  createTime:null
                  defaultImg:"http://47.93.148.192:8080/group1/M00/00/01/rBHu8l-rfvmAcbl2AAFopp2WGBQ404.jpg"
                  hotScore:0
                  id:2
                  price:6999
                  title:"小米10 至尊纪念版 双模5G 骁龙865 120W快充 12GB+256GB 陶瓷黑 游戏手机"
                  tmId:null
                  tmName:null
                 -->
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 带params参数 -->
                    <router-link :to="`/Detail/${goodListaaa.id}`">
                      <!-- <a href="item.html" target="_blank"> -->
                      <img :src="goodListaaa.defaultImg" />
                      <!-- </a> -->
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ goodListaaa.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{
                      goodListaaa.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
              <!--               <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile02.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">Apple苹果iPhone
                      6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile03.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">Apple苹果iPhone
                      6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile04.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">Apple苹果iPhone
                      6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile05.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">Apple苹果iPhone
                      6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile06.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">Apple苹果iPhone
                      6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile01.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">Apple苹果iPhone
                      6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile02.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">Apple苹果iPhone
                      6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile03.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">Apple苹果iPhone
                      6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-5">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/mobile04.png" />
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">Apple苹果iPhone
                      6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)Apple苹果iPhone 6s (A1699)</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li> -->
            </ul>
          </div>
          <!-- //--分页器 -->
          <div class="fr page">
            <!-- //--分页器 -->
            <!-- //--total是一共有多少，continue是连续页码为多少 -->
            <PaginationMine :pageNo=searchParams.pageNo :pageSize=searchParams.pageSize :total=total :continue="5"
              @getPageNo="getPageNo"><!--这哥几个是用来测试的假数据-->
            </PaginationMine>
            <!-- <div class="sui-pagination clearfix">

              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div> -->
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import TypeNavigator from '@/pages/Home/TypeNavigator/index.vue'
import SearchSelector from './SearchSelector/SearchSelector'
import { mapState } from 'vuex';//
import { mapGetters } from 'vuex';
// import { map }
import PaginationMine from '@/components/Pagination';
export default {
  name: 'ComSearch',

  components: {
    SearchSelector,
    TypeNavigator,

    PaginationMine,
  },

  data() {
    return {
      searchParams: {
        "category1Id": "", //一级分类的ID
        "category2Id": "",
        "category3Id": "",
        "categoryName": "",
        "keyword": "", //关键字
        "order": "1:desc", //排序用的：1综合排序，2价格排序。asc升序，desc降序。默认: 1：desc
        "pageNo": 1, //默认第几页
        "pageSize": 10, //默认每一页多少个商品，（可能还需要一个total：所有分页器一共多少数据）
        "props": [],
        "trademark": ""
      }
    }
  },

  beforeMount() {
    /*       this.searchParams.category1Id = this.$route.query.category1Id;
          this.searchParams.category2Id = this.$route.query.category2Id;
          this.searchParams.category3Id = this.$route.query.category3Id; */

    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },

  mounted() {
    this.$store.dispatch('getSearchList', this.searchParams)
  },

  computed: {
    ...mapState({
      // goodsList: (state) => {
      //mapState是区分哪一个仓库的
      //   return state.searchStore.searchList.goodsList
      // }
    }),
    //mapGetters不区分哪一个仓库, mapGetters里面是一个数组写法。
    ...mapGetters(['goodsList']),
    ...mapState({
      total: state => state.SearchStore.searchList.total,
      //searchList.total
    })
  },

  methods: {
    getSearchListData() {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    closeBreadCategoryName() {
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // 显示默认的
      this.getSearchListData();
      // 改变路径
      if (this.$route.params) {
        this.$router.push({ "name": "Route1Search", params: this.$route.params })
      } /* else (
          this.$router.push({name: "Route1Search"})
        ) */
    },
    closeBreadKeyword() {
      this.searchParams.keyword = undefined;
      this.getSearchListData();
      this.$bus.$emit('clearKeyword');
      this.$router.push({ "name": "Route1Search", query: this.$route.query })
    },

    trandemarkInfo(a) {
      this.searchParams.trademark = `${a.tmId}:'${a.tmName}'`
      this.getSearchListData();
    },
    closeBreadTrademark() {
      this.searchParams.trademark = undefined;
      this.getSearchListData();
    },
    //手机平台属性 的 回调函数. (应该有两个参数)
    attrInfo(attr,) {
      let attrInfoProps = `${attr.attrId}:${attr.attrValue}:${attr.arreName}`;
      //-- 数组去重
      if (this.searchParams.props.indexOf(attrInfoProps) == -1) {
        this.searchParams.props.push(attrInfoProps);
      }
    },
    closeBreadAttrValue(index) {
      //删除第index个，删除 1 个
      this.searchParams.props.splice(index, 1)
      this.getSearchListData();
    },
    //--排序操作
    changeOrder(flag) {
      // this.searchParams.order = '???'//XXXXX
      // if (1=1) {
      //获取初始or当前的排序方式；（因为需要根据初始状态or当前状态来判断下一个动作该做什么）
      let originOrder = this.searchParams.order;// log: //默认值1:desc  // --但是后面都是会变的！！！！！！！！
      let originFlag = this.searchParams.order.split(":")[0]; // 1  //--如果是点了价格排序，这里就是2了，
      let originSort = this.searchParams.order.split(":")[1]; // desc  //--会变，具体事件具体分析
      // --
      console.log("：：：：originOrder,--originFlag,---originSort：：：：", originOrder, originFlag, originSort);
      let newOlder = '';
      // }
      // -- //是1 的情况下：//--如果是点了价格排序，这里就是2了  是originFlag的情况下，originFlag是拆分order来的
      if (flag == originFlag) { //-- //--是1 的情况下： //--//--如果是点了价格排序，这里就是2了，（也就是判断：这次点的按钮是不是跟上一个点的按钮一样）
        // console.log("111125555");
        newOlder = `${originFlag}:${originSort == 'desc' ? "asc" : "desc"}`;
        this.searchParams.order = newOlder; //--    order会变！！
        this.getSearchListData();
      } else {
        newOlder = `${flag}:${originSort == 'desc'}`;  //--这一行更完美，这一行每次点新按钮默认降序desc
        // newOlder = `${flag}:${originSort == 'desc'?"asc":"desc"}`;//--这样也行，功能不同。这一行升序降序取决于上一次是升序还是降序（的取反）
        this.searchParams.order = newOlder; //--    order会变！！
        this.getSearchListData();
      }
    },
    //自定义事件，（分页器子组件给本组件传数据）
    getPageNo(aPageNo) {
      console.log(aPageNo);
      this.searchParams.pageNo = aPageNo;
      this.getSearchListData();
    },

  },

  watch: {
    // 处理第二次及以后的搜索请求。
    $route(newValue, oldValue) {
      console.log('new AND oldValue:', newValue, oldValue);
      //重新整理参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // 重新发ajax请求
      this.getSearchListData();
      // 吧参数重置一下
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>