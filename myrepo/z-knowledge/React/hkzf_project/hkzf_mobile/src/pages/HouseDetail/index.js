import React, { Component } from 'react'

import { Carousel, Flex, Toast, Modal } from 'antd-mobile'

import NavHeader from '../../components/NavHeader'
import HouseItem from '../../components/HouseItem'
import HousePackage from '../../components/HousePackage'

import config from '../../config'
import { getHouseDetail, addFavorite, getFavorite, delFavorite } from '../../api'
import { isAuth } from '../../utils'
import styles from './index.module.css'

const alert = Modal.alert

// 猜你喜欢
const recommendHouses = [
  {
    id: 1,
    src: config.baseURL + '/img/message/1.png',
    desc: '72.32㎡/南 北/低楼层',
    title: '安贞西里 3室1厅',
    price: 4500,
    tags: ['随时看房']
  },
  {
    id: 2,
    src: config.baseURL + '/img/message/2.png',
    desc: '83㎡/南/高楼层',
    title: '天居园 2室1厅',
    price: 7200,
    tags: ['近地铁']
  },
  {
    id: 3,
    src: config.baseURL + '/img/message/3.png',
    desc: '52㎡/西南/低楼层',
    title: '角门甲4号院 1室1厅',
    price: 4300,
    tags: ['集中供暖']
  }
]

// 百度地图
const BMap = window.BMap

const labelStyle = {
  position: 'absolute',
  zIndex: -7982820,
  backgroundColor: 'rgb(238, 93, 91)',
  color: 'rgb(255, 255, 255)',
  height: 25,
  padding: '5px 10px',
  lineHeight: '14px',
  borderRadius: 3,
  boxShadow: 'rgb(204, 204, 204) 2px 2px 2px',
  whiteSpace: 'nowrap',
  fontSize: 12,
  userSelect: 'none'
}

export default class HouseDetail extends Component {
  state = {
    isLoading: false,
    isFavorate: false,
    houseInfo: {
      // 房屋图片
      slides: [],
      // 标题
      title: '',
      // 标签
      tags: [],
      // 租金
      price: 0,
      // 房型
      roomType: '两室一厅',
      // 房屋面积
      size: 89,
      // 装修类型
      renovation: '精装',
      // 朝向
      oriented: [],
      // 楼层
      floor: '',
      // 小区名称
      community: '',
      // 地理位置
      coord: {
        latitude: '39.928033',
        longitude: '116.529466'
      },
      // 房屋配套
      supporting: [],
      // 房屋标识
      houseCode: '',
      // 房屋描述
      description: ''
    }
  }


  getHouseDetail = async () => {
    const { data: res } = await getHouseDetail(this.props.match.params.id)
    console.log(res);
    this.setState({
      houseInfo: {
        slides: res.body.houseImg,
        title: res.body.title,
        tags: res.body.tags,
        price: res.body.price,
        oriented: res.body.oriented,
        roomType: res.body.roomType,
        size: res.body.size,
        description: res.body.description,
        floor: res.body.floor,
        community: res.body.community,
        coord: res.body.coord,
        supporting: res.body.supporting,
        houseCode: res.body.houseCode,
      }
    })
  }

  async componentDidMount () {
    document.scrollingElement.scrollTop = 0
    await this.getHouseDetail()
    this.renderMap(this.state.houseInfo.community, {
      latitude: this.state.houseInfo.coord.latitude,
      longitude: this.state.houseInfo.coord.longitude
    })
    this.checkFavorite()
    console.log(this.props);
  }

  checkFavorite = async () => {
    const isLogin = isAuth()
    if (!isLogin) return
    const { data: res } = await getFavorite(this.props.match.params.id)
    if (res.status === 200) {
      this.setState({
        isFavorate: res.body.isFavorate
      })
    }
  }


  handleFavorite = async () => {
    const isLogin = isAuth()
    if (isLogin) {
      // 没有收藏，则收藏
      if (!this.state.isFavorate) {
        const { data: res } = await addFavorite(this.props.match.params.id)
        console.log(res);
        if (res.status === 200) {
          Toast.info('已收藏', 1.5, null, false)
          this.setState({
            isFavorate: true
          })
        } else {
          Toast.info('会话超时，请重新登录', 2, null, false)
        }
      } else {
        // 收藏了则取消收藏
        const { data: res } = await delFavorite(this.props.match.params.id)
        console.log(res);
        if (res.status === 200) {
          Toast.info('已取消收藏', 1.5, null, false)
          this.setState({
            isFavorate: false
          })
        } else {
          Toast.info('会话超时，请重新登录', 2, null, false)
        }
      }
    } else {
      alert('提示', '还未登录？', [
        {
          text: '不用了', onPress: () => { return }
        },
        {
          text: '去登陆', onPress: () => {
            console.log('去登陆');
            this.props.history.push('/login', { from: this.props.location.pathname })
          }
        },
      ])
    }

  }

