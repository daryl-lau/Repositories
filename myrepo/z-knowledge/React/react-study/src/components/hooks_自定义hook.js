import React, { useState, useCallback, useEffect } from 'react'

// 自定义hook实际上就是一个函数，把公共代码抽离出来
// 自定义hook可以使用React中的所有内置hook
const useWinSize = () => {
  console.log('start');
  // 1. 使用useState初始化窗口大小state
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });
  const changeSize = useCallback(() => {
    // useCallback 将函数缓存起来
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  }, []);
  // 2. 使用useEffect在组件创建时监听resize事件，resize时重新设置state (使用useCallback节流)
  // useEffect 在函数式组件中可以多次使用，按代码从上到下的顺序来执行，并不会造成其他useEffect冲突
  useEffect(() => {
    //绑定一次页面监听事件 组件销毁时解绑
    window.addEventListener("resize", changeSize);
    return () => {
      window.removeEventListener("resize", changeSize);
    };
  }, []);
  return size;
};

export default function HooksMyHooks () {

  useEffect(() => {
    console.log('HooksMyHooks');
  }, [])

  const size = useWinSize()
  return (
    <div>
      <h2>{size.width}, {size.height}</h2>
    </div>
  )
}