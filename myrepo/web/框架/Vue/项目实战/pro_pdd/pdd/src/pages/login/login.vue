<template>
    <div class="login-container">
        <!--登录面板内容部分-->
        <div class="login-inner">
            <!--面板头部-->
            <div class="login-header">
                <div class="login-logo">
                    <img src="./images/lk_logo_sm.png" alt="" width="250">
                </div>
                <!--面板标题-->
                <div class="login-header-title">
                    <a href="javascript:;" :class="{current: loginMethod}"
                       @click.prevent="changeLoginMethod(true)">短信登录</a>
                    <a href="javascript:;" :class="{current: !loginMethod}" @click.prevent="changeLoginMethod(false)">验证码登录</a>
                </div>
            </div>
            <!--面板表单部分-->
            <div class="login-content">
                <form>
                    <!--手机验证码登录部分-->
                    <div :class="{current: loginMethod}">
                        <section class="login-message">
                            <input type="tel" maxlength="11" placeholder="手机号" v-model="phoneNumber">
                            <button class="get-verification" :disabled="!checkPhone" :class="{phone_right: checkPhone}"
                                    @click="getVerifyCode()" v-if="!countDown"

                            >获取验证码
                            </button>
                            <button v-else disabled class="send">已发送({{countDown}})</button>
                        </section>
                        <section class="login-verification">
                            <input type="tel" maxlength="6" placeholder="验证码" v-model="phoneCode">
                        </section>
                        <section class="login-hint">
                            温馨提示：未注册撩课帐号的手机号，登录时将自动注册，且代表已同意
                            <a href="javascript:;">服务协议与隐私政策</a>
                        </section>
                    </div>
                    <!--账号登录部分-->
                    <div :class="{current: !loginMethod}">
                        <section>
                            <section class="login-message">
                                <input type="tel" maxlength="11" placeholder="用户名" v-model="username">
                            </section>
                            <section class="login-verification">
                                <input type="password" maxlength="20" placeholder="密码" v-model="password"
                                       v-if="switchShow">
                                <input type="text" maxlength="20" placeholder="密码" v-model="password" v-else>
                                <div class="switch-show">
                                    <img src="./images/hide_pwd.png" alt="" style="width: 20px" v-if="switchShow"
                                         @click.prevent="switchImg(false)">
                                    <img src="./images/show_pwd.png" alt="" style="width: 20px" v-else
                                         @click.prevent="switchImg(true)">
                                </div>
                            </section>
                            <section class="login-message">
                                <input type="text" maxlength="4" placeholder="验证码" v-model="captchaCode">
                                <img
                                    class="get-verification"
                                    src="http://localhost:1688/api/captcha"
                                    alt="captcha"
                                    @click.prevent="getCaptchaCode()"
                                    ref="captcha"
                                >
                            </section>
                        </section>
                    </div>
                    <button class="login-submit" @click="login()">登录</button>
                </form>
                <button class="login-back">返回</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {getPhoneCode, phoneCodeLogin, pwdLogin} from './../../api/index'
    // import {Toast} from 'mint-ui';

    import {mapActions} from 'vuex'

    export default {
        name: "login",
        data() {
            return {
                loginMethod: true,  //true为手机短信登录，false为图形验证码登录
                phoneNumber: '',
                phoneCode: '',
                countDown: 0,
                username: '',
                password: '',
                captchaCode: '',
                switchShow: true,
                userInfo: {},
            }
        },
        methods: {
            changeLoginMethod(flag) {
                this.loginMethod = flag;
            },
            async getVerifyCode() {
                this.countDown = 60;
                this.intervalId = setInterval(() => {
                    this.countDown--;
                    if (this.countDown === 0) {
                        clearInterval(this.intervalId)
                    }
                }, 1000);
                const result = await getPhoneCode(this.phoneNumber);
                console.log(result);

                if (result.err_code === 0) {
                    // console.log(result.message);
                    // Toast({
                    //     message: result.message,
                    //     position: 'middle',
                    //     duration: 3000
                    // });
                    this.toast = this.$createToast({
                        txt: result.message,
                        type: 'txt',
                        time: 2000,
                        onTimeout: () => {
                            clearInterval(this.intervalId);
                            this.countDown = 0;
                        }
                    });
                    this.toast.show();

                    // 2.5 后续处理
                    // setTimeout(() => {
                    //     clearInterval(this.intervalId);
                    //     this.countDown = 0;
                    // }, 3000);
                }
            },
            switchImg(flag) {
                this.switchShow = flag;
            },
            getCaptchaCode() {
                this.$refs.captcha.src = 'http://localhost:1688/api/captcha?time=' + new Date();
            },
            async login() {
                if (this.loginMethod) { // 验证码登录
                    if (!this.phoneNumber) {
                        // Toast('请输入手机号码!');
                        this.toast = this.$createToast({
                            txt: '请输入手机号码!',
                            type: 'txt',
                        });
                        this.toast.show();
                        return;
                    } else if (!this.checkPhone) {
                        // Toast('请输入正确的手机号码!');
                        this.toast = this.$createToast({
                            txt: '请输入正确的手机号码!',
                            type: 'txt',
                        });
                        this.toast.show();
                        return;
                    }

                    if (!this.phoneCode) {
                        // Toast('请输入验证码!');
                        this.toast = this.$createToast({
                            txt: '请输入验证码!',
                            type: 'txt',
                        });
                        this.toast.show();
                        return;
                    } else if (!(/^\d{6}$/gi.test(this.phoneCode))) {
                        // Toast('请输入正确的验证码!');
                        this.toast = this.$createToast({
                            txt: '请输入正确的验证码!',
                            type: 'txt',
                        });
                        this.toast.show();
                        return;
                    }

                    // 5.2 手机验证码登录
                    const result = await phoneCodeLogin(this.phoneNumber, this.phoneCode);
                    // console.log(result);
                    if (result.success_code === 200) {
                        this.userInfo = result.data;
                    } else {
                        this.userInfo = {
                            message: '登录失败, 手机号码或验证码不正确!'
                        }
                    }
                } else { // 账号和密码的登录
                    if (!this.username) {
                        // Toast('请输入用户名!');
                        this.toast = this.$createToast({
                            txt: '请输入用户名!',
                            type: 'txt',
                        });
                        this.toast.show();
                        return;
                    } else if (!this.password) {
                        // Toast('请输入密码!');
                        this.toast = this.$createToast({
                            txt: '请输入密码!',
                            type: 'txt',
                        });
                        this.toast.show();
                        return;
                    } else if (!this.captchaCode) {
                        // Toast('请输入验证码!');
                        this.toast = this.$createToast({
                            txt: '请输入验证码!',
                            type: 'txt',
                        });
                        this.toast.show();
                        return;
                    }
                    // 5.2 发起请求
                    const result = await pwdLogin(this.username, this.password, this.captchaCode);
                    console.log(result);
                    if (result.success_code === 200) {
                        this.userInfo = result.data;
                    } else {
                        this.userInfo = {
                            message: '登录失败, 用户名和密码不正确!'
                        }
                    }
                }
                console.log(this.userInfo);
                this.syncUserInfo(this.userInfo)
            },
            ...mapActions(['syncUserInfo'])
        },
        computed: {
            checkPhone() {
                const reg = new RegExp('^1[3456789]\\d{9}$');
                return reg.test(this.phoneNumber)
            },
        }
    }
