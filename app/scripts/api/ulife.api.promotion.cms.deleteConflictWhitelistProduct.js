// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.cms.deleteConflictWhitelistProduct',
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
      METHOD_NAME: 'promotion.cms.deleteConflictWhitelistProduct',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'id'
      ],
      PARAMETERS: {
        'id': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '21036': '获取指定渠道列表失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionCmsDeleteConflictWhitelistProductService', constructor);
    }
  }
});