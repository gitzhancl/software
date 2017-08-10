/**
 * Created by Ulife on 2016/1/22.
 * @author lu
 * @date 2016-04-11
 */

 define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',
        'md5',

        'ulife.api.hybrid.get',
        'ulife.api.hybrid.update',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.tooltip',
        'ulife.cms.directive.dateformat',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"

    ],
    function(app, services, BizConfig, MenuConfig, MD5, hybridGet, hybridUpdate) {

        hybridGet.injectTo(app);
        hybridUpdate.injectTo(app);

        app.controller('hybridEditCtrl', ['$scope', '$location', '$route', 'hybridGetService', 'hybridUpdateService',
          'validService', 'authorityService',

            function($scope, $location, $route, hybridGetService, hybridUpdateService) {

                $scope.menuConfig = MenuConfig.menu;

                $.when(hybridGetService.sendRequest())
                    .done(function(hybridDetail){
                        $scope.list = JSON.parse(hybridDetail.hybridConfig);
                        $scope.$apply();
                    });

                function randomString(){
                    return MD5(new Date().getTime());
                };

                $scope.updateItem = function(a,b){

                    var item = $scope.list[a].maplist[b]
                    item.zipVersion = randomString();
                    alert("zipVersion已产生")
                }

                $scope.addMap =  function(index){
                    var valueList = $scope.list[index].maplist;
                    if(valueList.length && valueList[valueList.length-1].zipUrl == ""){
                        alert("当前有未完成的映射")
                        return;
                    }

                    valueList.push({
                        miniOSVersionCode: "",
                        minAndroidVersionCode: "",
                        zipUrl: "",
                        zipVersion : ""
                    })
                         console.log(valueList)
                };

                $scope.addChannel = function(){
                    $scope.list.push({
                        channel: "",
                        maplist: [{
                            miniOSVersionCode: "",
                            minAndroidVersionCode: "",
                            zipUrl: "",
                            zipVersion : ""
                        }]
                    })
                }

                $scope.delList = function(a,b){
                    $scope.list[a].maplist.pop() 
                };
               
                $scope.removeChannel = function(){
                    $scope.list.pop()
                };


                $scope.submit = function(){
                    $.when(hybridUpdateService.sendRequest({
                        "id"  : 1,
                        "hybridConfig" : JSON.stringify($scope.list)
                    }))
                    .done(function(hybridDetail){
                        alert('提交成功')
                    });
                }

            }
        ]);

    });

