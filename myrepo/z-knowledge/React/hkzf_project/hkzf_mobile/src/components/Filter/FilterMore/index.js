import React, { Component } from 'react'
import FilterFooter from '../FilterFooter'
import styles from './index.module.css'

export default class FilterMore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedValue: this.props.defaultValue
    }
  }

  handleClick = (value) => {
    const { selectedValue } = this.state
    const newSelectedValue = [...selectedValue]

    if (newSelectedValue.indexOf(value) > -1) {
      const index = newSelectedValue.findIndex(item => item === value)
      newSelectedValue.splice(index, 1)
    } else {
      newSelectedValue.push(value)
    }

    this.setState({
      selectedValue: newSelectedValue
    })
  }

  // 渲染标签
  renderFilters (data) {
    // 高亮类名： styles.tagActive
    return data.map(item => {
      const isSelected = this.state.selectedValue.indexOf(item.value) > -1
      return (<span
        className={[styles.tag, isSelected ? styles.tagActive : ''].join(' ')}
        key={item.value}
        onClick={() => { this.handleClick(item.value) }}>{item.label}</span>)
    })
  }

  handleCancel = () => {
    this.setState({
      selectedValue: []
    })
  }

  render () {
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} onClick={this.props.onCancel} />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(this.props.roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(this.props.oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(this.props.floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(this.props.characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter
          cancelText="清除"
          className={styles.footer}
          onCancel={this.handleCancel}
          onOk={() => { this.props.onSave(this.props.type, this.state.selectedValue) }} />
      </div>
    )
  }
}
