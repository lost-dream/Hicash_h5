<template>
	<tabbar class="vux-demo-tabbar footer" slot="bottom">
		<tabbar-item :link="{ name: 'Home' }" :selected="$route.path === '/'">
			<span class="icon-home" slot="icon" style="position:relative;top: -2px;"
				>&#xe637;</span
			>

			<span slot="label">首页</span>
		</tabbar-item>
		<tabbar-item
			:link="{ name: 'Inquiry' }"
			:selected="$route.name === 'Inquiry'"
			v-if="isShowCredit"
		>
			<span class="icon-inquiry" slot="icon" style="position:relative;top: -2px;"
				>&#xe637;</span
			>
			<span slot="label">征信</span>
		</tabbar-item>
		<tabbar-item :link="{ name: 'Kefu' }" :selected="$route.name === 'Kefu'">
			<span class="icon-kefu" slot="icon" style="position:relative;top: -2px;"
				>&#xe637;</span
			>
			<span slot="label">客服</span>
		</tabbar-item>
		<tabbar-item
			:link="{ name: 'BreakPromise' }"
			:selected="$route.path === '/breakPromise'"
		>
			<span
				class="icon-broke-promise-area"
				slot="icon"
				style="position:relative;top: -2px;"
				>&#xe637;</span
			>
			<span slot="label">失信专区</span>
		</tabbar-item>
		<tabbar-item
			:link="{ name: 'Personal' }"
			:show-dot="personCenterDotShow"
			:selected="$route.path === '/personal/personIndex'"
		>
			<span class="icon-me" slot="icon" style="position:relative;top: -2px;"
				>&#xe637;</span
			>
			<span slot="label">我的</span>
		</tabbar-item>
	</tabbar>
</template>

<script type="text/javascript">
import { Tabbar, TabbarItem, Group, Cell } from "vux"

export default {
	components: {
		Tabbar,
		TabbarItem,
		Group,
		Cell
	},
	data() {
		return {
			sxUrl: "",
			personCenterUrl: "",
			personCenterDotShow: false,
			isShowCredit: false,
			creditShowWriteList: [
				"pandoraWC",
				"pandoraJFWK3",
				"pandoraMZWLp",
				"pandoraQRXXb"
			],
			mediasource:
				window.sessionStorage.getItem("mediasource") ||
				this.utils.getCookie("mediasource")
		}
	},
	mounted: function() {
		this.sxUrl = this.config.MWEB_PATH + "newweb/infoList/list.html"
		this.personCenterUrl =
			this.config.MWEB_PATH + "newweb/personalCenter/perCenter.html"
		if (this.$route.path === "/") {
			this.selected = true
		}

		if (this.utils.getCookie("isHaveUnreadCoupon") > "0") {
			this.personCenterDotShow = true
		}

		// 暂时隐藏征信页面
		// if(this.creditShowWriteList.indexOf(this.mediasource) > -1){
		// 	this.isShowCredit = true;
		// }

		let postData = new URLSearchParams()
		postData.append("comeFrom", "H5")
		this.IsBottomShow(postData)
	},
	methods: {
		IsBottomShow(postData) {
			this.common.IsBottomShow(postData).then(res => {
				console.info("res", res)
			})
		}
	}
}
</script>
