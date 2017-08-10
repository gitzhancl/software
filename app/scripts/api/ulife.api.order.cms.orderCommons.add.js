// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.cms.orderCommons.add',
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
      METHOD_NAME: 'order.cms.orderCommons.add',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'order_no',
        'comment'
      ],
      PARAMETERS: {
        'order_no': 'string',
        'type': 'string',
        'order_status': 'int',
        'pay_status': 'int',
        'comment': 'string',
        'created_by': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderCmsOrderCommonsAddService', constructor);
    }
  }
});