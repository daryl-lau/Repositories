import React, { useState } from 'react'
import KeepAlive, { AliveScope } from 'react-activation'

export default function () {
  const [show, setShow] = useState(true)
  return (
    <AliveScope>
      <button onClick={() => setShow(show => !show)}>Toggle</button>
      <p>无 KeepAlive</p>
      {show && <Counter />}
      <p>有 KeepAlive</p>
      {show && (
        <>
          <KeepAlive id="Test1">
            <Counter />
          </KeepAlive>

          <KeepAlive id="Test2">
            <Counter />
          </KeepAlive>
        </>
      )}
    </AliveScope>
  )
}


function Counter () {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>count: {count}</p>
      <button onClick={() => { setCount(c => c + 1) }}>+1</button>
    </div>
  )
}