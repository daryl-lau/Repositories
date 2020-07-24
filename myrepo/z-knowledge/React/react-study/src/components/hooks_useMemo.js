import React, { useMemo, useState } from 'react'

export default function HooksCallBack (props) {
  const [count, setCount] = useState(0)
  const [price, setPrice] = useState(10)
  const [any, setAny] = useState(1)

//! useMemo缓存的是返回值，useCallback缓存的是回调函数 

  // useMemo返回值即函数的返回值，下面使用的时候直接使用
  const getTotalCallback = useMemo(() => {
    console.log('函数执行了');
    console.log(any);
    return price * count

    // 当不在依赖状态数组里面的状态发生了变化，不会执行fn函数，返回的是上一次执行后的缓存的值
  }, [count, price])

  return (
    <div>
      <p>单价：{price}，数量：{count}，总计：{getTotalCallback}</p>
      <button onClick={() => { setPrice(price + 1) }}>单价+1</button>
      <button onClick={() => { setCount(count + 1) }}>数量+1</button>
      <button onClick={() => { setAny(any + 1) }}>测试+1</button>
    </div>
  )
}