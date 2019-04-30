console.log(window.innerWidth)
console.log(window.innerHeight)
//在已经锁定为竖屏的情况下，如果宽大于高，那么得为它跳转页面
if (window.innerWidth >= window.innerHeight) {
  window.open("http://127.0.0.1:8080/#/err", "_self")
}


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
axios.defaults.withCredentials = true
Vue.prototype.axios = axios
import 'mint-ui/lib/style.css'
Vue.config.productionTip = false
//5: 设置请求的根路径 
//Vue.http.options.root = "http://127.0.0.1/vue_ser/";
//6:全局设置post 时候表音的数据组织格式为 application/x-www-form-urlencoded
//Vue.http.options.emulateJSON = true;
// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
import './lib/mui/css/mui.css'
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'
// import {Header,Button} from "mint-ui"
// Vue.component(Header.name,Header)//Header.name就是"mt-header"
// Vue.component(Button.name,Button)
// import { Swipe, SwipeItem } from 'mint-ui';
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// import { Lazyload } from 'mint-ui';
// Vue.use(Lazyload);
import MintUI from "mint-ui"
Vue.use(MintUI)
import VDistpicker from 'v-distpicker'
Vue.component('v-distpicker', VDistpicker);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
