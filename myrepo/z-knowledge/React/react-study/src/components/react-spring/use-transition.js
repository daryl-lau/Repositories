import React, { useState, useRef } from 'react'
import { useTransition, animated } from 'react-spring'

export default function () {
  const [items, set] = useState([1])
  const transitions = useTransition(items, (item, index) => index, {
    from: { transform: 'translate3d(0,-40px,0)' },
    enter: { transform: 'translate3d(0,0,0)' },
    leave: { transform: 'translate3d(0,-40px,0)' },
  })

  const handleClick = () => {
    set(item => ([...item, 1]))
  }

  const handleClick2 = () => {
    set(item => item.splice(1))
  }

  return <div style={{ marginTop: '50px', display: 'flex' }}>
    <button onClick={handleClick}>添加</button>
    <button onClick={handleClick2}>删除</button>
    {transitions.map(({ item, props, key }) =>
      <animated.div key={key} style={props}>{item}</animated.div>
    )}
  </div>
}