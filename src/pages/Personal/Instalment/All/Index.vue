<template>
	<div v-cloak>
		<download-pop
			v-if="this.utils.getPlatform() != 'APP' && mediasource !== 'pandoraKNSSJ'"
		></download-pop>
		<page-header
			:jumpRouteName="jumpRouteName"
			v-if="this.utils.getPlatform() != 'APP' && !this.utils.getCookie('backUrl')"
			:title="title"
			:showBack="showBack"
			:showBtnClose="showBtnClose"
		></page-header>
		<div
			id="content"
			class="content"
			:style="{
				'padding-top':
					this.utils.getPlatform() == 'APP' || !!this.utils.getCookie('backUrl')
						? 0
						: '2.26667rem'
			}"
		>
			<div>
				<sticky
					scroll-box="content"
					ref="sticky"
					:offset="46"
					:check-sticky-support="false"
					:disabled="disabled"
				>
					<div class="tab-wrap">
						<tab
							custom-bar-width="60px"
							active-color="#FF7640"
							bar-active-color="#FF7640"
							v-model="index"
						>
							<!-- <tab-item badge-label="1" :selected="(tabTitle === '逾期订单')" :key="0" >逾期订单</tab-item>
							<tab-item badge-label="1" :key="1" >正常订单</tab-item> -->
							<tab-item
								:badge-label="item.num"
								:selected="tabTitle === item.title"
								v-for="(item, index) in tabList"
								@click="demo2 = item.title"
								:key="index"
								>{{ item.title }}</tab-item
							>
						</tab>
						<button
							class="btn-batch-repayment"
							v-if="currentType === 'default' && index === 0 && overdueNum > 0"
							@click="batchRepayment"
						>
							批量还款
						</button>
						<button
							class="btn-cancel"
							v-if="currentType === 'batchRepayment' && index === 0 && overdueNum > 0"
							@click="cancel"
						>
							取消
						</button>
					</div>
				</sticky>
			</div>
			<swiper
				@on-index-change="onIndexChange"
				v-model="index"
				:show-dots="false"
				:threshold="150"
				:class="{
					'selected-swiper': currentType === 'batchRepayment',
					'app-swiper': this.utils.getPlatform() == 'APP'
				}"
			>
				<swiper-item :key="0" ref="swiperItemRef" v-if="index === 0">
					<instalment-overdue
						ref="overdue"
						@selectedItems="getSelectedItems"
						:currentType="currentType"
						:bannerADHeight="bannerADHeight"
						:swiperHeight="swiperHeight"
						:isShowBanner="isShowBanner"
					></instalment-overdue>
				</swiper-item>
				<swiper-item :key="1" ref="swiperItemRef" v-else>
					<instalment-normal
						ref="normal"
						@watchChild="accountOrderPage"
						:bannerADHeight="bannerADHeight"
						:swiperHeight="swiperHeight"
						:isShowBanner="isShowBanner"
					></instalment-normal>
				</swiper-item>
			</swiper>
			<button
				class="btn-recharge"
				@click="btnRecharge"
				:disabled="isDisabled"
				v-if="currentType === 'batchRepayment' && index === 0"
				:class="{ 'hide-banner': !isShowBanner }"
			>
				充值还款
			</button>
		</div>
		<a
			class="banner"
			:href="bannerUrl"
			v-if="isShowBanner && mediasource !== 'pandoraKNSSJ'"
			ref="bannerAD"
		>
			<a href="javascript:void(0);" class="btn-close" @click="hideBanner">×</a>
			<img :src="bannerImgUrl" width="100%" height="100%" />
		</a>
		<confirm-dialog
			:isShowDialog="isShowDialog"
			:dialogTitle="dialogTitle"
			:dialogDefaultTitle="dialogDefaultTitle"
			:appNoList="appNoList"
			:totalAmount="totalAmount"
			:popType="popType"
			:onConfirm="onConfirm"
			@showDialog="showDialog"
		></confirm-dialog>
	</div>
</template>

<script type="text/javascript">
import { Tab, TabItem, Swiper, SwiperItem, Sticky } from "vux"
import PageHeader from "@/components/PageHeader.vue"
import downloadPop from "@/components/downloadPop.vue"
import ConfirmDialog from "@/components/Dialog.vue"
import InstalmentNormal from "@/pages/Personal/Instalment/Normal/normal.vue"
import InstalmentOverdue from "@/pages/Personal/Instalment/Overdue/overdue.vue"

