define(function(require){
  'use strict'

    // var store = require('home.store');
    // var getters = require('home.getters');
    // var mutations = require('home.mutations');
    // var actions = require('home.actions');




//模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态。

//1 {横向管理} 主模块增多 状态模块文件跟着增多
//2 {纵向管理} 主模块内的子功能模块增多 状态模块文件跟着增多

// 所有资源文件放到CDN 上 页面的链接数对服务器就不会构成压力
// 前提是要控制好 文件缓存更新 客户端文件下载时间控制在3S以内






return {
  // state: store, //共用数据状态
  // getters: getters, // 共用属性计算存放，其他子组件使用this.$store.getters.doneTodosCount
  // mutations: mutations, //共用方法 Mutation 必须是同步事务 用来改变数据状态
  // actions: actions //共用方法 用来获取数据并调用 Mutation
}


});
