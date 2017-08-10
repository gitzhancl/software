// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.ticket.giftfile.edit',
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
      METHOD_NAME: 'ticket.giftfile.edit',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'action'
      ],
      PARAMETERS: {
        'action': 'string',
        'ticketIds': 'string',
        'videoUrl': 'string',
        'imageUrl': 'string',
        'startTime': 'long',
        'endTime': 'long',
        'companyName': 'string',
        'companyId': 'long',
        'validTag': 'int',
        'recId': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '34001': '操作失败！',
      '34002': '参数错误！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('ticketGiftfileEditService', constructor);
    }
  }
});