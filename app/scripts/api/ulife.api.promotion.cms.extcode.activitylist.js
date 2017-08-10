// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.cms.extcode.activitylist',
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
      METHOD_NAME: 'promotion.cms.extcode.activitylist',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
      ],
      PARAMETERS: {
        'activityName': 'string',
        'sellprice': 'string',
        'brandName': 'string',
        'activityStatus': 'string',
        'startNumber': 'int',
        'eachPageNumber': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '22003': '获取外部优惠券列表错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionCmsExtcodeActivitylistService', constructor);
    }
  }
});