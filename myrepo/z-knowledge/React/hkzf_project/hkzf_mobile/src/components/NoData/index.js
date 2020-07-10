import React from 'react'

import PropTypes from 'prop-types'

import styles from './index.module.css'

import config from '../../config'

const NoData = ({ children }) => (
  <div className={styles.root}>
    <img
      className={styles.img}
      src={config.baseURL + '/img/not-found.png'}
      alt="暂无数据"
    />
    <p className={styles.msg}>{children}</p>
  </div>
)

NoData.propTypes = {
  children: PropTypes.string.isRequired
}

export default NoData
