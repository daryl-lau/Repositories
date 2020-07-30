import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Button, Text } from '@tarojs/components'

import { add, minus, asyncAdd } from '../../actions/counter'
import { getCurrentInstance } from '@tarojs/taro'
import './index.less'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

  state = {
    firstName: '张',
    lastName: '三丰'
  }

  componentWillUnmount () { }

  componentDidShow () {
    console.log('index show');
    console.log(getCurrentInstance().router.params);
    
  }

  componentDidHide () {
    console.log('index hide');
  }


  changeName = () => {
    this.setState({
      lastName: '无忌'
    })
  }

  render () {
    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd} type="button">异步+1</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>{this.state.firstName + this.state.lastName}</Text></View>
        <button onClick={this.changeName}>点击</button>
      </View>
    )
  }
}

export default Index

