// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import  store from './store/index'
//除了js可以引入，还可以引入css
import './style/comm/reset.less'

import '../static/css/animate.css'
//es6引入vue模块
import Vue from 'vue'

//引入自研ui框架(自己写的)
import ZJ from '../ZJ';
Vue.use(ZJ)   //调用模块 里的 install方法，并且将VUE实例进行传递

import App from './App'
//引入路由
import router from './router/index.js'
//引入axios
import Axios from 'axios'

//请求拦截
Axios.interceptors.response.use(function (response) {
    // Do something with response data
    // console.log(1111)
    return response.data;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });


//挂载axios 便于组件使用
Vue.prototype.$axios=Axios

//引入app组件
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
