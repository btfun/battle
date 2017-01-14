'use strict';

define(function (require) {
  'use strict';

  var UserProfile = {
    template: '\n    <div class="user">\n      <h2>User {{ $route.params.id }}</h2>\n      <router-view></router-view>\n    </div>\n  '
  };

  return { path: '/custom',
    component: function component(resolve) {
      return require(['custom.customModule'], resolve);
    },
    children: [{
      path: '',
      component: UserProfile
    }]
  };
});