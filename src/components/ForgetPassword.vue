<template>
	<div class="forget-password-body">
		<!-- header -->
		<header class="credit-header">
			<!-- closeBtn -->
			<a class="go-history" href="javascript:history.go(-1);"></a>
			<h1>{{ title }}</h1>
		</header>
		<div class="container">
			<div class="forget-password-form" v-if="step === 1">
				<div class="mobile-wrap">
					<i class="iconfont">&#xe784;</i>
					<x-input
						v-model="mobile"
						class="mobile"
						name="mobile"
						placeholder="请输入手机号码"
						keyboard="number"
						is-type="china-mobile"
						:max="11"
					>
					</x-input>
				</div>
				<div class="message-code-wrap">
					<i class="iconfont">&#xe66c;</i>
					<x-input
						v-model="messageCode"
						placeholder="请输入短信验证码"
						class="weui-vcode message-code"
						keyboard="number"
						type="tel"
						:max="5"
					>
						<x-button
							slot="right"
							type="primary"
							mini
							@click.native="getMessageCode('middle')"
							:class="{ 'time-text': isCountdown }"
						>
							{{ getMessageCodeText }}
						</x-button>
					</x-input>
				</div>
				<toast
					v-model="showPositionValue"
					type="text"
					:time="3000"
					is-show-mask
					:position="position"
					>{{ errorMsg }}</toast
				>
				<button class="btn-next" @click="nextStep1('middle')">确认</button>
			</div>
			<div class="forget-password-form" v-if="step === 2">
				<div class="new-password-wrap">
					<i class="iconfont">&#xe623;</i>
					<x-input
						v-model="newPassword"
						class="new-password"
						placeholder="请输入6位至12位字母加数字组合"
						type="password"
						:max="12"
					>
					</x-input>
				</div>
				<div class="repeat-password-wrap">
					<i class="iconfont">&#xe623;</i>
					<x-input
						v-model="repeatPassword"
						placeholder="请再次输入密码"
						class="weui-vcode repeat-password"
						type="password"
						:max="12"
					>
					</x-input>
				</div>
				<toast
					v-model="showPositionValue"
					type="text"
					:time="3000"
					is-show-mask
					:position="position"
					>{{ errorMsg }}</toast
				>
				<button class="btn-next" @click="nextStep2('middle')">确认</button>
			</div>
		</div>
	</div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
