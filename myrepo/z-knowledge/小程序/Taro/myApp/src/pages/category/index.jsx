import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Button, Text } from '@tarojs/components'

import { add, minus, asyncAdd } from '../../actions/counter'
import { getCurrentInstance } from '@tarojs/taro'
import './index.less'

import Search from '../../components/Search'


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
    lastName: '三'
  }

  componentWillUnmount () { }

  componentDidShow () {
    console.log('cate show');
    console.log(getCurrentInstance().router.params);

  }

  componentDidHide () {
    console.log('cate hide');
  }


  changeName = () => {
    console.log(this);
    this.setState({
      lastName: '无忌'
    })
  }

  render () {
    return (
      <View className='index'>
        <Search></Search>
      </View>
    )
  }
}

export default Index

