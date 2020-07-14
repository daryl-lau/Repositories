import React from 'react'
import NavHeader from '../../components/NavHeader'
import { Toast } from 'antd-mobile';
import styles from './index.module.css'
import { getHouseInfo, getHouseList } from '../../api'
import config from '../../config'
import { Link } from 'react-router-dom'
import HouseItem from '../../components/HouseItem'

const BMap = window.BMap

const labelStyle = {
  cursor: 'pointer',
  border: '0px solid rgb(255,0,0)',
  padding: '0px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: 'rbg(255,255,255)',
  textAlign: 'center'
}

export default class Map extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      housesList: [],
      isShowList: false
    }
  }

  componentDidMount () {
    this.initMap()
  }

  getTypeAndZoom = () => {
    // 获取当前地图缩放级别

    let zoom = this.map.getZoom()
    console.log(zoom);
    let nextZoom, type;
    if (zoom >= 10 && zoom < 12) {
      nextZoom = 13;
      // circle 表示绘制圆形的覆盖物，区
      type = "circle"
    } else if (zoom >= 12 && zoom < 14) {
      nextZoom = 15
      // circle 表示绘制圆形的覆盖物，镇
      type = "circle"
    } else if (zoom >= 14 && zoom < 16) {
      // circle 表示绘制矩形的覆盖物，小区
      type = "rect"
    }
    return { nextZoom, type }
  }

  renderOverlays = async (id) => {
    Toast.loading('加载中...', 0, null, false)
    // 请求，拿到对应房源数据
    let res = await getHouseInfo(id)
    Toast.hide()
    let data = res.data.body

    let { type, nextZoom } = this.getTypeAndZoom()
    console.log(type, nextZoom);

    // 遍历，调用createOverlays,创建覆盖物
    // eslint-disable-next-line
    data.forEach(item => {
      this.createOverlays(item, type, nextZoom)
    })
  }

  createOverlays = (item, type, nextZoom) => {
    let { coord: { longitude, latitude }, label: areaName, count, value } = item
    let point = new window.BMap.Point(longitude, latitude)
    // 判断需要渲染的是哪种类型
    if (type === 'circle') {
      // 区 或者 镇
      this.createCircle(point, areaName, count, value, nextZoom)
    } else if (type === 'rect') {
      // 小区
      this.createRect(point, areaName, count, value)
    }
  }

  createCircle = (point, areaName, count, value, nextZoom) => {
    let opts = {
      position: point,    // 指定文本标注所在的地理位置
      offset: new BMap.Size(-35, -35)    //设置文本偏移量
    }
    let label = new BMap.Label("", opts);  // 创建文本标注对象
    label.setContent(`<div class="${styles.bubble}">
                        <p class="${styles.name}">${areaName}</p>
                        <p>${count}套</p>
                      </div>`)
    label.id = value
    label.setStyle(labelStyle);
    label.addEventListener('click', () => {
      this.map.centerAndZoom(point, nextZoom);
      setTimeout(() => {
        this.map.clearOverlays()
      }, 0);
      this.renderOverlays(value)
    })
    this.map.addOverlay(label);
  }

  createRect = (point, areaName, count, value) => {
    let opts = {
      position: point,    // 指定文本标注所在的地理位置
      offset: new BMap.Size(-50, -28)    //设置文本偏移量
    }
    let label = new BMap.Label("", opts);  // 创建文本标注对象
    label.setContent(`<div class="${styles.rect}">
                        <span class="${styles.housenum}">${areaName}</span>
                        <span class="${styles.housenum}">${count}套</span>
                        <i class="${styles.arrow}"></i>
                      </div>`)
    label.id = value
    label.setStyle(labelStyle);
    label.addEventListener('click', (e) => {
      const target = e.changedTouches[0]
      this.map.panBy((window.innerWidth / 2 - target.clientX), (window.innerHeight - 330) / 2 - target.clientY)
      this.getHouseList(value)
    })
    this.map.addEventListener('movestart', () => {
      if (this.state.isShowList) {
        this.setState(() => {
          return {
            isShowList: false
          }
        })
      }
    })
    this.map.addOverlay(label);

  }

  initMap = async () => {
    const city = localStorage.getItem('hkzf_city')
    if (!city) {
      return Toast.fail('获取定位失败', 2)
    }
    const { label, value } = JSON.parse(city)
    let map = new BMap.Map("container");
    this.map = map
    // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    // 创建地址解析器实例     
    let myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野    
    myGeo.getPoint(label, async (point) => {
      if (point) {
        map.centerAndZoom(point, 11);
        // 缩放控件
        map.addControl(new BMap.NavigationControl());
        // 比例尺控件
        map.addControl(new BMap.ScaleControl());

        // map.addEventListener('zoomstart', () => {
        //   let zoom = map.getZoom()
        // })

        this.renderOverlays(value)
      }
    },
      label);
  }

  getHouseList = async (cityId) => {
    Toast.loading('加载中...', 0, null, false)
    const { data: res } = await getHouseList({ cityId })
    Toast.hide()
    console.log(res);
    this.setState(() => {
      return {
        housesList: res.body.list,
        isShowList: true
      }
    })
  }

  renderHousesList () {
    return this.state.housesList.map(item => {
      return (<HouseItem
        key={item.houseCode}
        src={config.baseURL + item.houseImg}
        title={item.title}
        desc={item.desc}
        tags={item.tags}
        price={item.price}
      ></HouseItem>)
    }
    )
  }

  render () {
    return (
      <div className="map">
        <NavHeader>地图找房</NavHeader>
        <div id="container"></div>
        <div
          className={[
            styles.houseList,
            this.state.isShowList ? styles.show : ''
          ].join(' ')}
        >
          <div className={styles.titleWrap}>
            <h1 className={styles.listTitle}>房屋列表</h1>
            <Link className={styles.titleMore} to="/home/houselist">
              更多房源</Link>
          </div>
          <div className={styles.houseItems}>
            {/* 房屋结构 */}
            {this.renderHousesList()}
          </div>
        </div>
      </div>
    )
  }
}