.weui-tab__panel {
	padding-bottom: 0 !important;
}
.forget-password-body {
	width: 100%;
	height: 100%;
	background-color: #fff;
	.credit-header {
		.go-history {
			left: 0.85rem;
		}
		.go-history:before {
			color: #3f3f3f;
		}
		h1 {
			font-size: 0.75rem;
			height: 2.2rem;
			line-height: 2.2rem;
			font-weight: normal;
			color: #3f3f3f;
			width: 100%;
			text-align: center;
		}
	}
	.container {
		padding-top: 2.95rem;
		margin-top: 0;
		width: 100%;
		.forget-password-form {
			width: 14.3rem;
			margin: 0 auto;
			.mobile-wrap {
				.iconfont {
					position: absolute;
					top: 3.6rem;
					color: #ff7640;
					font-size: 1.05rem;
				}
				.mobile {
					position: relative;
					height: 1.95rem;
					border-bottom: 1px solid #dddddd;
					font-size: 0.7rem;
					padding: 5px 0 5px 1.35rem;
					margin-bottom: 0.5rem;
				}
				.mobile:before {
					border-top: none !important;
				}
			}
			.message-code-wrap {
				.iconfont {
					position: absolute;
					top: 6.4rem;
					color: #ff7640;
					font-size: 1.05rem;
				}
				.message-code {
					position: relative;
					height: 1.95rem;
					border-bottom: 1px solid #dddddd;
					font-size: 0.7rem;
					padding: 5px 0 5px 1.35rem;
					margin-bottom: 0.5rem;
					.weui-btn_primary {
						width: 4rem !important;
						height: 1.45rem !important;
						padding: 0 !important;
						background: none;
						color: #ff7640;
						border: none !important;
						font-size: 0.55rem !important;
					}
					.weui-btn_primary:after {
						border: none;
					}
					.time-text {
						color: #3f3f3f;
					}
				}
				.message-code:before {
					border-top: none !important;
				}
			}
			.btn-next {
				margin-top: 1.125rem;
				width: 14.3rem;
				height: 1.85rem;
				font-size: 0.75rem;
				background: #ff7640;
				color: #fff;
				border-radius: 5px;
				margin-bottom: 0.75rem;
				border: none;
			}
			.new-password-wrap {
				.iconfont {
					position: absolute;
					top: 3.6rem;
					color: #ff7640;
					font-size: 1.05rem;
				}
				.new-password {
					position: relative;
					height: 1.95rem;
					border-bottom: 1px solid #dddddd;
					font-size: 0.7rem;
					padding: 5px 0 5px 1.35rem;
					margin-bottom: 0.5rem;
				}
				.new-password:before {
					border-top: none !important;
				}
			}
			.repeat-password-wrap {
				.iconfont {
					position: absolute;
					top: 6.5rem;
					color: #ff7640;
					font-size: 1.05rem;
				}
				.repeat-password {
					position: relative;
					height: 1.95rem;
					border-bottom: 1px solid #dddddd;
					font-size: 0.7rem;
					padding: 5px 0 5px 1.35rem;
					margin-bottom: 0.5rem;
				}
				.repeat-password:before {
					border-top: none !important;
				}
			}
		}
	}
}
.weui-toast_success {
	width: 5.6em !important;
	min-height: 5em !important;
	.weui-icon_toast {
		margin: 8px 0 0 !important;
	}
}
.weui-toast_cancel {
	width: auto !important;
	padding: 0 0.444444rem /* 10/22.5 */;
	min-height: auto !important;
	.weui-icon_toast {
		margin: 8px 0 6px 0 !important;
	}
	.weui-icon_toast.weui-icon-success-no-circle:before {
		font-size: 35px !important;
	}
}
.weui-tabbar:before {
	border: 0 !important;
}
.weui-toast.weui-toast_text {
	width: auto !important;
}
</style>

<script type="text/javascript">
import { Tab, TabItem, XInput, XButton, Toast } from "vux"
import $ from "jquery"
import common from "@/api/common"
import utils from "@/assets/js/utils"

