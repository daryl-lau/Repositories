import React, { Component } from 'react'
import { PickerView } from 'antd-mobile'
import FilterFooter from '../FilterFooter'

export default class FilterPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.selectedValue
    }
  }
  onChange = (val) => {
    this.setState(() => {
      return {
        value: val
      }
    })
  }
  render () {
    return (
      <>
        {/* 选择器组件： */}
        <PickerView data={this.props.data} value={this.state.value} cols={this.props.cols} onChange={this.onChange} />
        {/* 底部按钮 */}
        <FilterFooter onCancel={() => { this.props.onCancel(this.props.type)}} onOk={() => { this.props.onSave(this.props.type, this.state.value) }} />
      </>
    )
  }
}
