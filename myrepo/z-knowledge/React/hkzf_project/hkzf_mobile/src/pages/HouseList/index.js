import React from 'react'
import SearchHeader from '../../components/SearchHeader'
import { Flex, ListView, Toast } from 'antd-mobile'
import styles from './index.module.css'
import Filter from '../../components/Filter'
import Sticky from '../../components/Sticky'
import NoData from '../../components/NoData'
import { getHouseList } from '../../api'
import HouseItem from '../../components/HouseItem'
// import { List, AutoSizer, WindowScroller } from 'react-virtualized'
import config from '../../config'

export default class HouseList extends React.Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      list: [],
      dataSource,
      isLoading: true,
      hasMore: true,
      initDataIsNull: false
    }
  }
  filters = {}
  city = ''
  cityId = ''

  // 加载数据函数，返回加载的数据，每次加载20条数据，根据接口修改请求参数
  NUM_ROWS = 20
  pageIndex = 0
  genData = async (pIndex = 0) => {

    console.log(this.filters);
    console.log(this.cityId);
    const start = (pIndex * this.NUM_ROWS) + 1
    const end = (pIndex * this.NUM_ROWS) + this.NUM_ROWS
    const { data: res } = await getHouseList({
      cityId: this.cityId,
      ...this.filters,
      start: start,
      end: end
    })


    // if (res.body.list.length > 0) {
    //   Toast.info(`加载了${res.body.list.length}条数据`, 1.5, null, false);
    // }
    return res.body.list;
  }

  // 选择条件后重新请求数据
  onFilter = async (filters) => {
    this.filters = filters
    Toast.loading('加载中...', 0, null, false)
    this.rData = await this.genData();
    Toast.hide()
    console.log(this.rData, 111111111111);
    if (this.rData.length === 0) {
      this.setState({
        initDataIsNull: true
      })
    } else {
      this.setState({
        initDataIsNull: false
      })
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      isLoading: false,
    });
    if (this.rData.length > 0) { this.lv.scrollTo(0, 0) }
  }

  async componentDidMount () {
    // 获取当前城市信息
    const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'))
    this.city = label
    this.cityId = value

    Toast.loading('加载中...', 0, null, false)
    // 页面初始化加载数据
    this.rData = await this.genData();
    console.log(this.rData, 2222222222222);
    Toast.hide()
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      isLoading: false,
    });
  }

  // 拉动到底后请求下一页数据
  onEndReached = async (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    const newData = await this.genData(++this.pageIndex);
    console.log('newData----------', newData);

    if (newData.length !== 0) {
      this.setState({
        hasMore: true
      })
    } else {
      this.setState({
        hasMore: false
      })
    }

    this.rData = [...this.rData, ...newData];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      isLoading: false,
    });
  }

  renderFooter = () => {
    console.log(this.state.hasMore, 'hasMore');
    if (this.state.isLoading) {
      return <div style={{ padding: 10, textAlign: 'center' }}>加载中...</div>
    } else {
      if (!this.state.hasMore) {
        return <div style={{ padding: 10, textAlign: 'center' }}>暂无更多数据</div>
      }
      return <div style={{ padding: 10, textAlign: 'center' }}>加载完成</div>
    }
  }

  render () {
    // 渲染函数，根据每一行的数据渲染UI
    const row = rowData => {
      return (
        <HouseItem
          key={rowData.houseCode}
          src={config.baseURL + rowData.houseImg}
          title={rowData.title}
          desc={rowData.desc}
          tags={rowData.tags}
          price={rowData.price}
          onClick={() => { this.props.history.push(`/detail/${rowData.houseCode}`) }}
        ></HouseItem>
      )
    };
    return (
      <div>
        <Flex className={styles.header}>
          <i className="iconfont icon-back" onClick={() => { this.props.history.go(-1) }}></i>
          <SearchHeader cityName={this.city} className={styles.searchHeader}></SearchHeader>
        </Flex>

        <Sticky>
          <Filter onFilter={this.onFilter} />
        </Sticky>

        {console.log('dataSource--------', this.state.hasMore)}
        {console.log(this.state.initDataIsNull, 'initDataIsNull')}

        {!this.state.initDataIsNull ? <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderFooter={this.renderFooter}
          renderRow={row}
          className="am-list"
          pageSize={4}
          useBodyScroll
          // onScroll={() => { console.log('scroll'); }}
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={500}
        /> : <NoData>暂无房源数据，请修改筛选条件!</NoData>}
      </div>
    )
  }
}