export default {
	components: {
		Tab,
		TabItem,
		XInput,
		XButton,
		Toast
	},
	data() {
		return {
			position: "default",
			showPositionValue: false,
			errorMsg: "",
			mobile: "",
			messageCode: "",
			getMessageCodeText: "获取验证码",
			isCountdown: false,
			step: 1,
			newPassword: "",
			repeatPassword: "",
			title: "手机号验证"
		}
	},
	ready() {},
	methods: {
		getMessageCode(position) {
			var _this = this
			var errorMsg = ""
			if (_this.mobile == "") {
				errorMsg = "请输入您的手机号"
			} else if (!utils.checkMobile(_this.mobile)) {
				errorMsg = "手机号码格式错误"
			}
			if (errorMsg != "") {
				_this.$vux.toast.text(errorMsg, "middle")
				return
			}
			var postData = new URLSearchParams()
			postData.append("userName", _this.mobile)
			postData.append("mobile", _this.mobile)
			postData.append("sendFrom", "HTML5")
			postData.append("sendType", "login")
			postData.append("requestSource", "HTML5")
			postData.append("uuid", utils.uuid())
			postData.append("authId", _this.authId)
			postData.append("imageCode", _this.imgCode)
			common.getSendPassWordCode(postData).then(res => {
				let forgetPwdFlag
				if (res.data.resultCode == "1") {
					forgetPwdFlag = res.data.forgetPwdFlag
					utils.setCookie("forgetPwdFlag", res.data.forgetPwdFlag)
					utils.setCookie("forgetPwdUserName", res.data.userName)
					utils.setCookie("forgetPwdMobile", _this.mobile)
					utils.timeCount(60, function(data) {
						data === "获取验证码"
							? (_this.isCountdown = false)
							: (_this.isCountdown = true)
						_this.getMessageCodeText = data
					})
				} else {
					_this.errorMsg = res.data.resultMsg
					_this.$vux.toast.show({
						type: "cancel",
						position: "middle",
						text: _this.errorMsg
					})
					// _this.$vux.toast.text(_this.errorMsg, 'middle');
				}
			})
		},
		nextStep1(position) {
			var _this = this
			var mobile = _this.mobile.replace(/\s/g, "")
			var smsCode = _this.messageCode
			var errorMsg = ""
			if (utils.getCookie("forgetPwdUserName") == "") {
				errorMsg = "请先获取验证码"
			} else if (_this.mobile == "") {
				errorMsg = "请输入您的手机号码"
			} else if (!utils.checkMobile(_this.mobile)) {
				errorMsg = "手机号码格式错误"
			} else if (this.getMessageCodeText === "获取验证码") {
				errorMsg = "请点击获取验证码"
			} else if (_this.messageCode.length < 5) {
				errorMsg = "短信验证码格式错误"
			}
			if (errorMsg != "") {
				_this.$vux.toast.text(errorMsg, "middle")
				return
			}
			var postData = new URLSearchParams()
			postData.append("uuid", "0c8297d7-6d3a-46da-b782-0df2434f88b1")
			postData.append("userName", utils.getCookie("forgetPwdUserName"))
			postData.append("mobile", _this.mobile)
			postData.append("validateCode", _this.messageCode)
			common.forgetPassWord(postData).then(res => {
				if (res.data && res.data.resultCode == 1) {
					_this.step = 2
					_this.title = "重置密码"
				} else {
					_this.errorMsg = res.data.resultMsg
					_this.$vux.toast.show({
						type: "cancel",
						position: "middle",
						text: _this.errorMsg
					})
				}
			})
		},
		nextStep2(position) {
			var _this = this
			var mobile = utils.getCookie("forgetPwdMobile")
			var forgetPwdFlag = utils.getCookie("forgetPwdFlag")
			var userName = utils.getCookie("forgetPwdUserName")

			var errorMsg = ""
			if (!userName || !forgetPwdFlag || userName == "" || forgetPwdFlag == "") {
				errorMsg = "非法进入"
			} else if (_this.newPassword == "") {
				errorMsg = "请输入新密码"
			} else if (!_this.utils.checkPwd(_this.newPassword)) {
				errorMsg = "新密码格式错误"
			} else if (_this.repeatPassword == "") {
				errorMsg = "请输入确认密码"
			} else if (!_this.utils.checkPwd(_this.repeatPassword)) {
				errorMsg = "确认密码格式错误"
			} else if (_this.newPassword !== _this.repeatPassword) {
				errorMsg = "输入密码不一致"
			}

			if (errorMsg != "") {
				_this.$vux.toast.text(errorMsg, "middle")
				return
			}

			var postData = new URLSearchParams()
			postData.append("uuid", "0c8297d7-6d3a-46da-b782-0df2434f88b1")
			postData.append("userName", userName)
			postData.append("mobile", mobile)
			postData.append("newPassword", _this.newPassword)
			postData.append("forgetPwdFlag", forgetPwdFlag)
			common.resetPassword(postData).then(res => {
				if (res.data && res.data.resultCode == 1) {
					utils.setCookie("forgetPwdFlag", "")
					utils.setCookie("forgetPwdUserName", "")
					utils.setCookie("forgetPwdMobile", "")
					_this.$vux.toast.show({
						position: "middle",
						text: "密码修改成功"
					})
					setTimeout(function() {
						_this.$router.push({
							path: "/login",
							query: { redirect: _this.$route.fullPath }
						})
					}, 3000)
				} else {
					_this.errorMsg = res.data.resultMsg
					_this.$vux.toast.show({
						type: "cancel",
						position: "middle",
						text: _this.errorMsg
					})
				}
			})
		}
	},
	mounted: function() {}
}
</script>
