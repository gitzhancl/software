/**
 * Created by Zhangke on 2015/12/15.
 */
define([
		'ulife.cms.module.myApp',
		'ulife.cms.business.config',
		'ulife.cms.menu.config',

		'ulife.api.cms.page.deletePage',

		'ulife.cms.service.pageEdit',
		"ulife.cms.service.valid",
		"ulife.cms.service.authority"
	],
	function(app, BizConfig, MenuConfig,deletePage) {

		deletePage.injectTo(app);
		app.controller('PageEditCtrl', [
			'$location',
			'$scope',
			'$route',
			'$q',

			'pageEditService',
			'validService',
			'cmsPageDeletePageService',
			'authorityService',
			function( $location, $scope, $route, $q,
					 pageEditService, validService,cmsPageDeletePageService) {

				$scope.menuConfig = MenuConfig.menu;

				$.when(pageEditService.init()).
					done(function(returnObj){

						$scope.pageHandler = returnObj;
						
						if (!$scope.pageHandler.pageInfo.keywords) {
							//$scope.pageHandler.pageInfo.title = '光明都市菜园 家庭美食电商  很用心很顾家 生鲜、蔬菜水果、酒水饮料、粮油、休闲食品';
							$scope.pageHandler.pageInfo.keywords = '”都市菜园”全新起航，定位于打造一个有特色的、开放的、以人为本的卓越的社会化生鲜电商平台，致力于为老百姓提供一日三餐的生鲜膳食食材解决方案。';
							$scope.pageHandler.pageInfo.description = '都市菜园、都市生活、天鲜配、宅配、无公害蔬菜';
						}

						if (!$scope.pageHandler.pageInfo.elements) {
							$scope.pageHandler.pageInfo.elements = {
								header: true,
								footer: true,
								cart: true,
								backgroundColor: null,
								isLargeWidth: false
							}
						}

						//设置预览地址
						if (returnObj.pageInfo.deviceId == 1) {
							$scope.pageEditBtns.preview.link = BizConfig.setting['preview_links'].pcchannel + returnObj.pageInfo.pageId + '?preview=1';
							$scope.pageEditBtns.view.link = BizConfig.setting['view_links'].pcchannel + returnObj.pageInfo.pageId;
						} else {
							$scope.pageEditBtns.preview.link = BizConfig.setting['preview_links'].h5channel + returnObj.pageInfo.pageId;
							$scope.pageEditBtns.view.link = BizConfig.setting['view_links'].h5channel + returnObj.pageInfo.pageId;
						}
						$scope.$apply();
					})

				var pageId = $route.current.params.id;
				$scope.pageId = pageId;


				//工作区域-按钮组
				$scope.pageEditBtns = {
					"edit": {
						"show": true,
						"dialog": {
							homepageModuleDialog: $('#pageModal'),
							open : function() {
								this.homepageModuleDialog.modal({});
							},
							del:function(pageId){
								if (confirm("确认删除该页面吗？[页面ID："+pageId+"]")) {

								$.when(cmsPageDeletePageService.sendRequest({"pageId":pageId}))
									.done(function(result) {
										if(result.value){
											alert("删除成功！")
											$location.path('page/list/');
											$scope.$apply();
										}else{
											alert("删除失败！")
										}
									})
									.fail(function(err) {
										alert(err.message);
									});

							}
							},
							save: function() {
								if (!validService.valid($scope.pageForm)) {
									return;
								}
								this.close();
								$scope.pageHandler.savePageInfo();
							},
							close: function() {
								this.homepageModuleDialog.modal('hide');
							}
						}
					},
					"preview": {
						"show": true,
						"link": ""
					},
					"view": {
						"show": true,
						"link": ""
					},
					"publish": {
						"show": true,
						"dialog": {
							publishModuleModal: $('#publishModuleModal'),
							open : function() {
								this.publishModuleModal.modal({});
							}
						},
						"publish": function() {
							$scope.pageHandler.publish();
						}
					}
				};




				//打开组件编辑
				$scope.editModule = {
					data: {},
					dialog: {
						moduleModuleDialog: $("#moduleModal"),
						open: function(index) {
							$scope.pageHandler.moduleHandler.edit(index);
							this.moduleModuleDialog.modal({});
						},
						close: function() {
							this.moduleModuleDialog.modal('hide');
						}
					},
					save: function() {
						$scope.pageHandler.moduleHandler.save();
						this.dialog.close();
					}
				}



				$scope.deleteModule = {
					dialog: {
						open: function(index) {
							$scope.pageHandler.moduleHandler.edit(index);
							$("#deleteModuleModal").modal({});
						}
					},
					delete: function() {
						$scope.pageHandler.moduleHandler.delete();
						$('#deleteModuleModal').modal('hide')
					}
				}

			}
		]);
	});
