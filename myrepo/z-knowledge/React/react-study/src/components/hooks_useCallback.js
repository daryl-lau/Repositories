import React, { useCallback, useState } from 'react'

export default function HooksCallBack (props) {
  const [count, setCount] = useState(0)
  const [price, setPrice] = useState(10)
  const [any, setAny] = useState(1)

  //! useMemo缓存的是返回值，useCallback缓存的是回调函数 

  // useCallback 第一个参数是函数，第二个参数是依赖状态的数组，返回值是函数，因此下面使用的时候要带上()
  // useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。但useMemo的实际用法不是这样，只是说useCallback可以使用useMemo的这种方式代替
  // 在useCallback中，不在依赖状态数组里面的状态发生了变化，其实还是会执行函数，只不过执行的函数是缓存起来的函数，因此值不会发生改变
  // useCallback的特点，没有在依赖中的状态变化时，此时useCallback返回的是缓存起来的函数
  const getTotalCallback = useCallback(() => {
    console.log('函数执行了');
    console.log(any);
    return price * count

    // 如果这里为空数组，那么count和price无论怎么改变，都不会执行getTotalCallback函数，下面的总计就不会更新
    // 若只有一个，则只有该状态变化的时候，才会执行回调函数
  }, [count, price])

  return (
    <div>
      <p>单价：{price}，数量：{count}，总计：{getTotalCallback()}</p>
      <button onClick={() => { setPrice(price + 1) }}>单价+1</button>
      <button onClick={() => { setCount(count + 1) }}>数量+1</button>
      <button onClick={() => { setAny(any + 1) }}>测试+1</button>
    </div>
  )
}