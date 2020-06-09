<template>
  <div class="container">
    <el-card class="box-card">
      <img src="../../assets/login_logo.png" alt class="logo" />
      <el-form :model="loginForm" :rules="loginRules" ref='loginForm' status-icon>
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input style="width: 65%" placeholder="请输入验证码" v-model="loginForm.code"></el-input>
          <el-button style="width:30%; float:right">获取验证码</el-button>
        </el-form-item>
        <el-form-item prop='permit'>
          <el-checkbox label="我已阅读并同意用户协议和隐私条款" v-model='loginForm.permit'></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="debounceLogin()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from '../../api'
export default {
    data() {
        let checkMobile = (rule, value, callback) => {
            if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('手机号不正确'))
            else callback()
        }
        let checkCode = (rule, value, callback)=>{
            if (!/^\d{6}$/.test(value)) return callback(new Error('验证码不正确'))
            else callback()
        }
        let checkPermit = (rule, value, callback)=>{
            if(!value) return callback(new Error('请仔细阅读条款并允许登录'))
            else callback()
        }
        return {
            loginForm: {
                mobile: '',
                code: '',
                permit: false
            },
            loginRules: {
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { validator: checkMobile, trigger: 'blur'}
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { validator: checkCode, trigger: 'blur'}
                ],
                permit: [
                    { type: 'boolean', validator: checkPermit, trigger: 'change' },
                ]
            }
        }
    },
    created(){
        this.debounceLogin = this._.debounce(this.login, 500)
    },
    methods: {
        login() {
            this.$refs.loginForm.validate((valid) => {
            if (valid) {
                login({
                    mobile: this.loginForm.mobile,
                    code: this.loginForm.code
                }).then(res => {
                    this.$router.push('/')
                }).catch(err=>{
                    this.$message.error('登录失败:用户名或密码错误')
                })
            } else {
                return false;
            }
            });
        },
    }
}
</script>

<style scoped lang='less'>
.container {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: url('../../assets/login_bg.jpg') no-repeat center / cover;
    .box-card {
        width: 400px;
        height: 350px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .logo {
            display: block;
            margin: 0 auto 20px;
        }
    }
}
</style>