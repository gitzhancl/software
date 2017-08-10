// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.cms.extcode.addCount',
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
      METHOD_NAME: 'promotion.cms.extcode.addCount',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'id',
        'count'
      ],
      PARAMETERS: {
        'id': 'long',
        'count': 'int'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '21011': '追加数量失败'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionCmsExtcodeAddCountService', constructor);
    }
  }
});