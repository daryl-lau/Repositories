import React from 'react'
import { withRouter } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import styles from './index.module.css'
import PropTypes from 'prop-types'


class NavHeader extends React.Component {

  defaultLeftClick = () => { this.props.history.go(-1) }

  render () {
    return (
      <NavBar
        mode="light"
        icon={<i className="iconfont icon-back"></i>}
        onLeftClick={this.props.onLeftClick || this.defaultLeftClick}
        className={[styles.navHeader, this.props.className || ''].join(' ')}
        rightContent={this.props.rightContent}
      >{this.props.children}</NavBar>
    )
  }
}

NavHeader.propTypes = {
  children: PropTypes.string.isRequired,
  onLeftClick: PropTypes.func,
  className: PropTypes.string,
  rightContent: PropTypes.array
}

export default withRouter(NavHeader)