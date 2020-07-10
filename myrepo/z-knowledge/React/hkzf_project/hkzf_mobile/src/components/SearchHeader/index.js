import React from 'react'
import { Flex } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './index.module.css'

class SearchHeader extends React.Component {
  render () {
    console.log('SearchHeader渲染了', this.props.cityName);
    return (
      <Flex className={[this.props.className || '', styles.searchBox].join(' ')}>
        {/* 左侧白色区域 */}
        <Flex className={styles.search}>
          {/* 位置 */}
          <div className={styles.location} onClick={() => { this.props.history.push('/citylist') }}>
            <span className={styles.name}>{this.props.cityName}</span>
            <i className="iconfont icon-arrow" />
          </div>

          {/* 搜索表单 */}
          <div className={styles.form} onClick={() => { this.props.history.push('/search') }}>
            <i className="iconfont icon-seach" />
            <span className={styles.text}>请输入小区或地址</span>
          </div>
        </Flex>
        {/* 右侧地图图标 */}
        <i className="iconfont icon-map" onClick={() => { this.props.history.push('/map') }} />
      </Flex>
    )
  }
}

SearchHeader.propTypes = {
  cityName: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default withRouter(SearchHeader)