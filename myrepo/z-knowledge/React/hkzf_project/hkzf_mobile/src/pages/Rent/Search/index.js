import React, { Component } from 'react'

import { SearchBar } from 'antd-mobile'

import { getCity } from '../../../utils'

import styles from './index.module.css'

import { getCommunity } from '../../../api'

import _ from 'lodash'

export default class Search extends Component {

  constructor(props) {
    super(props)
    this.sendRequest = _.debounce(this.sendRequest, 500)
  }

  // 当前城市id
  cityId = getCity().value

  state = {
    // 搜索框的值
    searchTxt: '',
    tipsList: []
  }

  sendRequest = async (val) => {
    const { data: res } = await getCommunity(val, this.cityId)
    console.log(res);
    this.setState({
      tipsList: res.body
    })
  }

  handleChange = (val) => {
    this.setState({
      searchTxt: val
    })
    if (!val.trim()) {
      this.setState({
        tipsList: []
      })
    } else {
      this.sendRequest(val)
    }
  }

  handleTipClick = item => {
    console.log(item);
    this.props.history.replace('/rent/add', { communityName: item.communityName, community: item.community })
  }

  // 渲染搜索结果列表
  renderTips = () => {
    const { tipsList } = this.state

    return tipsList.map(item => (
      <li key={item.community} className={styles.tip} onClick={() => { this.handleTipClick(item) }}>
        {item.communityName}
      </li>
    ))
  }

  render () {
    const { history } = this.props
    const { searchTxt } = this.state

    return (
      <div className={styles.root}>
        {/* 搜索框 */}
        <SearchBar
          placeholder="请输入小区或地址"
          value={searchTxt}
          showCancelButton={true}
          onCancel={() => history.replace('/rent/add')}
          onChange={this.handleChange}
        />

        {/* 搜索提示列表 */}
        <ul className={styles.tips}>{this.renderTips()}</ul>
      </div>
    )
  }
}
