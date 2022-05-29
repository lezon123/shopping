import Vue from 'vue'
import App from './App.vue'
import { Button, MessageBox } from 'element-ui'
// 引入图片懒加载插件
import VueLazyLoad from 'vue-lazyload'
// 注册插件
import vueImg from '@/assets/logo.png'
Vue.use(VueLazyLoad, {
  // 懒加载默认的图片
  loading: vueImg
})

// 三级联动组件-------全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 参数1:全局组件的name, 参数2:对应的组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入请求接口API
import * as API from '@/api'
// console.log(API);

// 测试接口
// import { reqCatagoryList } from '@/api/index.js'
// reqCatagoryList();
// import { reqGetSearchInfo } from '@/api/index.js'
// console.log(reqGetSearchInfo({}));
// import { reqGoodsInfo } from '@/api/index'
// console.log(reqGoodsInfo(12))
// import { reqOrderInfo } from '@/api/index.js'
// console.log(reqOrderInfo());

// 引入自定义插件
// import plugin from '@/plugin/plugins.js'
// Vue.use(plugin)

Vue.config.productionTip = false

// 引入mockServer.js
import '@/mock/mockServer'
// 引入swiper样式，不需要from
import 'swiper/css/swiper.css';

// 引入表单验证插件
import '@/plugin/validate'

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },

  router,
  store,
}).$mount('#app')
