import React, { useState, useEffect, useRef } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0);
  const latestCount = useRef(count);
 

  /* 行为解释： 
      这里useEffect延迟3秒执行，如果不使用count的值不用useRef缓存起来，则每次点击按钮， count 加1，
      由于capture value特性，点击的时候拿到的count都是当前那个状态的count，
      如果在3秒内连续点击5下按钮，则会每隔3秒打印 'You clicked 1 times', 'You clicked 2 times' , count 依次加1...
      
      使用useRef后，由于useRef的缓存特性，并且每次点击都更新了count，下面手动设置current的值为最新的count，
      如果在3秒内连续点击5下按钮，则打印会打印最新的count，最终每隔3秒打印 'You clicked 5 times'
  */
  useEffect(() => {
    latestCount.current = count;
    setTimeout(() => {
      console.log(`You clicked ${latestCount.current} times`);
      // console.log(`You clicked ${count} times`);
    }, 3000);
  });
 
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}