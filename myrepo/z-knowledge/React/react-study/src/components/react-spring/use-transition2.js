import React, { useState } from 'react'
import { useTransition, animated } from 'react-spring'

export default function () {
    const [show, set] = useState(false)
    const transitions = useTransition(show, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    })
    return <>
    {transitions.map(({ item, key, props }) =>
    item && <animated.div key={key} style={props}>123</animated.div>
    )}
    <button onClick={()=>{set(!show)}}>123</button>
    </>
}