/**
 * Created by Ulife on 2015/12/31.
 */
define([
        'ulife.cms.module.myApp',
        'jquery',
        'moment'
    ],
    function(app, $, moment) {

        app.directive('ulifeImgFormat', ['$filter', '$http', function($filter, $http) {
            var dateFilter = $filter('date');
            return {
                require: 'ngModel',
                link: function(scope, elm, attrs, ctrl) {

                    function formatter(value) {

                        return value
                        //return dateFilter(value, 'yyyy-MM-dd HH:mm:ss'); //format
                    }

                    function parser() {
                        if (ctrl.$viewValue) {
                            var img_url = ctrl.$viewValue;

                            var img = new Image();
                            var imgsrc = img_url;
                            imgsrc += /\?/.test(img_url) ? '&' : '?';
                            imgsrc += Date.parse(new Date())

                            img.src = imgsrc;

                            var flag = false;
                            var returnimgurl = ''
                            ctrl.$viewValue = imgsrc
                            img.onload = _.bind(function(){
                                console.log('width:'+img.width+',height:'+img.height);

                                returnimgurl = imgsrc + 'ulifewidth=' + img.width + '&ulifeheight=' + img.height;
                                ctrl.$viewValue = returnimgurl
                            }, ctrl);
                            img.onerror = function(){
                                console.log('图片不存在');
                                return ''
                            }


                        } else{
                            return null;
                        }

                    }

                    ctrl.$formatters.push(formatter);
                    ctrl.$parsers.unshift(parser);

                }
            };
        }]);
    });
