'use strict';

define(function (require) {
  'use strict';

  //Mutation 必须是同步事务


  return {
    increment: function increment(state) {
      state.count++;
    }
  };
});