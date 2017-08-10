// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.cms.extcode.codeManageList',
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
      METHOD_NAME: 'promotion.cms.extcode.codeManageList',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
      ],
      PARAMETERS: {
        'code': 'string',
        'orderSn': 'string',
        'customerId': 'string',
        'phone': 'string',
        'codeStatus': 'string',
        'useStartTime': 'long',
        'useEndTime': 'long',
        'name': 'string',
        'activityId': 'string',
        'startNumber': 'int',
        'eachPageNumber': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '22006': '获取外部CODE管理列表错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionCmsExtcodeCodeManageListService', constructor);
    }
  }
});