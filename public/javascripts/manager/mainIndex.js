/*
 *  应用程序入口
 *  作者：battle
 */
define(function(require){
  'use strict'

  var Vue = require('vue');
  var Vuex = require('vuex');
  var createLogger = require('logger');
  var VueRouter = require('vueRouter');
  var vueResource = require('vueResource');
  var mainElectron = require('mainElectron');//桌面方法库
 

 Vue.use(Vuex);
 Vue.use(VueRouter);
 Vue.use(vueResource);



 /**
  * 一: 应用全局状态树顶级模块入口
  *    应用全局状态集合
  **/
const vuexStore= new Vuex.Store({
     modules: {
       home:   require('home.module'), //home 模块状态组件
       custom: require('custom.module'),//custom 模块状态组件
       busi:   require('busi.module')
     },
     plugins: [createLogger()]
 });

 /**
  * 二: 应用全局路由顶级模块入口
  *
  **/
const routers = new VueRouter({
      routes: [
          require('home.homeRouter'),
          require('busi.busiRouter'),
          require('custom.customRouter'),
      ]
 });
 //路由拦截器
 routers.beforeEach((to, from, next) => {
   console.log('当前路径：',to.path)
   next()
 });

 /**
  * 三: 应用全局的XHR请求配置
  *
  **/

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


 /**
  *  end:挂载实例
  *
  **/

 const app = new Vue({
   router: routers,
   store: vuexStore
 }).$mount('#app');


});
