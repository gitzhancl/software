/**
 * Created by Zhangke on 2015/12/15.
 */
define([
		'ulife.cms.module.myApp',
		'ulife.cms.business.config',
		'ulife.cms.menu.config',

		'ulife.cms.service.pageEdit',
		"ulife.cms.service.valid",
		"ulife.cms.service.authority"
	],
	function(app, BizConfig, MenuConfig) {

		app.controller('HomepageEditCtrl', [
			'$scope',
			'$route',
			'$q',

			'pageEditService',
			'validService',
			'authorityService',
			function($scope, $route, $q,
					 pageEditService, validService) {
				
				$scope.menuConfig = MenuConfig.menu;

				$.when(pageEditService.init()).
					done(function(returnObj){

						$scope.pageHandler = returnObj;
						//设置预览地址
						if (returnObj.pageInfo.deviceId == 1) {
							$scope.pageEditBtns.preview.link = BizConfig.setting['preview_links'].pchome + returnObj.pageInfo.pageId;
						} else if(returnObj.pageInfo.deviceId == 2) {
							$scope.pageEditBtns.preview.link = BizConfig.setting['preview_links'].h5home + returnObj.pageInfo.pageId;
						} else if (returnObj.pageInfo.deviceId == 3){
							$scope.pageEditBtns.preview.link = BizConfig.setting['preview_links'].h5exchangeIndex + returnObj.pageInfo.pageId;
						}else{
							$scope.pageEditBtns.preview.link = BizConfig.setting['preview_links'].pcexchangeIndex + returnObj.pageInfo.pageId;
						}


						$scope.$apply();
					})



				//工作区域-按钮组
				$scope.pageEditBtns = {
					"edit": {
						"show": true,
						"dialog": {
							homepageModuleDialog: $('#homepageModal'),
							open : function() {
								this.homepageModuleDialog.modal({});
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