  // 渲染轮播图结构
  renderSwipers () {
    const {
      houseInfo: { slides }
    } = this.state
    return slides.map(val => (
      <a
        key={val}
        href="http://localhost:3000"
        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
      >
        <img
          src={`${config.baseURL}${val}`}
          alt=""
          style={{ width: '100%', verticalAlign: 'top' }}
          onLoad={() => {
            // fire window resize event to change height
            window.dispatchEvent(new Event('resize'));
            this.setState({ imgHeight: 'auto' });
          }}
        />
      </a>
    ))
  }

  // 渲染地图
  renderMap (community, coord) {
    console.log(community);
    const { latitude, longitude } = coord

    const map = new BMap.Map('map')
    const point = new BMap.Point(longitude, latitude)
    map.centerAndZoom(point, 17)

    const label = new BMap.Label('', {
      position: point,
      offset: new BMap.Size(0, -36)
    })

    label.setStyle(labelStyle)
    label.setContent(`
      <span>${community}</span>
      <div class="${styles.mapArrow}"></div>
    `)
    map.addOverlay(label)
  }

  render () {
    const { isLoading } = this.state
    const { community, title, price, roomType, size, floor, oriented, tags, supporting, description } = this.state.houseInfo

    return (
      <div className={styles.root}>
        {/* 导航栏 */}
        <NavHeader
          className={styles.navHeader}
          rightContent={[<i key="share" className="iconfont icon-share" />]}
        >
          {community}
        </NavHeader>

        {/* 轮播图 */}
        <div className={styles.slides}>
          {!isLoading ? (
            <Carousel autoplay infinite autoplayInterval={5000}>
              {this.renderSwipers()}
            </Carousel>
          ) : (
              ''
            )}
        </div>

        {/* 房屋基础信息 */}
        <div className={styles.info}>
          <h3 className={styles.infoTitle}>
            {title}
          </h3>
          <Flex className={styles.tags}>
            <Flex.Item>
              {
                tags.map((item, index) => (<span key={item} className={[styles.tag, styles['tag' + (index + 1)]].join(' ')}>
                  {item}
                </span>))
              }
            </Flex.Item>
          </Flex>

          <Flex className={styles.infoPrice}>
            <Flex.Item className={styles.infoPriceItem}>
              <div>
                {price}
                <span className={styles.month}>/月</span>
              </div>
              <div>租金</div>
            </Flex.Item>
            <Flex.Item className={styles.infoPriceItem}>
              <div>{roomType}</div>
              <div>房型</div>
            </Flex.Item>
            <Flex.Item className={styles.infoPriceItem}>
              <div>{size}平米</div>
              <div>面积</div>
            </Flex.Item>
          </Flex>

          <Flex className={styles.infoBasic} align="start">
            <Flex.Item>
              <div>
                <span className={styles.title}>装修：</span>
                精装
              </div>
              <div>
                <span className={styles.title}>楼层：</span>
                {floor}
              </div>
            </Flex.Item>
            <Flex.Item>
              <div>
                <span className={styles.title}>朝向：</span>{oriented.join('、')}
              </div>
              <div>
                <span className={styles.title}>类型：</span>{roomType}
              </div>
            </Flex.Item>
          </Flex>
        </div>

        {/* 地图位置 */}
        <div className={styles.map}>
          <div className={styles.mapTitle}>
            小区：
            <span>{community}</span>
          </div>
          <div className={styles.mapContainer} id="map">
            地图
          </div>
        </div>

        {/* 房屋配套 */}
        <div className={styles.about}>
          <div className={styles.houseTitle}>房屋配套</div>
          {
            supporting.length === 0 ?
              <div className={styles.titleEmpty}>暂无数据</div> :
              <HousePackage list={supporting} />
          }
        </div>

        {/* 房屋概况 */}
        <div className={styles.set}>
          <div className={styles.houseTitle}>房源概况</div>
          <div>
            <div className={styles.contact}>
              <div className={styles.user}>
                <img src={config.baseURL + '/img/avatar.png'} alt="头像" />
                <div className={styles.useInfo}>
                  <div>王女士</div>
                  <div className={styles.userAuth}>
                    <i className="iconfont icon-auth" />
                    已认证房主
                  </div>
                </div>
              </div>
              <span className={styles.userMsg}>发消息</span>
            </div>

            <div className={styles.descText}>
              {description || '暂无房屋描述'}
            </div>
          </div>
        </div>

        {/* 推荐 */}
        <div className={styles.recommend}>
          <div className={styles.houseTitle}>猜你喜欢</div>
          <div className={styles.items}>
            {recommendHouses.map(item => (
              <HouseItem {...item} key={item.id} />
            ))}
          </div>
        </div>

        {/* 底部收藏按钮 */}
        <Flex className={styles.fixedBottom}>
          <Flex.Item onClick={this.handleFavorite}>
            <img
              src={this.state.isFavorate ? config.baseURL + '/img/star.png' : config.baseURL + '/img/unstar.png'}
              className={styles.favoriteImg}
              alt="收藏"
            />
            <span className={styles.favorite}>{this.state.isFavorate ? '已收藏' : '收藏'}</span>
          </Flex.Item>
          <Flex.Item>在线咨询</Flex.Item>
          <Flex.Item>
            <a href="tel:400-618-4000" className={styles.telephone}>
              电话预约
            </a>
          </Flex.Item>
        </Flex>
      </div>
    )
  }
}
