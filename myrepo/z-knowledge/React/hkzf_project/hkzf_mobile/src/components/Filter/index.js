import React, { Component } from 'react'
import FilterTitle from './FilterTitle'
import FilterPicker from './FilterPicker'
import FilterMore from './FilterMore'
import styles from './index.module.css'
import { getCondition } from '../../api'

export default class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titleSelectedStatus: {
        area: false,
        mode: false,
        price: false,
        more: false
      },
      openType: '',
      filterData: {},
      selectedValue: {
        area: ['area', 'null'],
        mode: ['null'],
        price: ['null'],
        more: []
      }
    }
  }

  getCondition = async () => {
    const { value: cityId } = JSON.parse(localStorage.getItem('hkzf_city'))
    const { data: res } = await getCondition(cityId)
    this.setState(() => {
      return {
        filterData: res.body
      }
    })
  }

  componentDidMount () {
    this.getCondition()
  }

  changeTitle = type => {
    const { titleSelectedStatus, selectedValue } = this.state
    // 创建新的标题选中状态对象
    const newTitleSelectedStatus = { ...titleSelectedStatus }

    // 遍历标题选中状态对象
    // Object.keys() => ['area', 'mode', 'price', 'more']
    Object.keys(titleSelectedStatus).forEach(key => {
      // key 表示数组中的每一项，此处，就是每个标题的 type 值。
      if (key === type) {
        // 当前标题
        newTitleSelectedStatus[type] = true
        return
      }

      // 其他标题：
      const selectedVal = selectedValue[key]
      if (
        key === 'area' &&
        (selectedVal.length !== 2 || selectedVal[0] !== 'area')
      ) {
        // 高亮
        newTitleSelectedStatus[key] = true
      } else if (key === 'mode' && selectedVal[0] !== 'null') {
        // 高亮
        newTitleSelectedStatus[key] = true
      } else if (key === 'price' && selectedVal[0] !== 'null') {
        // 高亮
        newTitleSelectedStatus[key] = true
      } else if (key === 'more' && selectedVal.length !== 0) {
        // 更多选择项 FilterMore 组件
        newTitleSelectedStatus[key] = true
      } else {
        newTitleSelectedStatus[key] = false
      }
    })

    this.setState({
      // 展示对话框
      openType: type,
      // 使用新的标题选中状态对象来更新
      titleSelectedStatus: newTitleSelectedStatus
    })
  }

  /* 
    1 在 Filter 组件的 onTitleClick 方法中，添加 type 为 more 的判断条件。
    2 当选中值数组长度不为 0 时，表示 FilterMore 组件中有选中项，此时，设置选中状态高亮。
    3 在点击确定按钮时，根据参数 type 和 value，判断当前菜单是否高亮。
    4 在关闭对话框时（onCancel），根据 type 和当前type的选中值，判断当前菜单是否高亮。
      因为 onCancel 方法中，没有 type 参数，所以，就需要在调用 onCancel 方式时，来传递 type 参数。
  */
  // 取消（隐藏对话框）
  onCancel = type => {
    console.log('cancel:', type)
    const { titleSelectedStatus, selectedValue } = this.state
    // 创建新的标题选中状态对象
    const newTitleSelectedStatus = { ...titleSelectedStatus }
    console.log(newTitleSelectedStatus, 111111);

    // 菜单高亮逻辑处理
    const selectedVal = selectedValue[type]
    if (
      type === 'area' &&
      (selectedVal.length !== 2 || selectedVal[0] !== 'area')
    ) {
      // 高亮
      newTitleSelectedStatus[type] = true
    } else if (type === 'mode' && selectedVal[0] !== 'null') {
      // 高亮
      newTitleSelectedStatus[type] = true
    } else if (type === 'price' && selectedVal[0] !== 'null') {
      // 高亮
      newTitleSelectedStatus[type] = true
    } else if (type === 'more' && selectedVal.length !== 0) {
      // 更多选择项 FilterMore 组件
      newTitleSelectedStatus[type] = true
    } else {
      newTitleSelectedStatus[type] = false
    }

    console.log(newTitleSelectedStatus, 222222);

    // 隐藏对话框
    this.setState({
      openType: '',
      // 更新菜单高亮状态数据
      titleSelectedStatus: newTitleSelectedStatus
    })
  }

  // 确定（隐藏对话框）
  onSave = (type, value) => {
    console.log(type, value)
    const { titleSelectedStatus } = this.state
    // 创建新的标题选中状态对象
    const newTitleSelectedStatus = { ...titleSelectedStatus }

    // 菜单高亮逻辑处理
    const selectedVal = value
    if (
      type === 'area' &&
      (selectedVal.length !== 2 || selectedVal[0] !== 'area')
    ) {
      // 高亮
      newTitleSelectedStatus[type] = true
    } else if (type === 'mode' && selectedVal[0] !== 'null') {
      // 高亮
      newTitleSelectedStatus[type] = true
    } else if (type === 'price' && selectedVal[0] !== 'null') {
      // 高亮
      newTitleSelectedStatus[type] = true
    } else if (type === 'more' && selectedVal.length !== 0) {
      // 更多选择项 FilterMore 组件
      newTitleSelectedStatus[type] = true
    } else {
      newTitleSelectedStatus[type] = false
    }

    // 隐藏对话框
    this.setState({
      openType: '',

      // 更新菜单高亮状态数据
      titleSelectedStatus: newTitleSelectedStatus,

      selectedValue: {
        ...this.state.selectedValue,
        // 只更新当前 type 对应的选中值
        [type]: value
      }
    })
  }

  renderFilterPicker = () => {
    const { area, subway, rentType, price } = this.state.filterData
    if (this.state.openType === 'area' || this.state.openType === 'mode' || this.state.openType === 'price') {
      let data = []
      let cols = 1
      switch (this.state.openType) {
        case 'area':
          data = [area, subway]
          cols = 3
          break
        case 'mode':
          data = rentType
          break
        case 'price':
          data = price
          break
        default:
          break;
      }
      return (
        <FilterPicker
          key={this.state.openType}
          onCancel={this.onCancel}
          onSave={this.onSave}
          data={data} cols={cols}
          type={this.state.openType}
          selectedValue={this.state.selectedValue[this.state.openType]}
        />
      )
    } else {
      return null
    }
  }

  renderFilterMore = () => {
    const { roomType, floor, oriented, characteristic } = this.state.filterData
    if (this.state.openType === 'more') {
      return <FilterMore
        type={this.state.openType}
        roomType={roomType}
        floor={floor}
        oriented={oriented}
        characteristic={characteristic}
        onCancel={this.onCancel}
        onSave={this.onSave}
        defaultValue={this.state.selectedValue.more}
      />
    } else {
      return null
    }
  }

  render () {
    console.log('重新熏染了');
    return (
      <div className={styles.root} >
        {/* 前三个菜单的遮罩层 */}
        {
          this.state.openType === 'area' || this.state.openType === 'mode' || this.state.openType === 'price'
            ? <div className={styles.mask} onClick={this.onCancel} />
            : null
        }

        < div className={styles.content} >
          {/* 标题栏 */}
          < FilterTitle
            titleSelectedStatus={this.state.titleSelectedStatus}
            changeTitle={this.changeTitle}
          />

          {/* 前三个菜单对应的内容： */}
          {
            this.renderFilterPicker()
          }

          {/* 最后一个菜单对应的内容： */}
          {
            this.renderFilterMore()
          }
        </div >
      </div >
    )
  }
}
