// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.extcode.checkusertimes',
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
      METHOD_NAME: 'promotion.extcode.checkusertimes',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'activityId'
      ],
      PARAMETERS: {
        'activityId': 'long',
        'remark': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '20017': '注销优惠券失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionExtcodeCheckusertimesService', constructor);
    }
  }
});