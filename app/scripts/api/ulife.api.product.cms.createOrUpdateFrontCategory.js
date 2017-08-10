// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.product.cms.createOrUpdateFrontCategory',
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
      METHOD_NAME: 'product.cms.createOrUpdateFrontCategory',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'category'
      ],
      PARAMETERS: {
        'category': 'Api_PRODUCT_FrontCategoryCreateRequest'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('productCmsCreateOrUpdateFrontCategoryService', constructor);
    }
  }
});