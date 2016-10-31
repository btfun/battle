define(function(require){
  'use strict'
  var Vue = require('vue');
  var Vuex = require('vuex');
  var VueRouter = require('vueRouter');
  var vueResource = require('vueResource');
  var mainRouter = require('mainRouter');//主路由文件
  // var store = require('store');//挂载store

 Vue.use(Vuex);
 Vue.use(VueRouter);
 Vue.use(vueResource);



 var router = new VueRouter({
   routes: mainRouter // （缩写）相当于 routes: routes
 })

 router.beforeEach((to, from, next) => {
  //  console.log('to',to,' from',from)
   console.log(to.path)
   next()
 })

 // 4. 创建和挂载根实例。
 // 记得要通过 router 配置参数注入路由，
 // 从而让整个应用都有路由功能
 const app = new Vue({
   router
 }).$mount('#app')
 // 现在，应用已经启动了！



});
