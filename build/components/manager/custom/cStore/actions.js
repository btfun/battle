'use strict';

define(function (require) {
  'use strict';

  return {
    increment: function increment(context) {
      context.commit('increment');
    },
    actionA: function actionA(_ref) {
      var commit = _ref.commit;


      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          commit('someMutation');
          resolve();
        }, 1000);
      });
    },
    actionB: function actionB(_ref2) {
      var dispatch = _ref2.dispatch,
          commit = _ref2.commit;

      return dispatch('actionA').then(function () {
        commit('someOtherMutation');
      });
    }
  };
});