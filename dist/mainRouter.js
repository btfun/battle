'use strict';

define(function (require) {
    'use strict';

    //模块主路由

    var routes = [require('home.homeRouter'), require('busi.busiRouter'), require('custom.customRouter')];

    return routes;
});