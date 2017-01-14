'use strict';

define(function (require) {

  var UserProfile = {
    template: '\n    <div class="user">\n      <h2>User {{ $route.params.id }}</h2>\n      <router-view></router-view>\n    </div>\n  '
  };

  return { path: '/busi',
    component: function component(resolve) {
      return require(['busi.busiModule'], resolve);
    },
    children: [{
      path: '',
      component: UserProfile
    }]
  };
});