// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.ticket.category.mainedit',
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
      METHOD_NAME: 'ticket.category.mainedit',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'action'
      ],
      PARAMETERS: {
        'action': 'string',
        'categoryName': 'string',
        'showPc': 'int',
        'showH5': 'int',
        'sortNumber': 'int',
        'categoryIconUrl': 'string',
        'validDesc': 'string',
        'ticketIds': 'string',
        'otherMsg': 'string',
        'recId': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '34002': '参数错误！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('ticketCategoryMaineditService', constructor);
    }
  }
});