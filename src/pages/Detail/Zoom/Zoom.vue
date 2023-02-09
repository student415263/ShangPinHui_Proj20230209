<template>
  <div class="spec-preview" ref="box">
    <!-- <img src="../images/s1.png" /> -->
    <!-- <img :src="skuImageList[0].imgUrl" /> -->

    <!-- 底下的那个图片 -->
    <img :src="imgUrlComputed.imgUrl" />

    <!-- 放事件的，鼠标动，mask那个div就动 -->
    <div class="event" @mousemove="handle"></div>

    <!-- 右边放大后的图片 -->
    <div class="big">
      <!-- <img src="../images/s1.png" /> -->
      <img :src="imgUrlComputed.imgUrl" ref="bigImg"/>
    </div>

    <!-- 绿色遮罩层 -->
    <div class="mask" ref="mask"></div>

  </div>
</template>

<script>
  export default {
    name: "Page2Zoom",

    data() {
      return {
        itsCurrentIndex: 0,
      }
    },

    props: ["skuImageList"],

    computed: {
      imgUrlComputed(){
        return this.skuImageList[this.itsCurrentIndex] || {}
      }
    },

    methods: {
      handle(event){
        // alert('1')
        let mask = this.$refs.mask; //获取mask那个元素: 
        let box = this.$refs.box;
        // console.log(mask);  //获取到的就是一个div元素，不是对象啥的。
        // console.log("function.handle",this);//ok
        // console.log("function.handle.event",event);//ok
        ////-- offsetX 鼠标距离父级元素的距离，offsetWidth她的宽度
        let left = event.offsetX - mask.offsetWidth / 2;
        let top = event.offsetY - mask.offsetHeight / 2;
        let bigImg = this.$refs.bigImg;  //拿到放大镜
        //约束：下面这一大坨是我自己写的
        if (left < 0) {
          left = 0
        }
        if (top < 0) {
          top = 0
        }
        if (left > box.offsetWidth - mask.offsetWidth) {
          left = box.offsetWidth - mask.offsetWidth
        }
        if (top > box.offsetHeight - mask.offsetHeight) {
          top = box.offsetHeight - mask.offsetHeight
        }
        // console.log(left,top);//ok
        mask.style.left = left  + "px";
        mask.style.top = top + 'px';//ok
        bigImg.style.left = -2 * left + 'px';  //这是放大镜
        bigImg.style.top = -2 * top + "px";
      }
    },

    mounted(){
      //获取兄弟传过来的数据:
      this.$bus.$on('getClickIndex', (aaaCurrentIndex)=>{
        console.log("asdsadasdasd itsCurrentIndex", aaaCurrentIndex);
        this.itsCurrentIndex = aaaCurrentIndex;
      })
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {//
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>