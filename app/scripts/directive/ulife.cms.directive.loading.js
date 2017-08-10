/**
 * Created by Zhangke on 2015/12/11.
 */
define([
		'ulife.cms.module.myApp',
        'ulife.api.role.dept.list',
		'jquery',
		'store'
	],
	function(app, DeportmentList, $,store) {
 
        DeportmentList.injectTo(app);
        
         app.directive('triggerLoading', ['$rootScope',function($rootScope) { 
            var directive = {
                restrict: 'EA',
                replace:false,
                scope: true,
                template:   "<div id='loading'><div id='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div></div>",

                controller: function($scope, $element) {

                   
                    //console.log($element.attr('isedit'));
                   
                }
            };
            return directive;
    }]);
		
});
