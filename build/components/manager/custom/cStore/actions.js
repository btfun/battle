"use strict";define(function(require){return{increment:function(n){n.commit("increment")},actionA:function(n){var t=n.commit;return new Promise(function(n,i){setTimeout(function(){t("someMutation"),n()},1e3)})},actionB:function(n){var t=n.dispatch,i=n.commit;return t("actionA").then(function(){i("someOtherMutation")})}}});