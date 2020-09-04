import React, { useState } from 'react'
import classNames from 'classnames'
import styles from './classnames使用.module.css'


export default function () {


  const [isShow, setIsShow] = useState(true)

  const handleClick = () => {
    setIsShow(show => !show)
  }

  let className = classNames({ [`${styles.title}`]: isShow })
  return (
    <div>
      <h1 className={className}>hhhhhhhhhhhh1</h1>
      <button onClick={handleClick}>点击</button>
    </div>
  )
}