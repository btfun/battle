define(function(require){
'use strict';

/*
权限验证
数据解码
密码验证
XHR请求全局拦截
*/



return {
    createUUid: ()=>{
       return Math.random().toString(36).substr(2, 20);
    },clockSubmit : ()=>{
        // 核心
        function Clock() {
          this.timer = null; // 定时器，表示锁是开着的
          this.grapTimer = 1000;
          // 锁定后，1秒钟后解锁
        }
        Clock.prototype.init = function ( grapTimer ) {
            this.grapTimer = grapTimer || this.grapTimer;
            return this.clock();
          }
          // 方法返回 false:锁是开着的，可以提交表单；true:锁是关着的，不可以提交表单；
        Clock.prototype.clock = function () {

          var that = this;

          // 判断定时器是否关闭,定时器不为null,表示锁没有打开
          if ( that.timer != null ) {
            return false;
          } else {
            // 添加定时器，定时器在1000毫秒内是status是关着的。1000毫秒后是再放开status
            that.timer = window.setTimeout( function () {
              //console.log(that.timer);
              that.timer = null;
            }, that.grapTimer );

            return true;
          }
        }
        Clock.prototype.open = function () {

          var that = this;
          that.timer = null;
          window.clearTimeout( that.timer );
        }

        return new Clock();
    }

}


});
