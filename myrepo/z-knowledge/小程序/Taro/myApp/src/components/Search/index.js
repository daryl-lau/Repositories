import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.less'
import PropTypes from 'prop-types'
import Taro from '@tarojs/taro'

class Search extends Component {
  constructor(props) {
    super(props)
  }

  clickHandler = () => {
    Taro.redirectTo({
      url: this.props.to
    })
  }

  render () {
    return (
      <View className="search" onClick={this.clickHandler}>
        <View className="searchBtn">
          <Image src="../../assets/images/icon_search@2x.png"></Image>
          <Text>{this.props.children || '搜索'}</Text>
        </View>
      </View>
    )
  }
}

Search.propTypes = {
  children: PropTypes.string,
  to: PropTypes.string
}

export default Search