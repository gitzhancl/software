/**
 * Created by Zhangke on 2015/12/10.
 */
define([], function()
{
	return {
		defaultRoutePath: '/',
		routes: {
			'/': {
				templateUrl: '/views/index/ulife.cms.index.index.html',
				dependencies: [
					'/scripts/controller/ulife.cms.controller.index.js'
				]
			},
			'/page/list': {
				templateUrl: '/views/page/ulife.cms.page.list.html',
				dependencies: [
					'/scripts/controller/page/ulife.cms.controller.page.list.js'
				]
			},
			'/page/adList': {
				templateUrl: '/views/page/ulife.cms.page.ad.list.html',
				dependencies: [
					'/scripts/controller/page/ulife.cms.controller.page.ad.list.js'
				]
			},
			'/page/adHotShareList': {
				templateUrl: '/views/page/ulife.cms.page.adHotSharelist.html',
				dependencies: [
					'/scripts/controller/page/ulife.cms.controller.page.adHotSharelist.js'
				]
			},
		'/page/userBlackList': {
			templateUrl: '/views/page/ulife.cms.page.userBlackList.html',
			dependencies: [
				'/scripts/controller/page/ulife.cms.controller.page.userBlackList.js'
			]
		},
			'/page/edit/:id': {
				templateUrl: '/views/page/ulife.cms.page.edit.html',
				dependencies: [
					'/scripts/controller/page/ulife.cms.controller.page.edit.js'
				]
			},

			'/page/pcPrefecture':{
				templateUrl: '/views/page/ulife.cms.page.pcPrefectureList.html',
				dependencies: [
					'/scripts/controller/page/ulife.cms.controller.page.pcPrefectureList.js'
				]
			},

			'/homepage/list': {
				templateUrl: '/views/homepage/ulife.cms.homepage.list.html',
				dependencies: [
					'/scripts/controller/homepage/ulife.cms.controller.homepage.list.js'
				]
			},
			'/homepage/edit/:id': {
				templateUrl: '/views/homepage/ulife.cms.homepage.edit.html',
				dependencies: [
					'/scripts/controller/homepage/ulife.cms.controller.homepage.edit.js'
				]
			},
			'/hybrid/config':{
				templateUrl: '/views/developer/ulife.cms.hybrid.edit.html',
				dependencies: [
					'/scripts/controller/developer/ulife.cms.controller.hybrid.edit.js'
				]
			},

			'/module/newbie/:id': {
				templateUrl: '/views/module/ulife.cms.module.newbie.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.newbie.js'
				]
			},
			'/module/seasonals/:id': {
				templateUrl: '/views/module/ulife.cms.module.seasonals.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.seasonals.js'
				]
			},

			'/module/limitH5/:id': {
				templateUrl: '/views/module/ulife.cms.module.limitH5.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.limitH5.js'
				]
			},

			'/module/limitPC/:id': {
				templateUrl: '/views/module/ulife.cms.module.limitH5.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.limitH5.js'
				]
			},
			'/module/floors/:id': {
				templateUrl: '/views/module/ulife.cms.module.floors.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.floors.js'
				]
			},
			'/module/floorsH5/:id': {
				templateUrl: '/views/module/ulife.cms.module.floorsH5.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.floorsH5.js'
				]
			},
			'/module/floorsH5V2/:id': {
				templateUrl: '/views/module/ulife.cms.module.floorsH5V2.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.floorsH5V2.js'
				]
			},
			'/module/bannersH5/:id': {
				templateUrl: '/views/module/ulife.cms.module.bannersH5.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.bannersH5.js'
				]
			},
			'/module/bannersPC/:id': {
				templateUrl: '/views/module/ulife.cms.module.bannersPC.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.bannersPC.js'
				]
			},
			'/module/funcsH5/:id': {
				templateUrl: '/views/module/ulife.cms.module.funcsH5.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.funcsH5.js'
				]
			},
			'/module/html/:id': {
				templateUrl: '/views/module/ulife.cms.module.html.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.html.js'
				]
			},

			'/module/limitH5/:id': {
				templateUrl: '/views/module/ulife.cms.module.limitH5.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.limitH5.js'
				]
			},

			'/module/productListPC/:id': {
				templateUrl: '/views/module/ulife.cms.module.productListPC.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.productListPC.js'
				]
			},
			'/module/b2cExchangeSingleGift/:id': {
				templateUrl: '/views/module/ulife.cms.module.b2cExchangeSingleGift.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.b2cExchangeSingleGift.js'
				]
			},
			'/module/imgOneH5/:id': {
				templateUrl: '/views/module/ulife.cms.module.imgOneH5.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.imgOneH5.js'
				]
			},
			'/module/exchangeMoreImgH5/:id': {
				templateUrl: '/views/module/ulife.cms.module.exchangeMoreImgH5.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.exchangeMoreImgH5.js'
				]
			},
			'/module/videoH5/:id': {
				templateUrl: '/views/module/ulife.cms.module.videoH5.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.videoH5.js'
				]
			},

			'/module/videoH5V2/:id': {
				templateUrl: '/views/module/ulife.cms.module.videoH5V2.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.videoH5V2.js'
				]
			},

			'/module/videoPC/:id': {
				templateUrl: '/views/module/ulife.cms.module.videoPC.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.videoPC.js'
				]
			},

			'/module/productAreaH5/:id': {
				templateUrl: '/views/module/ulife.cms.module.productAreaH5.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.productAreaH5.js'
				]
			},

			'/module/exCouponH5/:id': {
				templateUrl: '/views/module/ulife.cms.module.exCouponH5.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.exCouponH5.js'
				]
			},
			'/module/exchangeCardPC/:id':{
				templateUrl: '/views/module/ulife.cms.module.exchangeCardPC.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.exchangeCardPC.js'
				]
			},
			'/module/exchangeCardH5/:id':{
				templateUrl: '/views/module/ulife.cms.module.exchangeCardH5.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.exchangeCardH5.js'
				]
			},
			'/module/imgPC/:id':{
				templateUrl: '/views/module/ulife.cms.module.imgPC.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.imgPC.js'
				]
			},
			'/module/singleProductH5/:id': {
				templateUrl: '/views/module/ulife.cms.module.singleProductH5.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.singleProductH5.js'
				]
			},
			'/module/exchangeSomeGift/:id': {
				templateUrl: '/views/module/ulife.cms.module.exchangeSomeGift.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.exchangeSomeGift.js'
				]
			},
			'/module/exchangeSingleGift/:id': {
				templateUrl: '/views/module/ulife.cms.module.exchangeSingleGift.html',
				dependencies: [
					'/scripts/controller/module/ulife.cms.controller.module.exchangeSingleGift.js'
				]
			},
			'/promotionType/list': {
				templateUrl: '/views/promotion/ulife.cms.promotionType.list.html',
				dependencies: [
					'/scripts/controller/promotion/ulife.cms.controller.promotionType.list.js'
				]
			},
			'/promotionActivity/list': {
				templateUrl: '/views/promotion/ulife.cms.promotionActivity.list.html',
				dependencies: [
					'/scripts/controller/promotion/ulife.cms.controller.promotionActivity.list.js'
				]
			},
			'/promotionActivity/create/:id': {
				templateUrl: '/views/promotion/ulife.cms.promotionActivity.create.html',
				dependencies: [
					'/scripts/controller/promotion/ulife.cms.controller.promotionActivity.create.js'
				]
			},
			'/promotionActivity/createSubmit/:id': {
				templateUrl: '/views/promotion/ulife.cms.promotionActivity.createSubmit.html',
				dependencies: [
					'/scripts/controller/promotion/ulife.cms.controller.promotionActivity.createSubmit.js'
				]
			},
			'/promotionActivity/createSuccess/:id': {
				templateUrl: '/views/promotion/ulife.cms.promotionActivity.createSuccess.html',
				dependencies: [
					'/scripts/controller/promotion/ulife.cms.controller.promotionActivity.createSuccess.js'
				]
			},
			'/promotionCode/list': {
				templateUrl: '/views/promotion/ulife.cms.promotionCode.list.html',
				dependencies: [
					'/scripts/controller/promotion/ulife.cms.controller.promotionCode.list.js'
				]
			},
			'/promotionSend/list': {
				templateUrl: '/views/promotion/ulife.cms.promotionSend.list.html',
				dependencies: [
					'/scripts/controller/promotion/ulife.cms.controller.promotionSend.list.js'
				]
			},
			'/promotionAutoSend/list': {
				templateUrl: '/views/promotion/ulife.cms.promotionAutoSend.list.html',
				dependencies: [
					'/scripts/controller/promotion/ulife.cms.controller.promotionAutoSend.list.js'
				]
			},
			'/promotion/blacklist': {
				templateUrl: '/views/promotion/ulife.cms.promotion.blacklist.html',
				dependencies: [
					'/scripts/controller/promotion/ulife.cms.controller.promotion.blacklist.js'
				]
			},
			'/promotionActivityGroup/list': {
				templateUrl: '/views/promotionActivity/ulife.cms.promotionActivityGroup.list.html',
				dependencies: [
					'/scripts/controller/promotionActivity/ulife.cms.controller.promotionActivityGroup.list.js'
				]
			},
			'/promotionActivityGroup/create': {
				templateUrl: '/views/promotionActivity/ulife.cms.promotionActivityGroup.create.html',
				dependencies: [
					'/scripts/controller/promotionActivity/ulife.cms.controller.promotionActivityGroup.create.js'
				]
			},
			'/promotionActivityBlacklist/list': {
				templateUrl: '/views/promotionActivity/ulife.cms.promotionActivityBlacklist.list.html',
				dependencies: [
					'/scripts/controller/promotionActivity/ulife.cms.controller.promotionActivityBlacklist.list.js'
				]
			},
			'/promotionActivityManage/list': {
				templateUrl: '/views/promotionActivity/ulife.cms.promotionActivityManage.list.html',
				dependencies: [
					'/scripts/controller/promotionActivity/ulife.cms.controller.promotionActivityManage.list.js'
				]
			},
			'/promotionActivityManage/create/:activityId': {
				templateUrl: '/views/promotionActivity/ulife.cms.promotionActivityManage.create.html',
				dependencies: [
					'/scripts/controller/promotionActivity/ulife.cms.controller.promotionActivityManage.create.js'
				]
			},
			'/promotionActivityManage/createSubmit/:activityId': {
				templateUrl: '/views/promotionActivity/ulife.cms.promotionActivityManage.createSubmit.html',
				dependencies: [
					'/scripts/controller/promotionActivity/ulife.cms.controller.promotionActivityManage.createSubmit.js'
				]
			},
			'/promotionActivityManage/createSuccess/:activityId': {
				templateUrl: '/views/promotionActivity/ulife.cms.promotionActivityManage.createSuccess.html',
				dependencies: [
					'/scripts/controller/promotionActivity/ulife.cms.controller.promotionActivityManage.createSuccess.js'
				]
			},

			'/group/list': {
				templateUrl: '/views/group/ulife.cms.group.list.html',
				dependencies: [
					'/scripts/controller/group/ulife.cms.controller.group.list.js'
				]
			},
			'/group/create': {
				templateUrl: '/views/group/ulife.cms.group.create.html',
				dependencies: [
					'/scripts/controller/group/ulife.cms.controller.group.create.js'
				]
			},
			'/group/edit/:id': {
				templateUrl: '/views/group/ulife.cms.group.edit.html',
				dependencies: [
					'/scripts/controller/group/ulife.cms.controller.group.edit.js'
				]
			},
			'/shareBuy/list': {
				templateUrl: '/views/shareBuy/ulife.cms.shareBuy.list.html',
				dependencies: [
					'/scripts/controller/shareBuy/ulife.cms.controller.shareBuy.list.js'
				]
			},
			'/shareBuy/get/:id': {
				templateUrl: '/views/shareBuy/ulife.cms.shareBuy.get.html',
				dependencies: [
					'/scripts/controller/shareBuy/ulife.cms.controller.shareBuy.get.js'
				]
			},
			'/shareBuy/create': {
				templateUrl: '/views/shareBuy/ulife.cms.shareBuy.create.html',
				dependencies: [
					'/scripts/controller/shareBuy/ulife.cms.controller.shareBuy.create.js'
				]
			},
			'/shareBuy/edit/:id': {
				templateUrl: '/views/shareBuy/ulife.cms.shareBuy.edit.html',
				dependencies: [
					'/scripts/controller/shareBuy/ulife.cms.controller.shareBuy.edit.js'
				]
			},
			'/productTags/list': {
				templateUrl: '/views/sku/ulife.cms.productTags.list.html',
				dependencies: [
					'/scripts/controller/sku/ulife.cms.controller.productTags.list.js'
				]
			},
			'/video/list' : {
				templateUrl: '/views/video/ulife.cms.video.list.html',
				dependencies: [
					'/scripts/controller/video/ulife.cms.controller.video.list.js'
				]
			},
			'/video/create': {
				templateUrl: '/views/video/ulife.cms.video.create.html',
				dependencies: [
					'/scripts/controller/video/ulife.cms.controller.video.create.js'
				]
			},
			'/video/edit/:id': {
				templateUrl: '/views/video/ulife.cms.video.edit.html',
				dependencies: [
					'/scripts/controller/video/ulife.cms.controller.video.edit.js'
				]
			},
            '/sku/list': {
                templateUrl: '/views/sku/ulife.cms.sku.list.html',
                dependencies: [
                    '/scripts/controller/sku/ulife.cms.controller.sku.list.js'
                ]
            },

            '/sku/edit/:id': {
                templateUrl: '/views/sku/ulife.cms.sku.edit.html',
                dependencies: [
                    '/scripts/controller/sku/ulife.cms.controller.sku.edit.js'
                ]
            },
            '/item/list': {
                templateUrl: '/views/sku/ulife.cms.item.list.html',
                dependencies: [
                    '/scripts/controller/sku/ulife.cms.controller.item.list.js'
                ]
            },
			'/item/payment/:id': {
                templateUrl: '/views/sku/ulife.cms.item.payment.html',
                dependencies: [
                    '/scripts/controller/sku/ulife.cms.controller.item.payment.js'
                ]
            },
			'/item/delivery/:id': {
                templateUrl: '/views/sku/ulife.cms.item.delivery.html',
                dependencies: [
                    '/scripts/controller/sku/ulife.cms.controller.item.delivery.js'
                ]
            },

            '/item/edit/:id': {
                templateUrl: '/views/sku/ulife.cms.item.edit.html',
                dependencies: [
                    '/scripts/controller/sku/ulife.cms.controller.item.edit.js'
                ]
            },

            '/log/list': {
                templateUrl: '/views/log/ulife.cms.log.list.html',
                dependencies: [
                    '/scripts/controller/log/ulife.cms.controller.log.list.js'
                ]
            },

            '/source/list': {
                templateUrl: '/views/source/ulife.cms.source.list.html',
                dependencies: [
                    '/scripts/controller/source/ulife.cms.controller.source.list.js'
                ]
            },

			'/extCoupons/list': {
				templateUrl: '/views/extcoupons/ulife.cms.extCoupons.list.html',
				dependencies: [
					'/scripts/controller/extcoupons/ulife.cms.controller.extCoupons.list.js'
				]
			},
			'/extCoupons/create/:id': {
				templateUrl: '/views/extcoupons/ulife.cms.extCoupons.create.html',
				dependencies: [
					'/scripts/controller/extcoupons/ulife.cms.controller.extCoupons.create.js'
				]
			},
			'/extCoupons/createSuccess/:id': {
				templateUrl: '/views/extcoupons/ulife.cms.extCoupons.createSuccess.html',
				dependencies: [
					'/scripts/controller/extcoupons/ulife.cms.controller.extCoupons.createSuccess.js'
				]
			},
			'/codeManage/list': {
				templateUrl: '/views/extcoupons/ulife.cms.codeManage.list.html',
				dependencies: [
					'/scripts/controller/extcoupons/ulife.cms.controller.codeManage.list.js'
				]
			},
			'/productCategory/list':{
				templateUrl: '/views/productCategory/ulife.cms.productCategory.list.html',
				dependencies: [
					'/scripts/controller/productCategory/ulife.cms.controller.productCategory.list.js'
				]
			},
			'/productCategory/edit/:id/:level/:terminal':{
				templateUrl: '/views/productCategory/ulife.cms.productCategory.edit.html',
				dependencies: [
					'/scripts/controller/productCategory/ulife.cms.controller.productCategory.edit.js'
				]
			},
			'/hotkeys/list': {
				templateUrl: '/views/hotkeys/ulife.cms.hotkeys.list.html',
				dependencies: [
					'/scripts/controller/hotkeys/ulife.cms.controller.hotkeys.list.js'
				]
			},
			'/hotkeys/edit/:id': {
				templateUrl: '/views/hotkeys/ulife.cms.hotkeys.edit.html',
				dependencies: [
					'/scripts/controller/hotkeys/ulife.cms.controller.hotkeys.edit.js'
				]
			},
			'/hotkeys/create/:0': {
				templateUrl: '/views/hotkeys/ulife.cms.hotkeys.create.html',
				dependencies: [
					'/scripts/controller/hotkeys/ulife.cms.controller.hotkeys.create.js'
				]
			},
			'/userSet/list': {
				templateUrl: '/views/privilege/ulife.cms.userSet.list.html',
				dependencies: [
					'/scripts/controller/privilege/ulife.cms.controller.userSet.list.js'
				]
			},
			'/userSet/create': {
				templateUrl: '/views/privilege/ulife.cms.userSet.create.html',
				dependencies: [
					'/scripts/controller/privilege/ulife.cms.controller.userSet.create.js'
				]
			},
			'/deptSet/list': {
				templateUrl: '/views/privilege/ulife.cms.deptSet.list.html',
				dependencies: [
					'/scripts/controller/privilege/ulife.cms.controller.deptSet.list.js'
				]
			},
			'/roleManager/list': {
				templateUrl: '/views/privilege/ulife.cms.roleManager.list.html',
				dependencies: [
					'/scripts/controller/privilege/ulife.cms.controller.roleManager.list.js'
				]
			},
			'/pageAdmin/list': {
				templateUrl: '/views/privilege/ulife.cms.pageAdmin.list.html',
				dependencies: [
					'/scripts/controller/privilege/ulife.cms.controller.pageAdmin.list.js'
				]
			},
			'/pageSet/list': {
				templateUrl: '/views/privilege/ulife.cms.pageSet.list.html',
				dependencies: [
					'/scripts/controller/privilege/ulife.cms.controller.pageSet.list.js'
				]
			},
			'/changePwd/list':{
				templateUrl: '/views/privilege/ulife.cms.changePwd.list.html',
				dependencies: [
					'/scripts/controller/privilege/ulife.cms.controller.changePwd.list.js'
				]
			},
			'/ctrlPage/list':{
				templateUrl: '/views/privilege/ulife.cms.ctrlPage.list.html',
				dependencies: [
					'/scripts/controller/privilege/ulife.cms.controller.ctrlPage.list.js'
				]
			},
			'/buttonManage/list':{
				templateUrl: '/views/privilege/ulife.cms.buttonManage.list.html',
				dependencies: [
					'/scripts/controller/privilege/ulife.cms.controller.buttonManage.list.js'
				]
			},
			'/detailed/list':{
				templateUrl: '/views/detailed/ulife.cms.detailed.list.html',
				dependencies: [
					'/scripts/controller/detailed/ulife.cms.controller.detailed.list.js'
				]
			},
			'/detailed/category':{
				templateUrl: '/views/detailed/ulife.cms.detailed.category.html',
				dependencies: [
					'/scripts/controller/detailed/ulife.cms.controller.detailed.category.js'
				]
			},
    		'/voucherchanged/list':{
        		templateUrl: '/views/voucherchanged/ulife.cms.voucherchanged.list.html',
        		dependencies: [
            			'/scripts/controller/voucherchanged/ulife.cms.controller.voucherchanged.list.js'
        		]
   		 	},
			'/adMaterial/list': {
				templateUrl: '/views/adMaterial/ulife.cms.adMaterial.html',
				dependencies: [
					'/scripts/controller/adMaterial/ulife.cms.controller.adMaterial.js'
				]
			},
			'/order/list': {
				templateUrl: '/views/order/ulife.cms.order.list.html',
				dependencies: [
					'/scripts/controller/order/ulife.cms.controller.order.list.js'
				]
			},
			'/order/detail/:saleNo': {
				templateUrl: '/views/order/ulife.cms.order.detail.html',
				dependencies: [
					'/scripts/controller/order/ulife.cms.controller.order.detail.js'
				]
			},

			'/socancelbill/list': {
				templateUrl: '/views/order/ulife.cms.socancelbill.list.html',
				dependencies: [
					'/scripts/controller/order/ulife.cms.controller.socancelbill.list.js'
				]
			},
			'/soRefundBill/list': {
				templateUrl: '/views/order/ulife.cms.soRefundBill.list.html',
				dependencies: [
					'/scripts/controller/order/ulife.cms.controller.soRefundBill.list.js'
				]
			},
			'/soCancelBill/process/:cancelBillNo': {
				templateUrl: '/views/order/ulife.cms.soCancelBill.process.html',
				dependencies: [
					'/scripts/controller/order/ulife.cms.controller.soCancelBill.process.js'
				]
			},
			'/soRefundBill/detail/:refundBillNo': {
				templateUrl: '/views/order/ulife.cms.soRefundBill.detail.html',
				dependencies: [
					'/scripts/controller/order/ulife.cms.controller.soRefundBill.detail.js'
				]
			},
			'/soRefundBill/process/:refundBillNo': {
				templateUrl: '/views/order/ulife.cms.soRefundBill.process.html',
				dependencies: [
					'/scripts/controller/order/ulife.cms.controller.soRefundBill.process.js'
				]
			},

			'/channel/list':{
				templateUrl: '/views/channel/ulife.cms.channel.list.html',
				dependencies: [
					'/scripts/controller/channel/ulife.cms.controller.channel.list.js'
				]
			},

			'/channelOM/list':{
				templateUrl: '/views/channel/ulife.cms.channel.om.list.html',
				dependencies: [
					 '/scripts/controller/channel/ulife.cms.controller.channel.om.list.js'
				]
			},

			'/payRefund/list': {
				templateUrl: '/views/payRefund/ulife.cms.payRefund.list.html',
				dependencies: [
					'/scripts/controller/payRefund/ulife.cms.controller.payRefund.list.js'
				]
			},
			'/detailReport/list': {
				templateUrl: '/views/detailReport/ulife.cms.refundDetail.list.html',
				dependencies: [
					'/scripts/controller/detailReport/ulife.cms.controller.refundDetail.list.js'
				]
			},

            '/promotionActivityBank/list':{
                templateUrl: '/views/promotionActivity/ulife.cms.promotionActivityBank.list.html',
                dependencies: [
                    '/scripts/controller/promotionActivity/ulife.cms.controller.promotionActivityBank.list.js'
                ]
            },
            '/promotionActivityBank/create/:id': {
                templateUrl: '/views/promotionActivity/ulife.cms.promotionActivityBank.create.html',
                dependencies: [
                    '/scripts/controller/promotionActivity/ulife.cms.controller.promotionActivityBank.create.js'
                ]
            },
            '/promotionActivityBank/createSubmit/:id': {
                templateUrl: '/views/promotionActivity/ulife.cms.promotionActivityBank.createSubmit.html',
                dependencies: [
                    '/scripts/controller/promotionActivity/ulife.cms.controller.promotionActivityBank.createSubmit.js'
                ]
            },
            '/promotionActivityBank/createSuccess/:id': {
                templateUrl: '/views/promotionActivity/ulife.cms.promotionActivityBank.createSuccess.html',
                dependencies: [
                    '/scripts/controller/promotionActivity/ulife.cms.controller.promotionActivityBank.createSuccess.js'
                ]
            },

			'/paySet/list': {
				templateUrl: '/views/payRecord/ulife.cms.paySet.list.html',
				dependencies: [
					'/scripts/controller/payRecord/ulife.cms.controller.paySet.list.js'
				]
			},
			'/payActSet/list': {
				templateUrl: '/views/payRecord/ulife.cms.payActivitySet.list.html',
				dependencies: [
					'/scripts/controller/payRecord/ulife.cms.controller.payActivitySet.list.js'
				]
			},
			'/recharge/list': {
				templateUrl: '/views/payRecord/ulife.cms.recharge.list.html',
				dependencies: [
					'/scripts/controller/payRecord/ulife.cms.controller.recharge.list.js'
				]
			},
			'/recharge/detailList': {
				templateUrl: '/views/payRecord/ulife.cms.recharge.detailList.html',
				dependencies: [
					'/scripts/controller/payRecord/ulife.cms.controller.recharge.detailList.js'
				]
			},
			'/pullNew/list': {
				templateUrl: '/views/pullNew/ulife.cms.pullNew.list.html',
				dependencies: [
					'/scripts/controller/pullNew/ulife.cms.controller.pullNew.list.js'
				]
			},
			'/pullNew/get/:id': {
				templateUrl: '/views/pullNew/ulife.cms.pullNew.get.html',
				dependencies: [
					'/scripts/controller/pullNew/ulife.cms.controller.pullNew.get.js'
				]
			},
			'/pullNew/create': {
				templateUrl: '/views/pullNew/ulife.cms.pullNew.create.html',
				dependencies: [
					'/scripts/controller/pullNew/ulife.cms.controller.pullNew.create.js'
				]
			},
			'/pullNew/edit/:id': {
				templateUrl: '/views/pullNew/ulife.cms.pullNew.edit.html',
				dependencies: [
					'/scripts/controller/pullNew/ulife.cms.controller.pullNew.edit.js'
				]
			},
			'/offline/list': {
				templateUrl: '/views/offline/ulife.cms.offline.list.html',
				dependencies: [
					'/scripts/controller/offline/ulife.cms.controller.offline.list.js'
				]
			},
			'/offline/get/:id': {
				templateUrl: '/views/offline/ulife.cms.offline.get.html',
				dependencies: [
					'/scripts/controller/offline/ulife.cms.controller.offline.get.js'
				]
			},
			'/offline/create': {
				templateUrl: '/views/offline/ulife.cms.offline.create.html',
				dependencies: [
					'/scripts/controller/offline/ulife.cms.controller.offline.create.js'
				]
			},
			'/offline/edit/:id': {
				templateUrl: '/views/offline/ulife.cms.offline.edit.html',
				dependencies: [
					'/scripts/controller/offline/ulife.cms.controller.offline.edit.js'
				]
			},
			'/exchangeCoupon/exchangeCouponList':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.exchangeCoupon.list.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.exchangeCoupon.list.js'
				]
			},
			'/exchangeCoupon/exchangeCouponCreate/:id':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.exchangeCoupon.create.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.exchangeCoupon.create.js'
				]
			},
			'/exchangeCoupon/exchangeCouponPreview/:id':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.exchangeCoupon.preview.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.exchangeCoupon.preview.js'
				]
			},
			'/exchangeCoupon/buildCouponList':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.buildCoupon.list.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.buildCoupon.list.js'
				]
			},
			'/exchangeCoupon/buildCouponList/create':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.buildCoupon.create.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.buildCoupon.create.js'
				]
			},
			'/exchangeCoupon/buildCouponList/edit/:id':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.buildCoupon.create.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.buildCoupon.create.js'
				]
			},
			'/exchangeCoupon/buildCouponList/previewCode/:id':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.buildCoupon.previewCode.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.buildCoupon.previewCode.js'
				]
			},
			'/exchangeCoupon/inStockList':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.inStock.list.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.inStock.list.js'
				]
			},
			'/exchangeCoupon/inStockList/create':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.inStock.create.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.inStock.create.js'
				]
			},
			'/exchangeCoupon/inStockList/:method/:id':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.inStock.create.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.inStock.create.js'
				]
			},
			'/exchangeCoupon/takeOutStockList':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.takeOutStock.list.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.takeOutStock.list.js'
				]
			},
			'/exchangeCoupon/takeOutStockList/create':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.takeOutStock.create.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.takeOutStock.create.js'
				]
			},
			'/exchangeCoupon/takeOutStockList/:method/:id':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.takeOutStock.create.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.takeOutStock.create.js'
				]
			},
			'/exchangeCoupon/takeOutStockList/detail/:id/:status':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.takeOutStock.detail.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.takeOutStock.detail.js'
				]
			},
			'/exchangeCoupon/takeOutStockList/detail/:id/:status/:version':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.takeOutStock.detail.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.takeOutStock.detail.js'
				]
			},
			'/exchangeCoupon/backStockList':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.backStock.list.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.backStock.list.js'
				]
			},
			'/exchangeCoupon/backStockList/create':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.backStock.create.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.backStock.create.js'
				]
			},
			'/exchangeCoupon/backStockList/:method/:id':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.backStock.create.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.backStock.create.js'
				]
			},
			'/exchangeCoupon/giftVideoBooklist':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.giftVideoBook.list.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.giftVideoBook.list.js'
				]
			},
			'/exchangeCoupon/giftVideoBookCreate/:id':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.giftVideoBook.create.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.giftVideoBook.create.js'
				]
			},
			'/exchangeCoupon/giftVideoBookPreview':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.giftVideoBook.preview.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.giftVideoBook.preview.js'
				]
			},
			'/exchangeCoupon/codeOutStoreList':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.codeOutStore.list.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.codeoutstore.reportlist.js'
				]
			},
			'/exchangeCoupon/codeReStoreList':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.codeReStore.list.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.coderestore.reportlist.js'
				]
			},
			'/exchangeCoupon/codeSumList':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.codeSum.list.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.codesum.reportlist.js'
				]
			},
			'/exchangeCoupon/emptyCodeList':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.emptyCode.list.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.emptyCode.reportlist.js'
				]
			},
			'/exchangeCoupon/exchangeReportList':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.exchangeReport.list.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.exchange.reportlist.js'
				]
			},

			'/salesPackage/list': {
				templateUrl: '/views/salesPackage/ulife.cms.salesPackage.list.html',
				dependencies: [
					'/scripts/controller/salesPackage/ulife.cms.controller.salesPackage.list.js'
				]
			},
			'/salesPackage/edit/:id': {
				templateUrl: '/views/salesPackage/ulife.cms.salesPackage.edit.html',
				dependencies: [
					'/scripts/controller/salesPackage/ulife.cms.controller.salesPackage.edit.js'
				]
			},
			'/salesCategory/list': {
				templateUrl: '/views/salesPackage/ulife.cms.salesCategory.list.html',
				dependencies: [
					'/scripts/controller/salesPackage/ulife.cms.controller.salesCategory.list.js'
				]
			},
			'/salesCategory/create': {
				templateUrl: '/views/salesPackage/ulife.cms.saleCategory.edit.html',
				dependencies: [
					'/scripts/controller/salesPackage/ulife.cms.controller.salesCategory.edit.js'
				]
			},
			'/salesCategory/edit/:id': {
				templateUrl: '/views/salesPackage/ulife.cms.saleCategory.edit.html',
				dependencies: [
					'/scripts/controller/salesPackage/ulife.cms.controller.salesCategory.edit.js'
				]
			},
			'/exchangeCoupon/bandingTicket':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.bandingTicket.list.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.bandingTicket.list.js'
				]
			},
			'/exchangeCoupon/ticketCodeList':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.ticketCode.list.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.ticketCode.list.js'
				]
			},
			'/exchangeCoupon/ticketStoreList':{
				templateUrl: '/views/exchangeCoupon/ulife.cms.ticketStore.list.html',
				dependencies: [
					'/scripts/controller/exchangeCoupon/ulife.cms.controller.ticketstore.reportlist.js'
				]
			}
		}
	}
});
