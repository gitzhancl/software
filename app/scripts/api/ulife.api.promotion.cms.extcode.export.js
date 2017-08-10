// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.cms.extcode.export',
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
      METHOD_NAME: 'promotion.cms.extcode.export',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'userEmail'
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
        'userEmail': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '22009': '导出外部CODE失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionCmsExtcodeExportService', constructor);
    }
  }
});