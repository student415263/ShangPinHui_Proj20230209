<template>
  <!--   <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
  <div>
    <HeaderIndex></HeaderIndex>
    <router-view></router-view>
    <FooterIndex v-show="$route.meta.showHeader"></FooterIndex>
  </div>
</template>

<script>
import HeaderIndex from './components/Header/index.vue';
import FooterIndex from './components/Footer/index.vue';

export default {
  name: 'App',
  components: {
    HeaderIndex,
    FooterIndex,
  },
  // 下面这个也不完全对， 可以注掉
  updated() {
    this.$store.dispatch('getuserLoginedInfo')
  }
}
</script>

<style lang="less">
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
.allcursor {
  &:hover {
    cursor: pointer;
  }
}
</style>
