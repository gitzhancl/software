// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.item.clone',
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
      METHOD_NAME: 'cms.item.clone',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'id',
        'salesChannels'
      ],
      PARAMETERS: {
        'id': 'long',
        'salesChannels': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '10001': '不存在该产品',
      '10008': '销售渠道为空'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsItemCloneService', constructor);
    }
  }
});