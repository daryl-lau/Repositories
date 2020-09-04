import React, { useState, useRef } from 'react'
import { useSpring, animated } from 'react-spring'

export default function AnimationCopm () {
  const props1 = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } })

  // 链式动画，js 函数形式，next里面的动画依次执行，可以使用下面的数组来简化代码
  const props2 = useSpring({
    to: async (next, cancel) => {
      await next({ opacity: 1, color: 'red' })
      await next({ opacity: 0, color: 'rgb(14,26,19)' })
    },
    from: { opacity: 0, color: 'green' }
  })

  // 链式动画，初始状态是from，然后按照to里面的数组动画依次过渡
  const props3 = useSpring({
    to: [{ opacity: 1, color: '#ffaaee' }, { opacity: 0, color: 'rgb(14,26,19)' }],
    from: { opacity: 0, color: 'red' }
  })


  let toggle = useRef({ toggle: false })
  const [props4, set, stop] = useSpring(() => ({ opacity: 1 }))
  // Update spring with new props
  // set({ opacity: toggle ? 1 : 0 })
  // Stop animation
  // stop()

  const handleToggle = () => {
    set({ opacity: toggle.current.toggle ? 1 : 0 })
    toggle.current.toggle = !toggle.current.toggle
  }

  return <div>
    <animated.div style={props1}><p>I will fade in</p></animated.div>
    <animated.div style={props2}><p>I will fade in and out</p></animated.div>
    <animated.div style={props3}><p>I will fade in and out</p></animated.div>
    <animated.div style={props4}><p>I will fade</p></animated.div>
    <button onClick={handleToggle}>toggle</button>
  </div>
}