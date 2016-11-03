define(function(require){
  'use strict'

// store 应用主模块 注册组件的主模块


return {
  home: require('home.module'), //home 模块状态组件
  custom: require('custom.module'),//custom 模块状态组件
  busi: require('busi.module')
}


});
