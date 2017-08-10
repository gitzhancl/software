// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.sku.virtual.mapper.get',
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
      METHOD_NAME: 'cms.sku.virtual.mapper.get',
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
      '10002': '不存在该产品',
      '10004': '参数格式错误',
      '10021': '数据版本错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsSkuVirtualMapperGetService', constructor);
    }
  }
});