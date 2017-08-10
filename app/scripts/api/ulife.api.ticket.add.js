// Auto Generated.  DO NOT EDIT!
/**
* @class  ulife.api.user.login
* @param  {angular.Module} SecurityType
* @param  {Object} SecurityType
* @param  {Object} Comm
* @return {angular.Module}
*/
define(
  'ulife.api.ticket.add',
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
      METHOD_NAME: 'ticket.add',
      SECURITY_TYPE: SecurityType.UserLogin.name,
      REQUIRED: [
        'HeadParam',
        'itemParam'
      ],
      PARAMETERS: {
        'HeadParam': 'string',
        'itemParam': 'string'
      },
      VERIFY:{
      },
      ERROR_CODE: {
      '34001': '操作失败！',
      '34002': '参数错误！',
      '34004': '商品中存在售价不等于券售价！',
      '34005': '兑换商品不能为空！',
      '34011': '券名称过长！',
      '34012': '所填资料不完整！',
      '34013': '券号前缀已存在，请重新输入！',
      '34014': '券名称前辍长度不对！',
      '34016': '商品中存在与兑换券发货方式不一致！',
      '34018': '商品的成本价不能为0！',
      '34019': '开始日期不能少于当前日期！',
      '34020': '截止日期不能少于开始日期！',
      '34021': '分组名称不能为空！',
      '34022': '分组名称长度不对！',
      '34023': 'SKU数量和可选商品个数必须大于0！',
      '34024': '兑换类型不允许修改！'
      }
    });
  }];

  return {
    injectTo: function(app){
      app.factory('ticketAddService', constructor);
    }
  }
});