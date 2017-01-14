'use strict';

define(function (require) {

  return {
    template: require('text!components/manager/home/children/two/twoTmpl.html'),
    data: function data() {
      return {
        msg: 123,
        age: 20
      };
    },
    beforeCreate: function beforeCreate() {
      //在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。

    },
    created: function created() {},
    watch: {
      msg: function msg(ms) {
        console.log(ms);
      }
    },
    methods: {
      goo: function goo() {
        this.$router.push({ path: '/busi' });
      }
    }
  };
});