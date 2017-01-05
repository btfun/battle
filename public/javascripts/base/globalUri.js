(function(global,factory,GLOBAL){
  'use strict'
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(GLOBAL,global) :
  typeof define === 'function' && define.amd ? define(factory(GLOBAL,global)) :
  (global.requestUrl = factory(GLOBAL,global));
})(window,function(GLOBAL,global){
  'use strict'
/**
 * 仅内部使用（用户登陆后）
 */
 if(typeof GLOBAL !== 'object'){alert('上下文异常');return;}

 var confRoot=GLOBAL.confRoot|| 'http://saas.mljia.cn/',  //saas接口上下文
     wxRoot=GLOBAL.wxRoot|| 'http://wx.mljia.cn/',        // 微信接口
     myRoot=GLOBAL.myRoot|| 'http://mall.mljia.cn/',      //美业商城
     cometRoot=GLOBAL.cometRoot|| 'http://comet.mljia.cn/',//长链接
     payRoot=GLOBAL.payRoot|| 'http://pay.mljia.cn/',      //支付
     smsRoot=GLOBAL.smsRoot|| 'http://sell.mljia.cn/',     //短信营销
     marketingPayRoot=GLOBAL.marketingPayRoot || 'http://sell.mljia.cn'; //

/* start 全局console  使用方法：log('true')解除禁用， log()禁用*/
{
  var nativeConsole=global.console;
  if(confRoot.indexOf('saas.mljia.cn')>-1){
    //生产环境禁用掉全局 console 的常用部分函数
    global.console={
      log:function(){ },
      info:function(){ },
      debug:function(){ },
      warn:function(){ },
      error:function(){ },
      profile:function(){ },
      profileEnd:function(){ }
    };
    if(global.sessionStorage){
      var logConfig=global.sessionStorage.getItem('logConfig');
          if(logConfig==='true'){
              global.console=nativeConsole;
          }
          global.log=function(arg){
            if(arg){
                global.sessionStorage.setItem('logConfig',arg);
            }else{
                global.sessionStorage.removeItem('logConfig');
            }

          }
    }
  }
}

/* end */




return {
  login:{
    userSendSms: confRoot+'/saas.shop/send_sms',//发送短信验证码
    verifyCode: confRoot+'/saas.shop/verify/code',//生成随机码
    userRegist: confRoot+'/saas.shop/regist',//用户注册
    checkUserMobile: confRoot+'/saas.shop/check/mobile',//检测手机号是否被注册
    checkUserOtherName: confRoot+'/saas.shop/check/other_name',//检测昵称是否被注册
    userLoginOut: confRoot+'/saas.shop/login_out',//用户退出
    staffLoginOut: confRoot+'/saas.shop/shop/{shopId}/staff/login_out',//店内退出
    machinelogin: confRoot+'/saas.shop/shop/{shopId}/machine/pwd?mac='// 店内退出
  },
  user:{
    searchCustom : confRoot+"/meirong.basic/o2o/wx/search/custom",
    wxUnwarp : confRoot+"/meirong.basic/o2o/wx/unwarp",
    relate : confRoot+"/meirong.basic/o2o/wx/relate",

    userListUser : confRoot+"/weixin/o2o/user/list",//获取用户列表
    appInfo : confRoot+"/weixin/o2o/app/info",//获取公众号详情
    appSummaryo : confRoot+"/weixin/o2o/app/summary",//获取公众号首页统计
    auditSaveAudit : confRoot+"/weixin/o2o/audit/save",//保存店铺公众号申请信息
    selectUserChooseList : confRoot+"/weixin/o2o/user/choose",// 用户列表
    userinfo: confRoot+"/saas.shop/user/" // 用户信息
  },
  shop:{
    selectShopListByUserId : confRoot+"/saas.shop/shop/list",//根据user_id获取店铺列表
    shopCountInfo:confRoot+"/saas.shop/shop/{shopId}/count/info",//店铺统计信息
    shopMainInfo:confRoot+"/saas.shop/shop/{shopId}/main/info",//店铺主要信息

    shopInfo:confRoot+"/saas.shop/shop/{shopId}",//店铺信息
    shopVersionInfo:confRoot+"/saas.shop/shop/{shopId}/version",//店铺版本
    selectShopBusi: confRoot+'/saas.shop/banner/main_business',//查询店铺主营业务
    selectShopOpen:confRoot+"/saas.shop/shop/{shopId}?is_open",//查询店铺是否已初始化

    shopEvaluateInfo:confRoot+"/saas.shop/shop/{shopId}/evaluate/info",//店铺评分信息
    shopRankInfo:confRoot+"/saas.shop/shop/{shopId}/rank/info",//获取光荣榜员工信息
    deleteShopMessage2: confRoot+'/saas.news/saas/message/delete',//删除店铺消息提示
    selectShopTips: confRoot+"/saas.news/saas/message/tips/list",//获取店铺消息列表
    sendShopHeartbeat: confRoot+"/saas.news/saas/message/heart/beat",//发送店铺心跳

    selectShopOutInfo: confRoot+"/saas.order/saas/{shopId}/index/outInfo",//获取店铺出账信息
    selectSysBanner: confRoot+"/saas.shop/banner/getImageCarousel",//

    selectShopBanner: confRoot+"/saas.shop/banner/carousel",// 轮播
    selectShopRecommend: confRoot+"/saas.shop/banner/recommend",// 霸屏

    selectOrderComment: confRoot+"/saas.shop/shop/{shopId}/order/{orderId}/comment",//获取订单评论

    selectIndexStaffSore: confRoot+'/saas.shop/shop/{shopId}/rank/info',
    selectUserMlb: confRoot+'/saas.shop/user/{userId}/mlb',//查询用户美丽币
    shopLoginLog:confRoot+ '/saas.shop/shop/{shopId}/log',//店铺登录日志

    shopWxAuth: wxRoot+'/wechat/o2o/auth/check', //店铺主页
    shopWxAuthSummary: wxRoot+'/wechat/o2o/app/summary',//  店铺主页
    userWxHref: wxRoot+'/o2o/route/0/qrcode-open_pub_succeeds',//我的美丽加模块
    shopWxFansCount: wxRoot+'/mp/shop/{shopId}/fans/count',//查询店铺的粉丝数量
    shopWxWatchCount: wxRoot+'/mp/shop/{shopId}/fans/change',//查询店铺的粉丝关注数
    shopWxRelationCount: wxRoot+'/mp/shop/{shopId}/relation/count',//查询店铺的关联数量
    getShopWatchWxImg: wxRoot+'/mp/shop/{shopId}/attention/qrcode',//获取店铺关注二维码
    getShopPayWxImg: wxRoot+'/mp/shop/{shopId}/pay/qrcode',//获取店铺支付二维码

    shopWxHref: wxRoot+'/o2o/route/{shopId}/thirdpartnar-send_public_message',//店铺绑定微信公众号跳转地址
    shopWxqrcodeHref: wxRoot+'/o2o/route/{shopId}/tools-qrcode-qrcode_pay_focus',//店铺未绑定微信公众号跳转地址
    shopMpHref: wxRoot+'/o2o/bind/shopMp/',//店铺未绑定微信公众号跳转地址

    shopMYHref: myRoot+'/',//店内top栏美业链接地址

    selectSysNotice: confRoot+"/saas.shop/notice",//获取系统公告
    selectSysInformed: confRoot+"/saas.shop/user/{userId}/notice",//获取系统公告
    userShopList: confRoot+"/saas.shop/user/{userId}/shop",//用户店铺列表
    userShopListFinance: confRoot+"/saas.shop/user/{userId}/shop/finance",//用户店铺列表财务信息

    staffShopLogin: confRoot+"/saas.shop/shop/{shopId}/staff/login",//用户店铺列表财务信息
    //主页橱窗
    selectRecommendList: confRoot+'/saas.material/saas/recommend/list',//查询橱窗列表
    recommendCard: confRoot+'/saas.material/saas/recommend/card',//推荐卡项
    recommendMassage: confRoot+'/saas.material/saas/recommend/massage',//推荐护理
    recommendProduct: confRoot+'/saas.material/saas/recommend/product' //推荐产品
  }




  }

},GLOBAL);
