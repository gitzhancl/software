// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.promotion.cms.extcode.addBrand',
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
      METHOD_NAME: 'promotion.cms.extcode.addBrand',
      SECURITY_TYPE: SecurityType.None.name,
      REQUIRED: [
        'activityBrand',
        'activityBrandUrl'
      ],
      PARAMETERS: {
        'activityBrand': 'string',
        'activityBrandUrl': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '22002': '保存外部优惠券使用品牌错误'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('promotionCmsExtcodeAddBrandService', constructor);
    }
  }
});