define(function(require){
  'use strict'
  var Vue = require('vue');
  var Vuex = require('vuex');
  var VueRouter = require('vueRouter');
  var vueResource = require('vueResource');

  var mainRouter = require('mainRouter');//主路由文件
  var store = require('store');
  var getters = require('getters');
  var mutations = require('mutations');
  var actions = require('actions');

 Vue.use(Vuex);
 Vue.use(VueRouter);
 Vue.use(vueResource);

/*
* 应用全局状态树
*/
const vuexStore= new Vuex.Store({
     state: store, //共用数据状态
     getters: getters, // 共用属性计算存放，其他子组件使用this.$store.getters.doneTodosCount
     mutations: mutations, //共用方法 Mutation 必须是同步事务 用来改变数据状态
     actions: actions //共用方法 用来获取数据并调用 Mutation
 });

 /*
 * 应用路由
 */
const routers = new VueRouter({
      routes: mainRouter
 });

 routers.beforeEach((to, from, next) => {
   console.log(to.path)
   next()
 })

 // 4. 创建和挂载根实例。
 // 记得要通过 router 配置参数注入路由，
 // 从而让整个应用都有路由功能
 const app = new Vue({
   router: routers,
   store: vuexStore
 }).$mount('#app');


});
