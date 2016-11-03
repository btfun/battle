
(function(require,factory){
  var pathMods=factory();
  //pathMods 层级对象抹平，最多支持二级对象属性
  var path={};
  for(attr in pathMods){
    if(typeof pathMods[attr]==='string'){
      path[attr]=pathMods[attr];
    }else if(typeof pathMods[attr]==='object'){
        for( att in pathMods[attr]){
            if(typeof pathMods[attr][att]==='object' ){
                  alert('警告require配置对象不能有三级对象属性');
            }else{
              path[attr+'.'+att]=pathMods[attr][att];
            }
        }
    }
  }
  requirejs.config({
    baseUrl: '/',
    paths: path
  });
  require(['text','mainIndex']);
})(require,function(){
'use strict';
 return {
   //////////////////lib///////////////////
   text: 'javascripts/lib/requireJS/requireJS-text',
   vue: 'javascripts/lib/vue/vue',
   vueRouter: 'javascripts/lib/vue/vue-router/vue-router',
   vueResource: 'javascripts/lib/vue/vue-resource/vue-resource',
   vuex: 'javascripts/lib/vue/vuex/vuex',
   logger: 'javascripts/lib/vue/vuex/logger',
   //////////////////主入口///////////////////
   mainIndex: 'javascripts/manager/mainIndex',
   mainRouter: 'javascripts/manager/mainRouter',
   mainModules: 'javascripts/manager/mainModules',
   //////////////////组件入口1///////////////////
   home:{
     homeRouter: 'components/manager/home/homeRouter',
     homeModule: 'components/manager/home/homeModule',

     module: 'javascripts/manager/home/hStore/module',
     store: 'javascripts/manager/home/hStore/store',
     getters: 'javascripts/manager/home/hStore/getters',
     mutations: 'javascripts/manager/home/hStore/mutations',
     actions: 'javascripts/manager/home/hStore/actions',


     oneModule: 'components/manager/home/children/one/oneModule',
     twoModule: 'components/manager/home/children/two/twoModule'
   },

   //////////////////组件入口2///////////////////
   busi:{
     busiRouter: 'components/manager/busi/busiRouter',
     busiModule: 'components/manager/busi/busiModule',

     module: 'javascripts/manager/home/bStore/module',
     store: 'javascripts/manager/home/bStore/store',
     getters: 'javascripts/manager/home/bStore/getters',
     mutations: 'javascripts/manager/home/bStore/mutations',
     actions: 'javascripts/manager/home/bStore/actions'
   },

   //////////////////组件入口3///////////////////
   custom:{
     customRouter: 'components/manager/custom/customRouter',
     customModule: 'components/manager/custom/customModule',

     module: 'javascripts/manager/home/cStore/module',
     store: 'javascripts/manager/home/cStore/store',
     getters: 'javascripts/manager/home/cStore/getters',
     mutations: 'javascripts/manager/home/cStore/mutations',
     actions: 'javascripts/manager/home/cStore/actions'
   }

 };




})
