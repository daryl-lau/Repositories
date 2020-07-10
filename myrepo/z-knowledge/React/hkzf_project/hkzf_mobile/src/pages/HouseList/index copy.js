import React from 'react'
import SearchHeader from '../../components/SearchHeader'
import { Flex } from 'antd-mobile'
import styles from './index.module.css'
import Filter from '../../components/Filter'
import { getHouseList } from '../../api'
import HouseItem from '../../components/HouseItem'
import { List, AutoSizer, WindowScroller } from 'react-virtualized'
import config from '../../config'

export default class HouseList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      count: 0
    }
    this.listComponent = React.createRef()
  }
  filters = {}

  getCity = () => {
    const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'))
    return { label, value }
  }
  getHouseList = async () => {
    const city = this.getCity()
    const { data: res } = await getHouseList({
      cityId: city.value,
      ...this.filters,
      start: 1,
      end: 20
    })
    const { list, count } = res.body
    this.setState({
      list,
      count
    })
    console.log(list, count);
  }

  onFilter = (filters) => {
    this.filters = filters
    this.getHouseList()
  }

  componentDidMount () {
    this.getHouseList()
  }

  renderHousesList = ({ key, index, style }) => {
    const { list } = this.state
    const house = list[index]
    return (
      <HouseItem
        key={key}
        style={style}
        src={config.baseURL + house.houseImg}
        title={house.title}
        desc={house.desc}
        tags={house.tags}
        price={house.price}
      ></HouseItem>
    )
  }

  render () {
    return (
      <div>
        <Flex className={styles.header}>
          <i className="iconfont icon-back" onClick={() => { this.props.history.go(-1) }}></i>
          <SearchHeader cityName={this.getCity()['label']} className={styles.searchHeader}></SearchHeader>
        </Flex>
        <Filter onFilter={this.onFilter} />
        {/* {this.renderHousesList()} */}
        <WindowScroller>
          {({ height, isScrolling, scrollTop }) => (<AutoSizer>
            {({ width }) => (<List
              autoHeight
              // 组件的宽度
              width={width}
              // 组件的高度
              height={height}
              rowCount={this.state.count}
              // 每行的高度
              rowHeight={120}
              rowRenderer={this.renderHousesList}
              // onRowsRendered={this.onRowsRendered}
              isScrolling={isScrolling}
              scrollTop={scrollTop}
            />)}
          </AutoSizer>)}
        </WindowScroller>

      </div>
    )
  }
}