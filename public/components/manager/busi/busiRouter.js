define(function(require){
'use strict'
const UserProfile = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}

  return  { path: '/busi',
        component: resolve => require(['busiModule'], resolve),
        children: [
          {
            path: '',
            component: UserProfile
          }
        ]
       }

 


});
