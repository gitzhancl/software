/**
 * Created by Zhangke on 2015/12/15.
 */

define([
		'ulife.cms.module.myApp',
		'ulife.framework.services',
		'ulife.cms.business.config',
		'ulife.cms.menu.config',

		'ulife.api.guide.cms.get',
		'ulife.api.guide.update',
		'ulife.api.cms.page.add',

		'ulife.cms.directive.datepicker',
		'ulife.cms.directive.datetimepicker',
		'ulife.cms.directive.tooltip',
		'ulife.cms.directive.dateformat',
		"ulife.cms.service.valid",
		"ulife.cms.service.authority"

	],
	function(app, services, BizConfig, MenuConfig, guideGet,guideUpdate) {
		guideGet.injectTo(app); 
		guideUpdate.injectTo(app);

		app.controller('adListCtrl', ['$scope', '$location', '$route',
			'guideCmsGetService', 
			'guideUpdateService',
			'validService',
			'authorityService',

			function($scope, $location, $route, guideCmsGetService,guideUpdateService,validService) {

				$scope.menuConfig = MenuConfig.menu;

				$scope.gotoPageEdit = function(index) {
					$location.path('page/edit/' + index);
				}
				$scope.renderObj = {};


                $scope.status = [
                    {'key': '有效', 'value': 0},
                    {'key': '无效', 'value': -1}

                ];
				$scope.pageType = [
					{'key': 'PC', 'deviceId': 1},
					{'key': 'H5', 'deviceId': 2}
				];

				$scope.addPage = {
					"modal": $("#addPageModal"),
					"open": function () {
						this.modal.modal({});
					},
					"save": function() {
						this.modal.modal('hide');

						this.addPage();
						this.page = this.oriPage;
					},
					"oriPage": {
						"deviceId": 1
					},
					"page": {
						"deviceId": 1
					},
					addPage: function() {
						$.when(cmsPageAddService.sendRequest(this.page))
							.done(function(result) {
								$location.path('page/edit/' + result.pageId);

								$scope.$apply();
							})
							.fail(function() {
							})
					}
				}
				$scope.searchPage = {
					"search": function(searchParams) {
						this.getData();
					},
					"getData": function() {
						
						var that = this;
						//获取页面列表
						$.when(guideCmsGetService.sendRequest())
							.done(function(result) {
					
								$scope.tmp = result;
								$scope.$apply();
							})
							.fail(function() {
							})
					},
					"goto": function(pageNum) {
						this.pageNum = pageNum;
						if (!!pageNum && _.isNumber(pageNum) && pageNum > 0) {
							this.params.from = this.pageSize * (pageNum - 1);
						}
						this.getData()

					},
					"pre": function() {
						if (this.pageNum == 1) {
							return;
						}
						this.params.from -= this.pageSize;
						this.pageNum--;
						this.getData();
					},
					"next": function() {
						if (this.pageNum == this.pageTotal) {
							return;
						}
						this.params.from += this.pageSize;
						this.pageNum++;
						this.getData();
					}
				}


                $scope.btns = {
                    "save": function(){ 
  						if (!validService.valid($scope.guideForm)) {
                            return;
                        }
                        $.when(guideUpdateService.sendRequest({"params":angular.toJson($scope.tmp)}))
                            .done(function(result) {
                                 window.location.reload();
                            })
                            .fail(function(code, msg) {
                                alert(msg);
                            })
                    },
                };
				$scope.searchPage.search();



			}
		]);

	});

