'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (factory, win, fn) {
  fn(factory(), win);
})(function () {
  'use strict';
  //控制台输入 logPath('123456','searchKeys')查看对应的链接

  return {
    //////////////////lib//////////////////////
    text: 'javascripts/lib/requireJS/requireJS-text',
    vue: 'javascripts/lib/vue/vue',
    vueRouter: 'javascripts/lib/vue/vue-router/vue-router',
    vueResource: 'javascripts/lib/vue/vue-resource/vue-resource',
    vuex: 'javascripts/lib/vue/vuex/vuex',
    logger: 'javascripts/lib/vue/vuex/logger',
    //base
    globalUri: 'javascripts/base/globalUri-9de1ddbbeb',
    globalUtil: 'javascripts/base/globalUtil-47da5f4e43',
    //////////////////主入口/////////////////////
    mainHomeIndex: 'javascripts/manager/mainIndex-fd0cbe63c7',
    mainHomeElectron: 'javascripts/manager/mainElectron-986c97f4c8',
    //////////////////组件入口1///////////////////
    home: {
      homeRouter: 'components/manager/home/homeRouter-191159098b',
      homeModule: 'components/manager/home/homeModule-470bf8e5b9',
      //  homeTmpl:'components/manager/home/homeTmpl.html',

      module: 'components/manager/home/hStore/module-b5570a40e0',
      store: 'components/manager/home/hStore/store-b119f5fced',
      getters: 'components/manager/home/hStore/getters-b119f5fced',
      mutations: 'components/manager/home/hStore/mutations-008f3170a3',
      actions: 'components/manager/home/hStore/actions-86543f00cc',

      oneModule: 'components/manager/home/children/one/oneModule-f48223aca2',
      twoModule: 'components/manager/home/children/two/twoModule-567c5cdcc7'
    },

    //////////////////组件入口2///////////////////
    busi: {
      busiRouter: 'components/manager/busi/busiRouter-f9336f3566',
      busiModule: 'components/manager/busi/busiModule-c03a7331f1',

      module: 'components/manager/busi/bStore/module-49c4fff23f',
      store: 'components/manager/busi/bStore/store-b119f5fced',
      getters: 'components/manager/busi/bStore/getters-b119f5fced',
      mutations: 'components/manager/busi/bStore/mutations-008f3170a3',
      actions: 'components/manager/busi/bStore/actions-86543f00cc'
    },

    //////////////////组件入口3///////////////////
    custom: {
      customRouter: 'components/manager/custom/customRouter-98152e7d42',
      customModule: 'components/manager/custom/customModule-5986f7657a',

      module: 'components/manager/custom/cStore/module-8b6e81afb8',
      store: 'components/manager/custom/cStore/store-b119f5fced',
      getters: 'components/manager/custom/cStore/getters-b119f5fced',
      mutations: 'components/manager/custom/cStore/mutations-008f3170a3',
      actions: 'components/manager/custom/cStore/actions-86543f00cc'
    }

  };
}, window, function (pathMods, win) {
  'use strict';
  //pathMods 层级对象抹平，最多支持三级对象属性

  var path = {};
  for (var attr in pathMods) {
    if (typeof pathMods[attr] === 'string') {
      path[attr] = pathMods[attr];
    } else if (_typeof(pathMods[attr]) === 'object') {
      for (var att in pathMods[attr]) {
        if (_typeof(pathMods[attr][att]) === 'object') {
          for (var at in pathMods[attr][att]) {
            path[attr + '.' + att + '.' + at] = pathMods[attr][att][at];
            if (_typeof(pathMods[attr][att][at]) === 'object') return alert('警告require配置对象不能有三级对象属性');
          }
        } else {
          path[attr + '.' + att] = pathMods[attr][att];
        }
      }
    }
  }

  win.requirejs.config({
    baseUrl: '/',
    paths: path
  });
  win.require(['text', 'mainHomeIndex']); //这里的不能被替换MD5后缀

  win.logPath = function (pwd, conf) {
    if (pwd !== 123456) return;
    for (var ins in path) {
      if (conf) {
        if (ins.indexOf(conf) > -1) console.log(ins, ':', path[ins]);
      } else {
        console.log(ins, ':', path[ins]);
      }
    }
  };
});