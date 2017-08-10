// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.sku.edit',
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
      METHOD_NAME: 'cms.sku.edit',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'skuinfo'
      ],
      PARAMETERS: {
        'skuinfo': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '10002': '不存在该产品',
      '10004': '参数格式错误',
      '10021': '数据版本错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsSkuEditService', constructor);
    }
  }
});