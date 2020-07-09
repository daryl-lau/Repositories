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

  checkStatus = () => {
    const newTitleSelectStatus = { ...this.state.titleSelectedStatus }
    for (let key in this.state.selectedValue) {
      if (
        (key === 'area' && this.state.selectedValue[key].length !== 2) ||
        (key === 'area' && this.state.selectedValue[key][0] === 'subway')
      ) {
        newTitleSelectStatus[key] = true
      } else if (key === 'mode' && this.state.selectedValue[key][0] !== 'null') {
        newTitleSelectStatus[key] = true
      } else if (key === 'price' && this.state.selectedValue[key][0] !== 'null') {
        newTitleSelectStatus[key] = true
      } else if (key === 'more' && this.state.selectedValue[key].length > 0) {
        newTitleSelectStatus[key] = true
      } else {
        newTitleSelectStatus[key] = false
      }
    }
    return newTitleSelectStatus
  }

  changeTitle = type => {
    const newTitleSelectStatus = this.checkStatus()
    this.setState(() => {
      return {
        titleSelectedStatus: {
          ...newTitleSelectStatus,
          [type]: true
        },
        openType: type
      }
    })
  }

  onCancel = () => {
    const newTitleSelectStatus = this.checkStatus()
    this.setState({
      titleSelectedStatus: newTitleSelectStatus,
      openType: ''
    })
  }

  onSave = (type, val) => {
    this.setState(() => {
      return {
        openType: '',
        selectedValue: {
          ...this.state.selectedValue,
          [type]: val
        }
      }
    }, () => {
      const newTitleSelectStatus = this.checkStatus()
      this.setState(() => {
        return {
          titleSelectedStatus: newTitleSelectStatus
        }
      }, () => {
        this.getHouseList()
      })
    })
  }

  getHouseList = () => {
    console.log(this.state.selectedValue);

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
