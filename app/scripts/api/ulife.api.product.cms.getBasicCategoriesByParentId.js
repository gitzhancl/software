// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.product.cms.getBasicCategoriesByParentId',
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
      METHOD_NAME: 'product.cms.getBasicCategoriesByParentId',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'parentId'
      ],
      PARAMETERS: {
        'parentId': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('productCmsGetBasicCategoriesByParentIdService', constructor);
    }
  }
});