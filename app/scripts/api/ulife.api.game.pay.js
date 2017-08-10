// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.game.pay',
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
      METHOD_NAME: 'game.pay',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'gameId',
        'amount'
      ],
      PARAMETERS: {
        'gameId': 'long',
        'amount': 'double'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '31002': '未找到取消单据',
      '31003': '参数错误！',
      '31004': '用户不存在！',
      '31005': '记录不存在！',
      '31022': '未找到订单退款单据',
      '31023': '你的使用次数已经用完，请明天再来！',
      '31024': '最高充值金额为5元！',
      '31025': '该活动已经结束，不能兑换！',
      '31026': '先配置该活动！',
      '31027': '您的操作太频繁了，请休息下！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('gamePayService', constructor);
    }
  }
});