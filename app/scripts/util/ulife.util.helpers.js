/**
 * Created by Zhangke on 2015/11/13.
 */
'use strict';

define('ulife.util.helpers', [
	'zepto',
	'underscore'
], function($, _) {
	can.EJS.Helpers.prototype._imgSize = function (url, size) {
		if (url) {
			if (url.split("_").length == 1) {
				return url;
			} else {
				var imgName = url.split("_")[url.split("_").length - 1];
				var imgType = url.split("_")[url.split("_").length - 1].split(".")[1];
				return url.replace(imgName, size + "." + imgType)
			}
		}
	}

	can.EJS.Helpers.prototype._toDecimal2 = function toDecimal2(x) {
			var f = parseFloat(x);
			if (isNaN(f)) {
				return false;
			}
			var f = Math.round(x * 100) / 100;
			var s = f.toString();
			var rs = s.indexOf('.');
			if (rs < 0) {
				rs = s.length;
				s += '.';
			}
			while (s.length <= rs + 2) {
				s += '0';
			}
			return s;
	}

	can.EJS.Helpers.prototype._dateFomate = function (obj, format) {
		if (format == undefined) {
			format = 'YYYY-MM-DD HH:mm:ss';
		}
		var ret = moment(obj).format(format);
		return ret == 'Invalid date' ? '0000-00-00 00:00:00' : ret;
	};

});