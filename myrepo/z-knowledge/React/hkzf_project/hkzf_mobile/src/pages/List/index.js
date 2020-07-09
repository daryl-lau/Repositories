import React from 'react'
import SearchHeader from '../../components/SearchHeader'
import { Flex } from 'antd-mobile'
import styles from './index.module.css'
import Filter from '../../components/Filter'

export default class List extends React.Component {
    getCity = () => {
        const { label } = JSON.parse(localStorage.getItem('hkzf_city'))
        return label
    }
    render () {
        return (
            <div>
                <Flex className={styles.header}>
                    <i className="iconfont icon-back" onClick={() => { this.props.history.go(-1) }}></i>
                    <SearchHeader cityName={this.getCity()} className={styles.searchHeader}></SearchHeader>
                </Flex>
                <Filter />
            </div>
        )
    }
}