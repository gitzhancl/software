// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.group.confirm',
  [
    'ulife.framework.services',
    'ulife.api.security.type',

    'ulife.framework.comm'
  ],
function(services, SecurityType, Comm) {
  'use strict';


  var constructor = ['$q',
    function($q) {
      return new Comm($q, {
      METHOD_NAME: 'group.confirm',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'id'
      ],
      PARAMETERS: {
        'id': 'long',
        'groupId': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '31002': '未找到取消单据',
      '31003': '参数错误！',
      '31005': '记录不存在！',
      '31006': '很抱歉,商品补货中！',
      '31007': '团购活动剩余库存不足！',
      '31008': '团活动人数已满！',
      '31009': '团购活动已经结束！',
      '31010': '组团超时！',
      '31011': '获取订单退款单据列表错误',
      '31012': '团购活动配置错误！',
      '31013': '组团人员已满！',
      '31014': '只有新人才能参加该团！',
      '31015': '你已经参加了该团！',
      '31017': '请勿重复参团 去查看未支付订单！',
      '31102': '修改团购参数错误！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('groupConfirmService', constructor);
    }
  }
});