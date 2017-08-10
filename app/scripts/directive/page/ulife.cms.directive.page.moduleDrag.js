/**
 * Created by Ulife on 2015/12/21.
 */
define([
        'ulife.cms.module.myApp',
        'underscore',
        'jqueryui.draggable'
    ],
    function(app, _) {

        app.directive('ulifeModuleDrag', [
            '$rootScope',
            function($rootScope) {
                return {
                    restrict: 'AM',
                    scope: true,
                    contoller: 'PageEditCtrl',
                    compile: function(tElement, tAttrs, transclude) {
                        return {
                            pre: function preLink(scope, iElement, iAttr, controller) {
                            },
                            post: function postLink(scope, iElement, iAttr, controller) {
                                iElement.draggable({
                                    appendTo: "body",
                                    helper: function() {
                                        var dom = $(this).clone();
                                        dom.width($(this).width());
                                        dom.addClass('cms-module-library-clone');
                                        return dom
                                    }
                                });
                            }
                        }
                    }
                };
            }]);
    });
