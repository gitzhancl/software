/**
 * Created by Zhangke on 2015/12/14.
 */
define([
		'ulife.cms.module.myApp',

		'bootstrap.datetimepicker',
		'bootstrap.datetimepicker.zh-CN'
	],
	function(app) {

		app.directive('ulifeDatetimepicker', ['$rootScope', function($rootScope) {
			return {
				restrict: 'A',
				scope: true,
				compile: function(tElement, tAttrs, transclude) {
					return {
						pre: function preLink(scope, iElement, iAttr, controller) {
						},
						post: function postLink(scope, iElement, iAttr, controller) {

							iElement.datetimepicker({
								bootcssVer: 2,
								format: "yyyy-mm-dd hh:ii:ss",
								autoclose: true,
								todayBtn: true,
								todayHighlight: true,
								minuteStep: 5,
								pickerPosition: "bottom-left",
								language: "zh-CN",
								initialDate: new Date()
							});
						}
					}

				}
			};
		}]);
	});
