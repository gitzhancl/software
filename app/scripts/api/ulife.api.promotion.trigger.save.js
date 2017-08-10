// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.trigger.save',
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
      METHOD_NAME: 'promotion.trigger.save',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'json'
      ],
      PARAMETERS: {
        'json': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '21008': '发券任务保存失败',
      '21029': '发券任务保存失败,活动未找到',
      '21030': '发券任务保存失败,执行时间需在活动有效期范围内'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionTriggerSaveService', constructor);
    }
  }
});