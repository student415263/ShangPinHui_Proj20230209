<template>
  <div>
<!--     <h1 style="background-color:aqua">
      home
    </h1> -->

    <!-- TypeNav已经被注册为全局组件了，因此不用引入 -->
    <!-- 但是全局组件没法用，所以老办法，引入注册 -->
    <TypeNavigator/>

    <!-- <TypeNav/> -->

    <!-- //其他组件 -->
    <ListContainer></ListContainer>

    <Recommend></Recommend>

    <Rank></Rank>

    <Like></Like>

    <Floor></Floor>
    <Floor></Floor>

    <Brand></Brand>

  </div>
</template>

<script>
//不知道为啥在main.js里注册的全局组件有错误，因此在这里重新 引入 注册 一下 TypeNavigator：
import TypeNavigator from '@/pages/Home/TypeNavigator/index.vue'

//组件
import ListContainer from '/src/pages/Home/ListContainer/index.vue'
import Recommend from '/src/pages/Home/Recommend/index.vue'
import Rank from '/src/pages/Home/Rank/index.vue'
import Like from '/src/pages/Home/Like/index.vue'
import Floor from '/src/pages/Home/Floor/index.vue'
import Brand from '/src/pages/Home/Brand/index.vue'

export default {
    name: "Rou1Home",
    //不知道为啥在main.js里注册的全局组件有错误，因此在这里重新 引入 注册 一下 TypeNavigator：
    components:{
      TypeNavigator,

      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand,
    },

    mounted(){
      this.$store.dispatch('getuserLoginedInfo')
    },
}
</script>

<style>

</style>