export default {
	components: {
		Tab,
		TabItem,
		PageHeader,
		downloadPop,
		ConfirmDialog,
		Swiper,
		SwiperItem,
		Sticky,
		InstalmentNormal,
		InstalmentOverdue
	},
	data() {
		return {
			title: this.$router.history.current.meta.title,
			showBtnClose: false,
			showBack: true,
			index: 0,
			isDisabled: true,
			selectedItems: [],
			currentType: "default", // 分为默认和批量还款两种类型
			isShowDialog: false,
			dialogTitle: "充值确认",
			popType: "rechargePop",
			dialogDefaultTitle: "您确认要对订单号为",
			appNoList: [],
			totalAmount: "的订单共计<span>1238.00</span>元进行还款吗？",
			showSpace: false,
			disabled:
				typeof navigator !== "undefined" &&
				/iphone/i.test(navigator.userAgent) &&
				/ucbrowser/i.test(navigator.userAgent),
			isShowBanner: true,
			bannerImgUrl: "",
			bannerUrl: "",
			overdueNum: 0,
			normalNum: 0,
			tabTitle: "逾期订单",
			tabList: [],
			accountOrderPageData: "",
			jumpRouteName: "Personal",
			bannerADHeight: 0,
			swiperHeight: 0,
			mediasource: ""
		}
	},
	mounted() {
		this.mediasource = window.sessionStorage.getItem("mediasource")
		this.accountOrderPage()
	},
	methods: {
		accountOrderPage(refApplyingStatus) {
			let userName = this.utils.getCookie("userName")
			let postData = new URLSearchParams()
			postData.append("userName", userName)

			this.common.accountOrderPage(postData).then(res => {
				let data = res.data
				this.accountOrderPageData = data
				this.bannerImgUrl = data.bannerImgUrl
				this.bannerUrl = data.bannerUrl
				this.overdueNum = data.overdueNum
				this.tabTitle =
					!this.$route.query.from && this.overdueNum > 0 ? "逾期订单" : "正常订单"

				this.overdueNum = this.overdueNum === 0 ? "" : String(this.overdueNum)

				let tabList = [
					{
						title: "逾期订单",
						num: this.overdueNum
					},
					{
						title: "正常订单",
						num: ""
					}
				]
				this.tabList = tabList
				if (refApplyingStatus) {
					this.$refs.normal.parentHandleclick(data)
				}
				this.bannerADHeight = this.$refs.bannerAD && this.$refs.bannerAD.offsetHeight
				this.swiperHeight = this.$refs.swiperItemRef.$el.clientHeight

				if (!this.bannerImgUrl && !this.bannerUrl) {
					this.isShowBanner = false
				}
			})
		},
		getSelectedItems: function(selectedItems) {
			this.selectedItems = selectedItems
		},
		batchRepayment: function() {
			this.currentType = "batchRepayment"
			console.log(
				"this.$refs.scrollerBottom===",
				this.$refs.overdue.$refs.scrollerBottom
			)
			this.$nextTick(() => {
				this.$refs.overdue.$refs.scrollerBottom.reset({ top: 0 })
			})
		},
		cancel: function() {
			this.currentType = "default"
		},
		btnRecharge: function() {
			this.isShowDialog = true
		},
		showDialog: function(showDialog) {
			this.isShowDialog = showDialog
		},
		hideBanner: function() {
			this.bannerADHeight = 0
			this.isShowBanner = false
		},
		onIndexChange: function(index) {
			if (index === 0) {
				this.$refs.overdue.parentHandleclick()
			} else {
				//this.swiperHeight = this.$refs.swiperItemRef.$el.clientHeight;
				this.$refs.normal.parentHandleclick(this.accountOrderPageData)
			}
			this.accountOrderPage()
		},
		onConfirm: function() {
			const appNoStr = this.appNoList.join(",")
			const userName = this.utils.getCookie("userName")
			window.location.href =
				this.config.MWEB_PATH +
				"newweb/personalCenter/rechargePay.html?appNo=" +
				appNoStr +
				"&userName=" +
				userName
		}
	},
	watch: {
		selectedItems: function(val, oldVal) {
			this.selectedItems = val
			this.isDisabled = !(this.selectedItems.length > 0)
			this.appNoList = _.pluck(this.selectedItems, "value")
			const amountList = _.pluck(this.selectedItems, "amount")
			let sum = _.reduce(
				amountList,
				function(memo, num) {
					return memo + num
				},
				0
			)
			//保留2位小数，如：2，会在2后面补上00.即2.00
			sum = this.utils.toDecimal2(sum)
			this.totalAmount = "的订单共计<span>" + sum + "元</span>进行还款吗？"
		}
	}
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import "~bowerComponents/sass-rem/_rem.scss";

.AllIndex {
	background: #f2f2f2;
	.content {
		height: calc(100vh - 1.26667rem);
		padding-top: rem(51px);
		//overflow-y: auto;
		.tab-wrap {
			position: relative;
			.vux-tab-wrap {
				background: #fff;
				border-bottom: 1px solid #eee;
			}
			.vux-tab-container {
				width: 50%;
			}
			.vux-tab .vux-tab-item {
				background: 0;
				.vux-tab-item-badge {
					font-size: 12px;
					top: rem(-14px);
					bottom: 0;
					height: rem(12px);
					padding: 0 rem(6px);
					margin: auto 0 auto rem(-4px);
					line-height: rem(12px);
					background: #d0021b !important;
				}
			}
			.btn-batch-repayment,
			.btn-cancel {
				position: absolute;
				top: 50%;
				right: rem(16px);
				width: rem(60px);
				height: rem(26px);
				line-height: rem(28px);
				background: #ff7640;
				border-radius: 5px;
				border: 0;
				font-size: 11px;
				color: #fff;
				text-align: center;
				-webkit-transform: translateY(-50%);
				-moz-transform: translateY(-50%);
				-ms-transform: translateY(-50%);
				-o-transform: translateY(-50%);
				transform: translateY(-50%);
			}
		}
		.vux-swiper {
			height: calc(100vh - 7.3rem) !important;
			//height: calc(100vh - 4.26667rem) !important;
		}
		.app-swiper .vux-swiper {
			height: calc(100vh - 2rem) !important;
		}
		.btn-recharge {
			position: absolute;
			left: 0;
			bottom: rem(70px);
			width: 100%;
			height: rem(49px);
			background: #ff7640;
			border: 0;
			font-size: 15px;
			color: #fff;
		}
		.btn-recharge:disabled {
			background-color: #ddd;
			color: #fff;
		}
		.btn-recharge.hide-banner {
			bottom: 0;
		}
	}
	.banner {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: rem(70px);
		border: 0;
		font-size: 15px;
		color: #fff;
		.btn-close {
			position: absolute;
			display: block;
			font-size: 20px;
			top: 0;
			right: rem(8px);
			color: #fff;
		}
		img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
