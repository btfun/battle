define(function(require){
  'use strict'

    var store = require('home.store');
    var getters = require('home.getters');
    var mutations = require('home.mutations');
    var actions = require('home.actions');





return {
  state: store, //共用数据状态
  getters: getters, // 共用属性计算存放，其他子组件使用this.$store.getters.doneTodosCount
  mutations: mutations, //共用方法 Mutation 必须是同步事务 用来改变数据状态
  actions: actions //共用方法 用来获取数据并调用 Mutation
}


});
