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

    document.body.style.overflow = 'hidden'

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

  // 取消（隐藏对话框）
  onCancel = type => {
    document.body.style.overflow = ''
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
    document.body.style.overflow = ''
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


    const newSelectedValue = {
      ...this.state.selectedValue,
      // 只更新当前 type 对应的选中值
      [type]: value
    }
    console.log('newSelectedValue', newSelectedValue);

    let filter = {}
    const { area, mode, price, more } = newSelectedValue
    let areaValue = 'null'
    if (area.length === 3) {
      areaValue = area[2] === 'null' ? area[1] : area[2]
    }
    filter.area = areaValue
    filter.rentType = mode[0]
    filter.price = price[0]
    filter.more = more.join(',')

    console.log(filter)
    this.props.onFilter(filter)

    // 隐藏对话框
    this.setState({
      openType: '',
      // 更新菜单高亮状态数据
      titleSelectedStatus: newTitleSelectedStatus,
      selectedValue: newSelectedValue
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
    return (
      <div className={styles.root} >
        {/* 前三个菜单的遮罩层 */}
        {
          this.state.openType === 'area' || this.state.openType === 'mode' || this.state.openType === 'price'
            ? <div className={styles.mask} onClick={() => { this.onCancel(this.state.openType) }} />
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
