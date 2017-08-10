/**
 * Created by Ulife on 2016/3/25.
 */
define([
        'ulife.cms.module.myApp',
        'jquery',
        'underscore',
        'wangEditor'
    ],
    function(app, $, _, wangEditor) {

        app.directive('wangEditor', ['$sce',function($sce) {
        return {
            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            link: function(scope, element, attrs, ngModel) {
                if (!ngModel) return; // do nothing if no ng-model
                $("<div>")
                    .attr("id", ngModel.$name)
                    .height(400)
                    .appendTo(element);


                scope.editor = new wangEditor(ngModel.$name);

                scope.editor.config.menus = [
                    'source',
                    '|',
                    'bold',
                    'underline',
                    'italic',
                    'strikethrough',
                    'eraser',
                    'forecolor',
                    'bgcolor',
                    '|',
                    'quote',
                    'fontfamily',
                    'fontsize',
                    'head',
                    'unorderlist',
                    'orderlist',
                    'alignleft',
                    'aligncenter',
                    'alignright',
                    '|',
                    'link',
                    'unlink',
                    'table',
                    //'emotion',
                    '|',
                    'img',
                    'video',
                    'location',
                    //'insertcode',
                    '|',
                    'undo',
                    'redo',
                    'fullscreen'
                ];

                scope.editor.onchange = _.bind(function () {
                    this.ngModel.$setViewValue(this.editor.$txt.html());
                }, {
                    editor: scope.editor,
                    ngModel: ngModel
                })

                scope.editor.create();

                // Specify how UI should be updated
                ngModel.$render = function() {
                    scope.editor.$txt.html($sce.getTrustedHtml(ngModel.$viewValue || ''))
                };
            }
        };
        }]);
    });
