'use strict';

define(function (require) {

  return {
    template: require('text!components/manager/busi/busiTmpl.html'),
    data: function data() {
      return {
        msg: 123,
        age: 20
      };
    }
  };
});