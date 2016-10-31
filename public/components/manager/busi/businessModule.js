define(function(require){
'use strict'


return function(router){
  
  return  { path: '/busi',
        component: resolve => require(['businessModule'], resolve),
        children: [
          {
            path: 'profile',
            component: UserProfile
          }
        ]
       }

}




});
