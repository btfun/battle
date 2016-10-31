define(function(require){
'use strict'


  //模块主路由
   const routes = [
       require('homeRouter'),
       require('busiRouter'),
       require('customRouter'),
   ]

   return routes;

});
