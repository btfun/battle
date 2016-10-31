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


  return { path: '/custom',
      component: resolve => require(['customModule'], resolve),
      children: [
        {
          path: '',
          component: UserProfile
        }
      ]
    }

 
});
