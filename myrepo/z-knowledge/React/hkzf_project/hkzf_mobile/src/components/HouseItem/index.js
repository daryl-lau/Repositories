import React from 'react'
import { withRouter } from 'react-router-dom'
import styles from './index.module.css'
import PropTypes from 'prop-types'

class HouseItem extends React.Component {
  render () {
    const { title, desc, tags, price, src, onClick } = this.props
    return (
      <div className={styles.house} onClick={onClick}>
        <div className={styles.imgWrap}>
          <img className={styles.img} src={src} alt="" />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.desc}>{desc}</div>
          <div>
            {/* ['近地铁', '随时看房'] */}
            {tags.map((tag, index) => {
              const tagClass = 'tag' + (index + 1)
              return (
                <span
                  className={styles.tag + ' ' + styles[tagClass]}
                  key={tag}
                >
                  {tag}
                </span>
              )
            })}
          </div>
          <div className={styles.price}>
            <span className={styles.priceNum}>{price}</span> 元/月
            </div>
        </div>
      </div>
    )
  }
}

HouseItem.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  tags: PropTypes.array.isRequired,
  price: PropTypes.number,
  onClick: PropTypes.func
}

export default withRouter(HouseItem)