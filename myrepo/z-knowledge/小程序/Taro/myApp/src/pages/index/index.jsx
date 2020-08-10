import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Swiper, SwiperItem, Navigator, Image, View } from '@tarojs/components'

import { add, minus, asyncAdd } from '../../actions/counter'

import Taro from '@tarojs/taro'
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
    lastName: '三丰',
    banner: [],
    navs: [],
    floor: []
  }

  async componentWillMount () {
    Taro.showLoading({
      title: '加载中...',
      mask: true
    })
    const banners = await Taro.request({ url: "http://www.uinav.com/api/public/v1/home/swiperdata" })
    const navs = await Taro.request({ url: "http://www.uinav.com/api/public/v1/home/catitems" })
    const floor = await Taro.request({ url: "http://www.uinav.com/api/public/v1/home/floordata" })
    Taro.hideLoading()
    console.log(banners, 'banners');
    console.log(navs, 'navs');
    console.log(floor, 'floor');
    this.setState({
      banner: banners.data.message,
      navs: navs.data.message,
      floor: floor.data.message
    })
  }

  componentWillUnmount () { }

  async onPullDownRefresh () {
    await Taro.request({ url: "http://www.uinav.com/api/public/v1/home/swiperdata" })
    await Taro.request({ url: "http://www.uinav.com/api/public/v1/home/catitems" })
    await Taro.request({ url: "http://www.uinav.com/api/public/v1/home/floordata" })
    // Taro.stopPullDownRefresh()
  }

  componentDidShow () { }

  componentDidHide () { }

  renderBanner = () => {
    return this.state.banner.map(item => {
      return (
        <SwiperItem key={item.goods_id}>
          <Navigator url={`../goodsDetail/index?goods_id=${item.goods_id}`} openType={item.open_type}>
            <Image src={item.image_src} />
          </Navigator>
        </SwiperItem>)
    })
  }

  renderNavs = () => {
    return this.state.navs.map(item => {
      return (<View key={item.name}><Navigator url="../category/index" openType={item.open_type}><Image src={item.image_src} /></Navigator></View>)
    })
  }

  renderFloor = () => {
    return this.state.floor.map(item => {
      return (
        <View className="item" key={item.floor_title.name}>
          <View className="title">
            <Image src={item.floor_title.image_src} />
          </View>
          <View className="content">
            {item.product_list.map(prod => {
              return (<Navigator key={prod.name} url={prod.navigator_url}><Image src={prod.image_src} /></Navigator>)
            })}
          </View>
        </View>
      )
    })
  }

  render () {
    return (
      <>
        <Search to="../search/index"></Search>
        <Swiper indicator-dots indicator-color="rgba(255,255,255,.3)" indicator-active-color="#fff" autoplay circular>
          {this.renderBanner()}
        </Swiper>
        <View className="nav">
          {this.renderNavs()}
        </View>
        <View className="floor">
          {this.renderFloor()}
        </View>
      </>
    )
  }
}

export default Index