</script>

<style scoped lang="less">
    .login-container {
        width: 100%;
        height: 100%;
        background: #fff;

        .login-inner {
            padding-top: 60px;
            width: 80%;
            margin: 0 auto;

            .login-header {
                .login-logo {
                    font-size: 40px;
                    font-weight: bold;
                    color: mediumpurple;
                    text-align: center;
                }

                .login-header-title {
                    padding-top: 40px;
                    padding-bottom: 10px;
                    text-align: center;

                    > a {
                        color: #333;
                        font-size: 14px;
                        padding-bottom: 4px;

                        &:first-child {
                            margin-right: 40px;
                        }

                        &.current {
                            color: mediumpurple;
                            font-weight: 700;
                            border-bottom: 2px solid mediumpurple;
                        }

                    }
                }
            }

            .login-content {
                > form {
                    > div {
                        display: none;

                        &.current {
                            display: block;
                        }

                        input {
                            width: 100%;
                            height: 100%;
                            padding-left: 8px;
                            box-sizing: border-box;
                            border: 1px solid #ddd;
                            border-radius: 4px;
                            outline: 0;
                            font: 400 14px Arial;

                            &:focus {
                                border: 1px solid mediumpurple;
                            }
                        }

                        .login-message {
                            position: relative;
                            margin-top: 16px;
                            height: 48px;
                            font-size: 14px;
                            background: #fff;

                            .get-verification, .send {
                                position: absolute;
                                top: 50%;
                                right: 10px;
                                transform: translateY(-50%);
                                border: 0;
                                color: #ccc;
                                font-size: 14px;
                                background: transparent;

                                &.phone_right {
                                    color: purple;
                                }
                            }
                        }

                        .login-verification {
                            position: relative;
                            margin-top: 16px;
                            height: 48px;
                            font-size: 14px;
                            background: #fff;

                            .switch-show {
                                position: absolute;
                                right: 10px;
                                top: 12px;

                                img {
                                    display: block;
                                }
                            }
                        }

                        .login-hint {
                            margin-top: 12px;
                            color: #999;
                            font-size: 12px;
                            line-height: 20px;

                            > a {
                                color: mediumpurple;
                            }
                        }

                    }

                    .login-submit {
                        display: block;
                        width: 100%;
                        height: 42px;
                        margin-top: 30px;
                        border-radius: 4px;
                        background: mediumpurple;
                        color: #fff;
                        text-align: center;
                        font-size: 16px;
                        line-height: 42px;
                        border: 0;
                    }
                }

                .login-back {
                    display: block;
                    width: 100%;
                    height: 42px;
                    margin-top: 15px;
                    border-radius: 4px;
                    background: transparent;
                    border: 1px solid mediumpurple;
                    color: mediumpurple;
                    text-align: center;
                    font-size: 16px;
                    line-height: 42px;
                }
            }
        }
    }
</style>
