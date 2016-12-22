define(function(require){
  'use strict'
 /*
  * 全局使用函数
  *
  */
  var Vue = require('vue');
  var Vuex = require('vuex');
  var createLogger = require('logger');
  var VueRouter = require('vueRouter');
  var vueResource = require('vueResource'); 
  var mainRouter = require('mainRouter');//主路由文件
  var mainModules = require('mainModules');//主路由文件

 
 Vue.use(Vuex);
 Vue.use(VueRouter);
 Vue.use(vueResource);

 // Vue.http.options.root = '/root';
 // Vue.http.options.emulateJSON = true;
 // Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';

 Vue.http.interceptors.push((request, next) => {
         // ...
         // 请求发送前的处理逻辑
         // ...
         console.log('request',request);
     next((response) => {
       if(!response.ok){
         //response.status
          alert('请求异常')
       }
         return response
     })
 });

 // Vue.config.devtools = true
 Vue.config.errorHandler = function (err, vm) {
   // 错误拦截器
 }
/*
* 应用全局状态树
*/
const vuexStore= new Vuex.Store({
     modules: mainModules,
     plugins: [createLogger()]
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
