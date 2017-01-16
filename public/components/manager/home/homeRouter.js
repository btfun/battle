define(function(require){
'use strict'
/*
home 模块的路由配置文件

home/one123
home/two12313

*/

  return { path: '/',
            component: resolve => require(['home.homeModule'],resolve),
            children: [
              {
                path: 'one',
                component: resolve => require(['home.oneModule'],resolve)
              },
              {
                path: 'two',
                component: resolve => require(['home.twoModule'],resolve)
              }
            ]
          }

});
