import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//我不知道为什么，全局组件有错。
//全局组件----引入组件--导航栏：
// import TypeNav from '/src/pages/Home/TypeNavigator/index.vue'
//全局组件应该放在components中。
// import TypeNavigator from '@/components/TypeNavigator'
//第一个参数：组件的名字，哪一个组件，
// Vue.component(TypeNav.name, TypeNav);
// Vue.component('Rou2TypeNav', TypeNav);
//--全局组件pagination
// import Pagination from "@/components/Pagination"
// Vue.component(Pagination.name, Pagination)

//引入VueRouter
// import VueRouter from 'vue-router'
// Vue.use(VueRouter)
//VueRouter在./router/index.js里面，所以这里不必引入了，

// Vuex在store里面被引入了，


//引入路由器
import router from './router'

//vuex那个
import store from './store'

// import mockServer from './mock/mockServer'

//API 
import * as API from "@/api"

// element
import { Button, MessageBox } from 'element-ui';
Vue.use(Button); // or:  (这一行 和 下一行 都可以，都能跑)
// Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;


//测试代码，可以删掉（最好删掉）
import { requestCategoryList } from '@/api/index.js'
requestCategoryList();

import { requestGetSearchInfo } from '@/api/index'
requestGetSearchInfo({});

import "swiper/css/swiper.css"

//-----  图片懒加载  search from Vue-lazyload
import VueLazyload from 'vue-lazyload'
// const loadimage = require('./assets/loading.gif')
const loadimage = require('./assets/111.gif') // 必须得是gif，不能是jpg
// const errorimage = require('./assets/error.gif')
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: errorimage,
  loading: loadimage,
  attempt: 1
})

//-----表单验证
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
const veevalidataconfig = {
  aria: true,
  classNames: {},
  classes: false,
  delay: 0,
  dictionary: null,
  errorBagName: 'errors', // change if property conflicts
  events: 'input|blur',
  fieldsBagName: 'fields',
  i18n: null, // the vue-i18n plugin instance
  i18nRootKey: 'validations', // the nested key under which the validation messages will be located
  inject: true,
  locale: 'zh-CN',
  validity: false,
  useConstraintAttrs: true
}
Vue.use(VeeValidate, veevalidataconfig);
VeeValidate.Validator.localize('zh_CN', { // 校验规则
  messages: {
    ...zh_CN.messages,
    isSame: (field) => `${field}必须与密码相同`, // 关于两次密码相等的那个
  },
  attributes: {  // 匹配中文字段以提示错误信息
    phone: '手机号',
    code: '验证码',
    firstPassword: '密码',
    lastPassword: '确认密码',
    agree: '协议',
  },
}),
  VeeValidate.Validator.extend("agree", {  // 自定义检验规则。第一个参数是规则名字，第二个参数是个对象。
    validate: value => {
      return value
    },
    getMessage: (field) => {
      return `${field}必须同意`
    }
})

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // mockServer,
  router,
  store,
}).$mount('#app')
