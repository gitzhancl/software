// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.pc.prefecture.addOrEdit',
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
      METHOD_NAME: 'pc.prefecture.addOrEdit',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'id',
        'sort',
        'title'
      ],
      PARAMETERS: {
        'id': 'long',
        'sort': 'int',
        'title': 'string',
        'imagesUrl': 'string',
        'skipUrl': 'string',
        'spareFields': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '30109': '操作失败！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('pcPrefectureAddOrEditService', constructor);
    }
  }
});