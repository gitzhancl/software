/**
 * Created by Zhangke on 2015/12/14.
 */
define([
		'ulife.cms.module.myApp',

		'bootstrap.datetimepicker',
		'bootstrap.datetimepicker.zh-CN'
	],
	function(app) {
	
		app.directive('ulifeDatepicker', ['$rootScope', function($rootScope) {
			return {
				restrict: 'A',
				scope: true,
				compile: function(tElement, tAttrs, transclude) {

					tElement.datetimepicker({
						bootcssVer: 2,
						format: "yyyy-mm-dd",
						autoclose: true,
						todayBtn: true,
						todayHighlight: true,
						pickerPosition: "bottom-left",
						language: "zh-CN",
						minView: 2,
						initialDate: new Date()
					});
				}
			};
		}]);
	});
