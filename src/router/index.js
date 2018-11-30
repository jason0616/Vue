import Vue from 'vue'    //vue实例
import Router from 'vue-router'  //vue router
import Home from '../components/pages/Home' //某一个组件
import Found from '../components/pages/Found' //某一个组件
import My from '../components/pages/MY/My.vue' 
import Login from '../components/pages/MY/Login.vue' 
import List from '../components/pages/List' //某一个组件
// import Cart from '../components/pages/Cart1'
// import Detail from '../components/pages/Detail' 
import Goods from '../components/pages/Goods' 
import Destination from '../components/pages/Destination'
import Cart from '../components/pages/Cart'

import Reg from '../components/pages/MY/Reg.vue' 
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',    //匹配的hash地址
      
      redirect: '/Home' //该路由所引入的组件
    },
    {
      path: '/Home',    //匹配的hash地址
      name: 'Home', //路由的名字
      component: Home //该路由所引入的组件
    },
    {
      path: '/goods',    //匹配的hash地址
      name: 'Goods', //路由的名字
      component: Goods //该路由所引入的组件
    },
    // {
    //   path: '/cart',    //匹配的hash地址
    //   name: 'cart', //路由的名字
    //   component: Cart //该路由所引入的组件
    // },
    {
      path: '/found',
      name: 'Found',
      component: Found
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg
    },
 
    {
      path: '/destination',
      name: 'destination',
      component: Destination
    },
    {
      path: '/My',
      name: 'My',
      component: My,
      children:[
      // {path:'login',name:'login',component:Login},
        // {path:'reg',name:'reg',component:Reg}
      ]
    }
  ]
})








/*
 ------------------
 跳转页面：
 1、下载路由插件  vue init webpack
 2、通过<router-view> 开辟一个空间
 3、检查hash变化 （地址栏#后边那一块）
 4、匹配相应的组件信息  进行挂载显示
 
 要在vue的实例中挂载router
 
最后通过a标签的 href="#/路由名字" 来跳转
或者 用一个内置标签 
<router-link class='' tag='p' to="#/路由名字"> </router-link> 
to 是跳转
tag 渲染一个元素
 * */