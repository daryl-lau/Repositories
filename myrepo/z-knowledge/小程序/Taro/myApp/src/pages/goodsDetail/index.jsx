import React, { Component } from 'react'
import { View, Button } from '@tarojs/components'
import Taro, { getCurrentInstance } from '@tarojs/taro'

export default class GoodsDetail extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    goodsId: ''
  }

  componentDidMount () {

    Taro.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.record']) {
          Taro.authorize({
            scope: 'scope.record',
            success: function () {
              // 用户已经同意小程序使用录音功能，后续调用 Taro.startRecord 接口不会弹窗询问
              Taro.startRecord()
            }
          })
        }
      }
    })

    Taro.getSetting({
      success: function (res) {
        console.log(res.authSetting)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
      }
    })
  }

  componentDidShow () {
    console.log(getCurrentInstance().router.params);
    this.setState({
      goodsId: getCurrentInstance().router.params.goods_id
    })
  }

  render () {
    return (
      <View>{this.state.goodsId}</View>
    )
  }
}