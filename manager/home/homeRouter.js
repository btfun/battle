'use strict';

define(function (require) {
  'use strict';
  /*
  home 模块的路由配置文件
  
  home/one123
  home/two12313
  
  */

  return { path: '/',
    component: function component(resolve) {
      return require(['home.homeModule'], resolve);
    },
    children: [{
      path: 'one',
      component: function component(resolve) {
        return require(['home.oneModule'], resolve);
      }
    }, {
      path: 'two',
      component: function component(resolve) {
        return require(['home.twoModule'], resolve);
      }
    }]
  };
});