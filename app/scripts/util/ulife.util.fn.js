'use strict';

define('ulife.util.fn', [
  'zepto',
  'underscore',
  'md5',
  'store'
], function($, _, md5, store) {


  return {
    checkEmail: function(data) {
      return /^([a-zA-Z0-9-_]*[-_\.]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)+[\.][a-zA-Z]{2,3}([\.][a-zA-Z]{2})?$/.test(data)
    },

    isMobile: {
      Android: function() {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
      },
      Firefox: function() {
        return (navigator.userAgent.indexOf("Firefox") > -1)
      },
      QQ: function () {
        return (navigator.userAgent.indexOf('QQ') > -1);
      },
      WeChat: function() {
        var isWeChat = navigator.userAgent.match(/MicroMessenger/i);
        return isWeChat
      },
      AlipayChat: function() {
        var isAlipayChat = navigator.userAgent.match(/AlipayClient/i);
        if (isAlipayChat) {
          store.remove('IS_APP');
        }

        return isAlipayChat
      },
      APP: function() {
          return false;
      },
      any: function() {
        return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows()) || this.Firefox();
      }
    }
  };

});