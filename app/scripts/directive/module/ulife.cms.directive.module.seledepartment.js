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
        
         app.directive('getdeport', ['$rootScope', 'roleDeptListService',function($rootScope,roleDeptListService) { 
            var directive = {
                restrict: 'EA',
                replace:false,

                template:   "<select class='form-control input-sm ng-pristine ng-untouched ng-valid' ng-model='departmentId' ng-options='type.id as type.name for type in deptType'></select>",

                controller: function($scope, $element,roleDeptListService) {

                    if(store.get('setDeptSelect')){
                        $scope.deptType = store.get('setDeptSelect');
                        
                        //$scope.$apply();
                    }else{
                         $.when(roleDeptListService.sendRequest(),true, false)
                            .done(function(data){
                                var arr = [];
                                _.each(data.value,function(ele){
                                    arr.push(_.pick(ele,'name','id'))
                                })
                                //部门列表赋值
                                if($element.attr('isedit') == 'true'){
                                    $element.find('select').attr('disabled','disabled');
                                }
                                $scope.deptType = arr;
                                //$scope.departmentId = $scope.deptType[0].id;
                                $scope.$apply();
                            })
                            .fail(function(){
                                alert('获取部门列表失败,请重新加载页面');
                            }) 
                    }
                    //console.log($element.attr('isedit'));
                   
                }
            };
            return directive;
    }]);
		
});
