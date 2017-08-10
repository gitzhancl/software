/**
 * Created by Ulife on 2016/1/15.
 * 发布状态： -1-未发布 1-取消发布 2-已发布
 */

define([
        'ulife.cms.module.myApp',
        'ulife.framework.services',
        'ulife.cms.business.config',
        'ulife.cms.menu.config',

        'ulife.api.order.cms.detail',
        'ulife.api.order.cms.OrderCancel',
        'ulife.api.order.cms.orderCommons.add',
        'ulife.api.group.info',

        'ulife.cms.directive.datetimepicker',
        'ulife.cms.directive.dateformat',
        'ulife.cms.directive.tooltip',
        "ulife.cms.service.valid",
        "ulife.cms.service.authority"

    ],
    function (app, services, BizConfig, MenuConfig, cmsOrderDetailGet,cmsOrderCancel,cmsOrderComment,groupInfo) {

        cmsOrderDetailGet.injectTo(app);
        cmsOrderCancel.injectTo(app);
        cmsOrderComment.injectTo(app);
        groupInfo.injectTo(app);

        app.filter('payStatusValue',function(){
            return function(val){
                switch (val){
                    case 1:
                        return '待支付';
                    case 2:
                        return '部分支付';
                    case 3:
                        return '支付完成';
                }
            }
        });

        app.filter('terminalValue',function(){
            return function(val){
                switch (val){
                    case '1':
                        return 'PC';
                    case '2':
                        return 'H5';
                    case '4':
                        return 'App';
                }
            }
        });
        app.filter('orderStatusValue',function(){
            return function(val){
                switch (val){
                    case 1:
                        return '已创建';
                    case 2:
                        return '已确认';
                    case 3:
                        return '已拆单';
                    case 4:
                        return '已同步到OM';
                    case 5:
                        return '配送中';
                    case 6:
                        return '客户拒收';
                    case 7:
                        return '已取消';
                    case 8:
                        return '部分取消';
                    case 9:
                        return '已挂起';
                    case 10:
                        return '已完成';
                    case 11:
                        return '待处理';
                }
            }
        });

        app.filter('orderPayStatusValue',function(){
            return function(val){
                switch (val){
                    case 0:
                        return '已创建';
                    case 1:
                        return '支付成功';
                    case 2:
                        return '支付失败';
                }
            }
        });
        app.filter('order_PayStatusValue',function(){
            return function(val){
                switch (val){
                    case 0:
                        return '已创建';
                    case 1:
                        return '等待支付';
                    case 2:
                        return '部分支付';
                    case 3:
                        return '支付成功';
                }
            }
        });
        app.filter('groupStatus',function(){
            return function(val){
                switch (val){
                    case -1:
                        return '团数据删除';
                    case 0:
                        return '正常';
                    case 1:
                        return '已成团';
                    case 2:
                        return '超时关团';
                    case 3:
                        return '活动结束';
					case 4:
						return '抢光关团';			
                    default:
                        return '';
                }
            }
        });
		app.filter('refundStatusValue',function(){
            return function(val){
                switch (val){
                    case 1:
                        return '已创建';
                    case 2:
                        return '退款成功';
                    case 3:
                        return '退款失败';
					default:
						return "未知状态";
                }
            }
        });
        app.controller('OrderDetail', ['$scope', '$location', '$route', '$filter',
            'orderCmsDetailService',
            'orderCmsOrderCancelService',
            'orderCmsOrderCommonsAddService','groupInfoService',
            'validService','authorityService',
            function ($scope, $location, $route, $filter,
                      orderCmsDetailService,
                      orderCmsOrderCancelService,
                      orderCmsOrderCommonsAddService,groupInfoService,
                      validService) {

                $scope.menuConfig = MenuConfig.menu;

                $scope.cancelOrderModel = {
                    cancelType: null,
                    cancel_reason: null,
                    remark: null,
                    operation_type:1,
                    is_need_refund:0
                }

                $scope.operation_type = [
                    {'key': '手动', 'value': 1},
                    {'key': '自动', 'value': 2}
                ];
                $scope.is_need_refund = [
                    {'key': '是', 'value': 1},
                    {'key': '否', 'value': 0}
                ];
                $scope.cancelType = [
                    {'key': '不限', 'value': null},
                    {'key': '取消', 'value': 'CANCEL'}
                ];
                $scope.cancel_reason = [
                    {'key': '请选择', 'value': null},
                    {'key': '现在不想购买', 'value': '现在不想购买'},
                    {'key': '商品价格较贵', 'value': '商品价格较贵'},
                    {'key': '支付不成功', 'value': '支付不成功'},
                    {'key': '有商品缺货', 'value': '有商品缺货'},
                    {'key': '错误或重复下单', 'value': '错误或重复下单'},
                    {'key': '等待时间过长', 'value': '等待时间过长'},
                    {'key': '更换或添加新商品', 'value': '更换或添加新商品'},
                    {'key': '审核拒绝', 'value': '审核拒绝'},
                    {'key': '其他原因', 'value': '其他原因'}

                ];

                $scope.status = [
                    {'key': '已创建', 'value': 1},
                    {'key': '已确认', 'value': 2},
                    {'key': '已拆单', 'value': 3},
                    {'key': '已同步到OM', 'value': 4},
                    {'key': '配送中', 'value': 5},
                    {'key': '客户拒收', 'value': 6},
                    {'key': '已取消', 'value': 7},
                    {'key': '部分取消', 'value': 8},
                    {'key': '已暂停', 'value': 9},
                    {'key': '已完成', 'value': 10}
                ];
                $scope.order={
                    "isGroup":999
                }

                $.when(orderCmsDetailService.sendRequest({"saleNo": $route.current.params.saleNo}))

                    .done(function (result) {
                        $scope.order = result;
                        if($scope.order.groupId!=0){
                                    $.when(groupInfoService.sendRequest({"id":$scope.order.groupId}))
                                        .done(function(res) {
                                            $scope.order.isGroup=res.status;
                                            $scope.$apply();
                                        })
                        }else{
                            $scope.order.isGroup=999;
                        }
                        $scope.$apply();
                    })
                    .fail(function (code, msg) {
                        //alert(msg);
                    });

                $scope.btnCancel = {
                    "modal": $("#addCancelModal"),
                    "open": function () {
                        if($scope.order.orderCategory!='普通订单'){
                            alert("订单类型为普通订单才能取消.");
                            return false;
                        }
                        this.modal.modal({});
                    },
                    "orderCancel": function () {
                        if (!validService.valid($scope.cancelForm)) {
                            return;
                        }
                        var rlt = confirm("是否取消订单:[" + $scope.order.saleNo + "]!")
                        if (rlt != true) {
                            return false;
                        }
                        $.when(orderCmsOrderCancelService.sendRequest({
                                "sale_no": $scope.order.saleNo,
                                "operator_id":1,// $scope.order.customer_id
                                "operation_type":$scope.cancelOrderModel.operation_type,
                                "cancel_type":$scope.cancelOrderModel.cancelType,
                                "cancel_reason":$scope.cancelOrderModel.cancel_reason,
                                "cancel_remark":$scope.cancelOrderModel.cancel_remark,
                                "is_need_refund":$scope.cancelOrderModel.is_need_refund
                            }))
                            .done(function (result) {
                                if (!result.success){
                                    alert(result.message)
                                    return false;
                                }
                                $location.path('order/detail/' + $scope.order.saleNo);
                                window.location.reload();
                                $scope.$apply();

                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })

                    }

                }


                //订单备注
                $scope.commentsModel = {
                    comment: null
                }
                $scope.btnComment = {
                    "modal": $("#addCommentsModal"),
                    "open": function () {
                        this.modal.modal({});
                    },
                    "orderComment": function () {
                        if (!validService.valid($scope.commentsForm)) {
                            return;
                        }
                        $.when(orderCmsOrderCommonsAddService.sendRequest({
                                "order_no": $scope.order.saleNo,
                                "created_by":1,// $scope.order.customer_id
                                "comment":$scope.commentsModel.comment,
                                "pay_status":$scope.order.payStatus,
                                "order_status":$scope.order.status
                            }))
                            .done(function (result) {
                                console.log(result);
                                if (!result){
                                    alert("添加失败.")
                                    return false;
                                }
                                $location.path('order/detail/' + $scope.order.saleNo);
                                window.location.reload();
                                $scope.$apply();
                            })
                            .fail(function (code, msg) {
                                alert(msg);
                            })

                    }

                }
            }
        ]);

    });