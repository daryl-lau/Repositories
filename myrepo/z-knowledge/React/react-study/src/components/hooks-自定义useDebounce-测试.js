import React, { useState, useEffect } from 'react'
import useDebounce from './hooks-自定义useDebounce'

export default function () {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);

  const handleClick = useDebounce(function () {
    setCounter(counter + 1)
  }, 1000)

  useEffect(() => {
    const t = setInterval(() => {
      setCounter2(counter2 => counter2 + 1)
    }, 1000);
    return () => {
      clearInterval(t)
    }
  }, [])

  return (
    <div style={{ padding: 30 }}>
      <button
        onClick={handleClick}
      >click</button>
      <div>{counter}</div>
      <div>{counter2}</div>
    </div>
  )
}