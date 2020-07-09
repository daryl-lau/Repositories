import React from 'react'

import { Flex } from 'antd-mobile'

import styles from './index.module.css'

// 条件筛选栏标题数组：
const titleList = [
  { title: '区域', type: 'area' },
  { title: '方式', type: 'mode' },
  { title: '租金', type: 'price' },
  { title: '筛选', type: 'more' }
]

export default class FilterTitle extends React.Component {
  renderItem = () => {
    return titleList.map(item => {
      const isSelected = this.props.titleSelectedStatus[item.type]
      return <Flex.Item key={item.type} onClick={() => { this.props.changeTitle(item.type) }}>
        {/* 选中类名： selected */}
        <span className={[styles.dropdown, isSelected ? styles.selected : ''].join(' ')} >
          <span>{item.title}</span>
          <i className="iconfont icon-arrow" />
        </span>
      </Flex.Item>
    })
  }
  render () {
    return (
      <Flex align="center" className={styles.root}>
        {this.renderItem()}
      </Flex>
    )
  }
}
