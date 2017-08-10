// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.recharge.activity.create',
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
      METHOD_NAME: 'cms.recharge.activity.create',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'title',
        'recharge_id',
        'recharge_amount',
        'promo_amount',
        'start',
        'end',
        'is_valid',
        'promoOA',
        'promoCreater',
        'promoDepartment',
        'financeDepartment',
        'limit'
      ],
      PARAMETERS: {
        'title': 'string',
        'recharge_id': 'long',
        'recharge_amount': 'int',
        'promo_amount': 'int',
        'start': 'long',
        'end': 'long',
        'is_app': 'boolean',
        'is_h5': 'boolean',
        'is_pc': 'boolean',
        'is_valid': 'boolean',
        'promoOA': 'string',
        'promoCreater': 'string',
        'promoDepartment': 'string',
        'financeDepartment': 'string',
        'limit': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40416': '操作人为空',
      '40419': '该充值配置不存在',
      '40421': '至少选择一个终端',
      '40422': '活动开始时间或结束时间不能为0',
      '40423': '活动开始时间不能比结束时间大',
      '40424': '相同充值活动不能同时存在,请修改活动时间',
      '40427': '限量不能小于或等于0',
      '40435': '赠送金额不能大于充值金额'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsRechargeActivityCreateService', constructor);
    }
  }
});