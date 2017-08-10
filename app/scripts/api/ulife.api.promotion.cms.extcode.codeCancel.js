// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.cms.extcode.codeCancel',
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
      METHOD_NAME: 'promotion.cms.extcode.codeCancel',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'ids',
        'state'
      ],
      PARAMETERS: {
        'ids': 'string',
        'state': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '-101': ''
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionCmsExtcodeCodeCancelService', constructor);
    }
  }
});