// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.member.address.edit',
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
      METHOD_NAME: 'member.address.edit',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'addressId',
        'consignee',
        'mobileNo',
        'addressType',
        'isDefault',
        'province',
        'city',
        'cityZone',
        'addressDetail'
      ],
      PARAMETERS: {
        'addressId': 'long',
        'consignee': 'string',
        'mobileNo': 'string',
        'phoneNo': 'string',
        'addressType': 'string',
        'isDefault': 'int',
        'province': 'string',
        'city': 'string',
        'cityZone': 'string',
        'addressDetail': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '40042': '新增会员收货地址失败',
      '40052': '修改会员收货地址失败',
      '40053': '参数值不正确：province',
      '40054': '参数值不正确：city',
      '40055': '参数值不正确：cityZone',
      '40061': '手机号码格式错误',
      '40111': '用户不存在'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('memberAddressEditService', constructor);
    }
  }
});