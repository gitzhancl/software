/**
 * Created by Zhangke on 2015/12/11.
 */
define([
		'ulife.cms.module.myApp',
		'jquery',
		'jqueryui.sortable'
	],
	function(app, $) {

		app.directive('ulifeSortable', ['$rootScope', function($rootScope) {
			return {
				restrict: 'A',
				scope: true,
				compile: function(tElement, tAttrs, transclude) {

					tElement.sortable({
						items: tAttrs.ulifeSortable,
						sort: function() {
							// gets added unintentionally by droppable interacting with sortable
							// using connectWithSortable fixes this, but doesn't allow you to customize active/hoverClass options
							$( this ).removeClass( "ui-state-default" );
						}
					});
				}
			};
		}]);
});
