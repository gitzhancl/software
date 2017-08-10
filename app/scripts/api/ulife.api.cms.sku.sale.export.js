// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.sku.sale.export',
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
      METHOD_NAME: 'cms.sku.sale.export',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'status',
        'userEmail'
      ],
      PARAMETERS: {
        'id': 'long',
        'productCode': 'string',
        'name': 'string',
        'status': 'int',
        'userEmail': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '10026': '导出在售清单错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsSkuSaleExportService', constructor);
    }
  }
});