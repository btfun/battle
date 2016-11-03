define(function(require){
  'use strict'
  var Vue = require('vue');
  var Vuex = require('vuex');
  Vue.use(Vuex);
/*
*  应用单一状态树
*/


return new Vuex.Store({
    state: {
      count: 123333336666
    },
    mutations: {
      increment (state) {
        state.count++
      }
    }
  })

// store.commit('increment') 触发事件更改


});
