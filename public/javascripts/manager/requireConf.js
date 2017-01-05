(function(factory,win,fn){
  fn(factory(),win);
})(function(){
'use strict';
//控制台输入 logPath('123456','searchKeys')查看对应的链接
 return {
   //////////////////lib//////////////////////
   text:        'javascripts/lib/requireJS/requireJS-text',
   vue:         'javascripts/lib/vue/vue',
   vueRouter:   'javascripts/lib/vue/vue-router/vue-router',
   vueResource: 'javascripts/lib/vue/vue-resource/vue-resource',
   vuex:        'javascripts/lib/vue/vuex/vuex',
   logger:      'javascripts/lib/vue/vuex/logger',
   //base
   globalUri:   'javascripts/base/globalUri',
   globalUtil:  'javascripts/base/globalUtil',
   //////////////////主入口/////////////////////
   mainIndex:   'javascripts/manager/mainIndex',
   mainElectron:'javascripts/manager/mainElectron',
   //////////////////组件入口1///////////////////
   home:{
     homeRouter: 'components/manager/home/homeRouter',
     homeModule: 'components/manager/home/homeModule',
    //  homeTmpl:'components/manager/home/homeTmpl.html',

     module: 'components/manager/home/hStore/module',
     store:  'components/manager/home/hStore/store',
     getters: 'components/manager/home/hStore/getters',
     mutations: 'components/manager/home/hStore/mutations',
     actions: 'components/manager/home/hStore/actions',

     oneModule: 'components/manager/home/children/one/oneModule',
     twoModule: 'components/manager/home/children/two/twoModule'
   },

   //////////////////组件入口2///////////////////
   busi:{
     busiRouter: 'components/manager/busi/busiRouter',
     busiModule: 'components/manager/busi/busiModule',

     module: 'components/manager/busi/bStore/module',
     store: 'components/manager/busi/bStore/store',
     getters: 'components/manager/busi/bStore/getters',
     mutations: 'components/manager/busi/bStore/mutations',
     actions: 'components/manager/busi/bStore/actions'
   },

   //////////////////组件入口3///////////////////
   custom:{
     customRouter: 'components/manager/custom/customRouter',
     customModule: 'components/manager/custom/customModule',

     module: 'components/manager/custom/cStore/module',
     store: 'components/manager/custom/cStore/store',
     getters: 'components/manager/custom/cStore/getters',
     mutations: 'components/manager/custom/cStore/mutations',
     actions: 'components/manager/custom/cStore/actions'
   }

 };


},window,function(pathMods,win){
  'use strict';
  //pathMods 层级对象抹平，最多支持三级对象属性
  var path={};
  for(let attr in pathMods){
    if(typeof pathMods[attr]==='string'){
      path[attr]=pathMods[attr];
    }else if(typeof pathMods[attr]==='object'){
        for(let att in pathMods[attr]){
            if(typeof pathMods[attr][att]==='object' ){
                  for(let at in pathMods[attr][att]){
                    path[attr+'.'+att+'.'+at]=pathMods[attr][att][at];
                    if(typeof pathMods[attr][att][at]==='object')return alert('警告require配置对象不能有三级对象属性');
                  }
            }else{
              path[attr+'.'+att]=pathMods[attr][att];
            }
        }
    }
  }

  win.requirejs.config({
    baseUrl: '/',
    paths: path
  });
  win.require(['text','mainIndex']);

  win.logPath=function(pwd,conf){
      if(pwd!==123456)return;
      for(var ins in path){
        if(conf){
          if(ins.indexOf(conf)>-1)console.log(ins,':',path[ins]);
        }else{
          console.log(ins,':',path[ins]);
        }
      }
    }
}); 
