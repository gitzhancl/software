// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.cms.ticket.getSaleCompany',
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
      METHOD_NAME: 'cms.ticket.getSaleCompany',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
      ],
      PARAMETERS: {
        'code': 'string',
        'name': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '63002': '参数错误',
      '63003': '请选择查询条件'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('cmsTicketGetSaleCompanyService', constructor);
    }
  }
});