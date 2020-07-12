import React from 'react'
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile';
import SearchHeader from '../../components/SearchHeader'

import { getSwiper, getGroups, getNews } from '../../api'
import { getCurrCity } from '../../utils'
import config from '../../config'

import './index.scss'

// nav 图片
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'

const navs = [
  {
    id: 1,
    img: Nav1,
    title: '整租',
    path: '/home/houselist'
  },
  {
    id: 2,
    img: Nav2,
    title: '合租',
    path: '/home/houselist'
  },
  {
    id: 3,
    img: Nav3,
    title: '地图找房',
    path: '/map'
  },
  {
    id: 4,
    img: Nav4,
    title: '去出租',
    path: '/rent/add'
  },
]

export default class Index extends React.Component {
  state = {
    data: [1, 2, 3],
    imgHeight: 234,
    groups: [],
    news: [],
    currCity: {
      label: '北京',
      value: ''
    }
  }

  async getSwiper () {
    const { data: res } = await getSwiper()
    if (res.status === 200) {
      this.setState(() => {
        return {
          data: res.body
        }
      })
    }
  }

  async getGroups () {
    const { data: res } = await getGroups('AREA%7C88cff55c-aaa4-e2e0')
    if (res.status === 200) {
      this.setState(() => {
        return {
          groups: res.body
        }
      })
    }
  }

  async getNews () {
    const { data: res } = await getNews('AREA%7C88cff55c-aaa4-e2e0')
    if (res.status === 200) {
      this.setState(() => {
        return {
          news: res.body
        }
      })
    }
  }

  componentDidMount () {
    this.getSwiper()
    this.getGroups()
    this.getNews()
    getCurrCity().then((data) => {
      this.setState(() => ({
        currCity: {
          label: data.label,
          value: data.value
        }
      }))
    })
  }

  renderSwiper () {
    return this.state.data.map(val => (
      <a
        key={val}
        href="http://localhost:3000"
        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
      >
        <img
          src={`${config.baseURL}${val.imgSrc}`}
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

  renderNav () {
    return navs.map(item => (
      <Flex.Item key={item.id} onClick={() => { this.props.history.push(item.path) }}>
        <img src={item.img} alt="" />
        <h2>{item.title}</h2>
      </Flex.Item>
    ))
  }

  renderGroups (item) {
    return (
      <Flex className="group-item" justify="around">
        <div className="desc">
          <p className="title">{item.title}</p>
          <span className="info">{item.desc}</span>
        </div>
        <img src={`${config.baseURL}${item.imgSrc}`} alt="" />
      </Flex>
    )
  }

  renderNews () {
    return this.state.news.map(item => {
      return (
        <div className="news-item" key={item.id}>
          <div className="imgwrap">
            <img
              className="img"
              src={`${config.baseURL}${item.imgSrc}`}
              alt=""
            />
          </div>
          <Flex className="content" direction="column" justify="between">
            <h3 className="title">{item.title}</h3>
            <Flex className="info" justify="between">
              <span>{item.from}</span>
              <span>{item.date}</span>
            </Flex>
          </Flex>
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        <div className="swiper">
          <Carousel autoplay infinite>
            {this.renderSwiper()}
          </Carousel>
          <SearchHeader cityName={this.state.currCity.label}></SearchHeader>
        </div>
        <Flex className="nav">
          {this.renderNav()}
        </Flex>
        <div className="groups">
          <h3 className="groups-title">
            租房小组 <span className="more">更多</span>
          </h3>
          <Grid data={this.state.groups}
            // 列数
            columnNum={2}
            // 是否强制正方形
            square={false}
            // 是否有边框
            hasLine={false}
            // 自定义里面的布局
            renderItem={item => this.renderGroups(item)} />
        </div>
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
      </div>
    );
  }
}