(function(global,factory,GLOBAL){
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(GLOBAL) :
  typeof define === 'function' && define.amd ? define(factory(GLOBAL)) :
  (global.requestUrl = factory(GLOBAL));
})(this,function(GLOBAL){
'use strict'
/**
 * 仅内部使用（用户登陆后）
 */
 if(typeof GLOBAL !== 'object'){alert('上下文异常')return;}
 var confRoot=GLOBAL.confRoot,
     wxRoot=GLOBAL.wxRoot,
     myRoot=GLOBAL.myRoot,
     cometRoot=GLOBAL.cometRoot,
     payRoot=GLOBAL.payRoot,
     smsRoot=GLOBAL.smsRoot,
     marketingPayRoot=GLOBAL.marketingPayRoot;

    if(!confRoot){
 			  confRoot="http://saas.mljia.cn/";
 		}
 		if(!wxRoot){
 			  wxRoot="http://wx.mljia.cn/";
 		}
 		if(!myRoot){
 			//美业商城
 			myRoot="http://mall.mljia.cn/";
 		}
 		if(!cometRoot){
 			cometRoot="http://comet.mljia.cn";
 		}
 		//支付
 		if(!payRoot){
 			payRoot="http://pay.mljia.cn";
 		}
 		//var marketingPayRoot =  "http://sell.mljiadev.cn";
 		if(!marketingPayRoot){
 			marketingPayRoot="http://sell.mljia.cn";
 		}
 		//短信营销
 		if(!smsRoot){
 			smsRoot="http://com.mljia.cn";
 		}


return {





  }

},GLOBAL);
