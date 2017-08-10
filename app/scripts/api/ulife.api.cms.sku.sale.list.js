// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.sku.sale.list',
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
      METHOD_NAME: 'cms.sku.sale.list',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'status'
      ],
      PARAMETERS: {
        'id': 'long',
        'productCode': 'string',
        'name': 'string',
        'status': 'int',
        'startNumber': 'int',
        'eachPageNumber': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '10025': '获取SKU在售清单列表错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsSkuSaleListService', constructor);
    }
  }
});