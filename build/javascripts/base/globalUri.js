"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(s){return typeof s}:function(s){return s&&"function"==typeof Symbol&&s.constructor===Symbol&&s!==Symbol.prototype?"symbol":typeof s};!function(s,o,e){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=o(e,s):"function"==typeof define&&define.amd?define(o(e,s)):s.requestUrl=o(e,s)}(window,function(s,o){if("object"!==("undefined"==typeof s?"undefined":_typeof(s)))return void alert("上下文异常");var e=s.confRoot||"http://saas.mljia.cn/",a=s.wxRoot||"http://wx.mljia.cn/",n=s.myRoot||"http://mall.mljia.cn/",t=(s.cometRoot||"http://comet.mljia.cn/",s.payRoot||"http://pay.mljia.cn/",s.smsRoot||"http://sell.mljia.cn/",s.marketingPayRoot||"http://sell.mljia.cn",o.console);if(e.indexOf("saas.mljia.cn")>-1&&(o.console={log:function(){},info:function(){},debug:function(){},warn:function(){},error:function(){},profile:function(){},profileEnd:function(){}},o.sessionStorage)){var p=o.sessionStorage.getItem("logConfig");"true"===p&&(o.console=t),o.log=function(s){s?o.sessionStorage.setItem("logConfig",s):o.sessionStorage.removeItem("logConfig")}}return{login:{userSendSms:e+"/saas.shop/send_sms",verifyCode:e+"/saas.shop/verify/code",userRegist:e+"/saas.shop/regist",checkUserMobile:e+"/saas.shop/check/mobile",checkUserOtherName:e+"/saas.shop/check/other_name",userLoginOut:e+"/saas.shop/login_out",staffLoginOut:e+"/saas.shop/shop/{shopId}/staff/login_out",machinelogin:e+"/saas.shop/shop/{shopId}/machine/pwd?mac="},user:{searchCustom:e+"/meirong.basic/o2o/wx/search/custom",wxUnwarp:e+"/meirong.basic/o2o/wx/unwarp",relate:e+"/meirong.basic/o2o/wx/relate",userListUser:e+"/weixin/o2o/user/list",appInfo:e+"/weixin/o2o/app/info",appSummaryo:e+"/weixin/o2o/app/summary",auditSaveAudit:e+"/weixin/o2o/audit/save",selectUserChooseList:e+"/weixin/o2o/user/choose",userinfo:e+"/saas.shop/user/"},shop:{selectShopListByUserId:e+"/saas.shop/shop/list",shopCountInfo:e+"/saas.shop/shop/{shopId}/count/info",shopMainInfo:e+"/saas.shop/shop/{shopId}/main/info",shopInfo:e+"/saas.shop/shop/{shopId}",shopVersionInfo:e+"/saas.shop/shop/{shopId}/version",selectShopBusi:e+"/saas.shop/banner/main_business",selectShopOpen:e+"/saas.shop/shop/{shopId}?is_open",shopEvaluateInfo:e+"/saas.shop/shop/{shopId}/evaluate/info",shopRankInfo:e+"/saas.shop/shop/{shopId}/rank/info",deleteShopMessage2:e+"/saas.news/saas/message/delete",selectShopTips:e+"/saas.news/saas/message/tips/list",sendShopHeartbeat:e+"/saas.news/saas/message/heart/beat",selectShopOutInfo:e+"/saas.order/saas/{shopId}/index/outInfo",selectSysBanner:e+"/saas.shop/banner/getImageCarousel",selectShopBanner:e+"/saas.shop/banner/carousel",selectShopRecommend:e+"/saas.shop/banner/recommend",selectOrderComment:e+"/saas.shop/shop/{shopId}/order/{orderId}/comment",selectIndexStaffSore:e+"/saas.shop/shop/{shopId}/rank/info",selectUserMlb:e+"/saas.shop/user/{userId}/mlb",shopLoginLog:e+"/saas.shop/shop/{shopId}/log",shopWxAuth:a+"/wechat/o2o/auth/check",shopWxAuthSummary:a+"/wechat/o2o/app/summary",userWxHref:a+"/o2o/route/0/qrcode-open_pub_succeeds",shopWxFansCount:a+"/mp/shop/{shopId}/fans/count",shopWxWatchCount:a+"/mp/shop/{shopId}/fans/change",shopWxRelationCount:a+"/mp/shop/{shopId}/relation/count",getShopWatchWxImg:a+"/mp/shop/{shopId}/attention/qrcode",getShopPayWxImg:a+"/mp/shop/{shopId}/pay/qrcode",shopWxHref:a+"/o2o/route/{shopId}/thirdpartnar-send_public_message",shopWxqrcodeHref:a+"/o2o/route/{shopId}/tools-qrcode-qrcode_pay_focus",shopMpHref:a+"/o2o/bind/shopMp/",shopMYHref:n+"/",selectSysNotice:e+"/saas.shop/notice",selectSysInformed:e+"/saas.shop/user/{userId}/notice",userShopList:e+"/saas.shop/user/{userId}/shop",userShopListFinance:e+"/saas.shop/user/{userId}/shop/finance",staffShopLogin:e+"/saas.shop/shop/{shopId}/staff/login",selectRecommendList:e+"/saas.material/saas/recommend/list",recommendCard:e+"/saas.material/saas/recommend/card",recommendMassage:e+"/saas.material/saas/recommend/massage",recommendProduct:e+"/saas.material/saas/recommend/product"}}},GLOBAL);