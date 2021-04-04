import React, { useLayoutEffect, useEffect } from 'react'
import './hooks_useLayoutEffect.css'

const LayoutEffectComp = () => {
  const ref = React.createRef()

  // useLayoutEffect的函数签名和useEffect一样，只不过是
  // 使用useLayoutEffect的时候，在副作用里面操作dom会在浏览器渲染前变化，不会看到页面有闪屏
  useLayoutEffect(() => {
    ref.current.className = 'active'
  })

  return (
    <div style={{ width: 100, height: 100, backgroundColor: 'red' }} ref={ref}></div>
  )
}

export default LayoutEffectComp
