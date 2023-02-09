<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img, index) in skuImageList" :key="img.id"
        :class="{active: index == currentIndex}"
        @click="changeCurrentIndex(index)"
      >
        <img :src="img.imgUrl">
        <!-- skuInfo.skuImageList.0.imgUrl -->
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: "Page2ImageList",

  data() {
    return {
      currentIndex: 0,
    }
  },

  props: ["skuImageList"],

  // computed: { 
  //   imgUrlComputed(){
  //     return this.skuImageList[0] || {}
  //   }
  // }

  watch: {
    skuImageList() {
      this.$nextTick(() => {
        new Swiper('.swiper-container', {
          //direction: 'vertical', // 垂直切换选项
          //loop: true, // 循环模式选项
          slidesPerView :3,
          slidesPerGroup :3,

          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },

        })
      })
    }
  },

  methods :{
    changeCurrentIndex(index){
      this.currentIndex = index;  
      this.$bus.$emit('getClickIndex', this.currentIndex);
    },

  },

}
</script>

<style lang="less" scoped>

.swiper-container {
  height: 56px;
  width: 402px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;
      padding: 1.5% 29.2%;

      // .active {
      //   border: 1px solid #f60;
      //   // padding: 1px;
      // }

      &:hover {
        border: 1px solid rgb(238, 131, 60);
        // padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
.active {
  border: 1px solid #f60;
  // height: 40px;
  box-sizing: border-box;
}
</style>