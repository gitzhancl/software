/**
 * Created by Ulife on 2016/1/11.
 */
define(
    [
        'ulife.cms.module.myApp',
        'moment',
        'underscore'
    ],
    function(app, moment, _) {


        app.factory('validService', [
            '$route',
            '$filter',
            function($route, $filter) {

                return {
                    "valid": function(form) {
                        if (form.$invalid) {
                            var errMsg = "";
                            _.each(form.$error, function(value, key, list) {
                                if (key == "required") {
                                    errMsg = "缺少必填项！";
                                    _.each(value, function(value1, key1, list1) {
                                        errMsg += value1.$name + ", ";
                                    })
                                } else {
                                    _.each(value, function(value1, key1, list1) {
                                        errMsg = value1.$viewValue  + "： 无效值";
                                    })
                                }

                            })
                            alert(errMsg);
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
            }
        ]);
    });