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