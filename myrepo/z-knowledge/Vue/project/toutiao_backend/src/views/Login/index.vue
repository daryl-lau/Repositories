<template>
  <div class="container">
    <el-card class="box-card">
      <img src="../../assets/login_logo.png" alt class="logo" />
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" status-icon>
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="permit">
          <el-checkbox label="我已阅读并同意用户协议和隐私条款" v-model="loginForm.permit"></el-checkbox>
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
        // let checkMobile = (rule, value, callback) => {
        //     if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('手机号不正确'))
        //     else callback()
        // }
        // let checkCode = (rule, value, callback)=>{
        //     if (!/^\d{6}$/.test(value)) return callback(new Error('验证码不正确'))
        //     else callback()
        // }
        let checkPermit = (rule, value, callback) => {
            if (!value) return callback(new Error('请仔细阅读条款并允许登录'))
            else callback()
        }
        return {
            loginForm: {
                username: '',
                password: '',
                permit: true
            },
            loginRules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 12,
                        message: '长度在 3 到 12 个字符',
                        trigger: 'blur'
                    }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '密码不得少于6位数', trigger: 'blur' }
                ],
                permit: [
                    {
                        type: 'boolean',
                        validator: checkPermit,
                        trigger: 'change'
                    }
                ]
            }
        }
    },
    created() {
        this.debounceLogin = this._.debounce(this.login, 500)
    },
    methods: {
        login() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    login({
                        username: this.loginForm.username,
                        password: this.loginForm.password
                    })
                        .then(res => {
                            let { meta } = res.data
                            if (meta.status == 200) {
                                let {data} = res.data
                                localStorage.setItem('token', data.token)
                                this.$message.success('登录成功！')
                                this.$router.push('/home')
                            } else {
                                this.$message.error('登录失败:用户名或密码错误')
                            }
                        })
                        .catch(err => {
                            this.$message.error('请求借口失败！')
                        })
                } else {
                    return false
                }
            })
        }
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