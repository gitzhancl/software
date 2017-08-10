/**
 * Created by Ulife on 2016/1/11.
 */
define(
    [
        'ulife.cms.module.myApp',
        'jquery.cookie',
        'underscore',
        'store',
        'ulife.api.role.dept.list'
    ],
    function(app, cookie, _, store,DeportmentList ) {

        DeportmentList.injectTo(app);

        app.factory('deportmentService', [
            'roleDeptListService',
            '$location',
            function(roleDeptListService,$location) {
                var obj = {};
                var sUrl = $location.absUrl();

                if(!_.isEmpty(store.get('setDeptSelect')) &&
                 !_.isEmpty(store.get('setDeptList')) && $.cookie("isprodList") == "true"){
                 }else{
                     $.cookie('isprodList','true');
                        $.when(roleDeptListService.sendRequest('',true, false))
                        .done(function(data){
                            var arr = [];
                            var obj = {};

                            _.each(data.value,function(ele){
                                arr.push(_.pick(ele,'name','id'));
                                _.each(ele.second,function(item){
                                    arr.push(_.pick(item,'name','id'));
                                })
                            })
                        //obj =  _.indexBy(arr, 'id');
                            _.each(arr,function(items){
                                obj[items.id] = items.name;
                            })          
                            store.set('setDeptList',obj);
                            store.set('setDeptSelect',arr); 
                            if(/exchangeCoupon/g.test(sUrl)){
                                window.location.reload(); 
                            }
                                                                        
                        })
                        .fail(function(){
                            alert('获取部门列表失败,请重新加载页面');
                        })
                 }
                // if((_.isEmpty(store.get('setDeptList')) || _.isEmpty(store.get('setDeptSelect')))
                // ||($.cookie("isprodList") != "true")){
      
                        
                    
                     
                // }

                
                return obj;
              
            }
        ]);
    });