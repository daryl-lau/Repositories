import React, { Component } from 'react'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'

import { Link } from 'react-router-dom'

import NavHeader from '../../components/NavHeader'

import styles from './index.module.css'

import { login } from '../../api'

import { withFormik } from 'formik'

import * as Yup from 'yup'

class Login extends Component {

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     username: '',
  //     password: ''
  //   }
  // }

  // handleChange = (e) => {
  //   const name = e.target.name
  //   const value = e.target.value
  //   this.setState({
  //     [name]: value
  //   })
  // }

  // handleSubmit = async (e) => {
  //   e.preventDefault()
  //   const { username, password } = this.state
  //   console.log(username, password);
  //   try {
  //     Toast.loading('正在登录，请稍候...', 0, null, false)
  //     const { data: res } = await login(username, password)
  //     Toast.hide()
  //     console.log(res);
  //     if (res.status === 200) {
  //       localStorage.setItem('hkzf_token', res.body.token)
  //       this.props.history.go(-1)
  //     } else if (res.status === 400) {
  //       Toast.fail(`${res.description}`, 1.5)
  //     }
  //   } catch (error) {
  //     Toast.fail('登录超时，请重试！', 1.5)
  //   }
  // }


  // 在 Login 组件中，通过 props 获取到 errors（错误信息）和 touched（是否访问过，注意：需要给表单元素添加 handleBlur 处理失焦点事件才生效！）
  // 在表单元素中通过这两个对象展示表单校验错误信
  render () {
    const {
      values,
      handleChange,
      handleSubmit,
      errors,
      handleBlur,
      touched
    } = this.props

    return (
      <div className={styles.root}>
        {/* 顶部导航 */}
        <NavHeader className={styles.navHeader}>账号登录</NavHeader>
        <WhiteSpace size="xl" />

        {/* 登录表单 */}
        <WingBlank>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="username"
                placeholder="请输入账号"
                onChange={handleChange}
                value={values.username}
                onBlur={handleBlur}
              />
              {/* 长度为5到8位，只能出现数字、字母、下划线 */}
              {errors.username && touched.username && <div className={styles.error}>{errors.username}</div>}
            </div>

            <div className={styles.formItem}>
              <input
                className={styles.input}
                name="password"
                type="password"
                placeholder="请输入密码"
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
              />
              {/* 长度为5到12位，只能出现数字、字母、下划线 */}
              {errors.password && touched.password && <div className={styles.error}>{errors.password}</div>}
            </div>

            <div className={styles.formSubmit}>
              <button className={styles.submit} type="submit">
                登 录
              </button>
            </div>
          </form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <Link to="/registe">还没有账号？去注册~</Link>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

Login = withFormik({
  mapPropsToValues: () => ({ username: '', password: '' }),

  // 在handleSubmit中，通过values获取到表单元素值
  handleSubmit: async (values, { props }) => {
    const { username, password } = values
    console.log(username, password);
    try {
      Toast.loading('正在登录，请稍候...', 0, null, false)
      const { data: res } = await login(username, password)
      Toast.hide()
      console.log(res);
      if (res.status === 200) {
        Toast.success('登录成功，跳转至之前页面', 1.5)
        localStorage.setItem('hkzf_token', res.body.token)
        props.history.go(-1)
      } else if (res.status === 400) {
        Toast.fail(`${res.description}`, 1.5)
      }
    } catch (error) {
      Toast.fail('登录超时，请重试！', 1.5)
    }
    console.log(values); console.log(props.history);
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .trim()
      .required('账号不能为空')
      .matches(/^[a-zA-Z][a-zA-Z\d]{4,}$/, { message: '以字母开头，长度至少5位，只能出现字母、数字、下划线' }),
    password: Yup.string()
      .trim()
      .required('密码不能为空')
      .matches(/^[a-zA-Z][a-zA-Z\d]{4,}$/, { message: '以字母开头，长度至少5位，只能出现字母、数字、下划线' })
  }),
})(Login)

export default Login
