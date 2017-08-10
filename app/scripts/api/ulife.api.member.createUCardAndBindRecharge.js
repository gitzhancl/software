// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.member.createUCardAndBindRecharge',
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
      METHOD_NAME: 'member.createUCardAndBindRecharge',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'serialNumber',
        'customerId',
        'giftCardPrefix',
        'amount',
        'giftcardType',
        'departmentId',
        'operator',
        'usageReason',
        'origin',
        'expirationDate'
      ],
      PARAMETERS: {
        'serialNumber': 'string',
        'customerId': 'long',
        'giftCardPrefix': 'string',
        'amount': 'double',
        'giftcardType': 'string',
        'departmentId': 'long',
        'operator': 'string',
        'usageReason': 'string',
        'origin': 'string',
        'expirationDate': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40109': '充值失败！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('memberCreateUCardAndBindRechargeService', constructor);
    }
  }
});