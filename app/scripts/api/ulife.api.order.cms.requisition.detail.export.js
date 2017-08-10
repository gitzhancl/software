// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.order.cms.requisition.detail.export',
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
      METHOD_NAME: 'order.cms.requisition.detail.export',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'userEmail'
      ],
      PARAMETERS: {
        'requisition_no': 'string',
        'status': 'int',
        'create_start_time': 'long',
        'create_end_time': 'long',
        'refund_start_time': 'long',
        'refund_end_time': 'long',
        'userEmail': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('orderCmsRequisitionDetailExportService', constructor);
    }
  }
});