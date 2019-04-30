import Vue from 'vue'
import Router from 'vue-router'
import login_regist from "./components/login_regist.vue"
import regist from "./components/regist.vue"
import login from "./components/login.vue"
import information1 from "./components/information1.vue"
import information2 from "./components/information2.vue"
import information3 from "./components/information3.vue"
import information4 from "./components/information4.vue"
import information5 from "./components/information5.vue"
import information6 from "./components/information6.vue"
import information7 from "./components/information7.vue"
import user from "./components/user.vue"
import err from "./components/err.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',component:login_regist},
    {path:'/regist',component:regist},
    {path:'/login',component:login},
    {path:'/information1',component:information1},
    {path:'/information2',component:information2},
    {path:'/information3',component:information3},
    {path:'/information4',component:information4},
    {path:'/information5',component:information5},
    {path:'/information6',component:information6},
    {path:'/information7',component:information7},
    {path:'/user',component:user},
    {path:'/err',component:err},
  ]
})
