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
    }

}


});
