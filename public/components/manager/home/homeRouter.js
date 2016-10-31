define(function(require){
'use strict'
/*
home 模块的路由配置文件

home/one
home/two

*/
  return { path: '/',
            component: resolve => require(['homeModule'],resolve),
            children: [
              {
                path: 'one',
                component: resolve => require(['oneModule'],resolve)
              },
              {
                path: 'two',
                component: resolve => require(['twoModule'],resolve)
              }
            ]
          }

});
