// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.cms.extcode.singleActivity',
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
      METHOD_NAME: 'promotion.cms.extcode.singleActivity',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'activityId'
      ],
      PARAMETERS: {
        'activityId': 'long'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '22004': '获取单个外部优惠券详情'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionCmsExtcodeSingleActivityService', constructor);
    }
  }
});