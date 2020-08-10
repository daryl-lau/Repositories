import React, { useRef, createRef, useState } from 'react'


// 普通用法作用几乎一模一样
// useRef和createRef 均不能扩展属性，只能操作current属性
const UseRefComp = () => {
  const varUseRef = useRef()
  const clickHandle = () => {
    varUseRef.current.focus()
  }
  return (
    <div>
      <input ref={varUseRef}></input>
      <button onClick={clickHandle}>useRef获取焦点</button>
    </div>
  )
}

const CreateRefComp = () => {
  const varCreateRef = createRef()
  const clickHandle = () => {
    varCreateRef.current.focus()
  }
  return (
    <div>
      <input ref={varCreateRef}></input>
      <button onClick={clickHandle}>createRef获取焦点</button>
    </div>
  )
}

export const UseRefCreateRef = () => {
  return (
    <>
      <UseRefComp></UseRefComp>
      <CreateRefComp></CreateRefComp>
    </>
  )
}

// useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数，//!返回的 ref 对象在组件的整个生命周期内保持不变。
// useRef 在 react hook 中的作用, 正如官网说的, 它像一个变量, 类似于 this , 它就像一个盒子, 你可以存放任何东西.
// createRef 每次渲染都会返回一个新的引用，而 useRef 每次都会返回相同的引用。
export const UseRefCreateRef2 = () => {
  const [count, setCount] = useState(1)

  // useRef()可以给一个初始值，放到返回对象的current属性上，
  // 除非手动的修改这个值，在组件的重新渲染过程中，这个值是不变的
  const varUseRef = useRef(1)

  const varCreateRef = createRef()
  console.log(varUseRef, varCreateRef);   // {current: 1}, {current: null} 每次打印都是这个值
  // 每次修改count，都会触发整个函数的重新执行
  // 从这里的打印值就可以看出来，每次打印，varUseRef返回的是同一个引用，而createRef每次都会创建一个新的引用
  // 因此可以在useRef

  // 给了初始值这里就不用再判断了，反正每次返回的current都是1
  // if (!varUseRef.current) {
    varUseRef.current = count
  // }

  // 由于createRef每次都会返回新的引用，他的current初始值都是null，然后给他赋值
  if (!varCreateRef.current) {
    varCreateRef.current = count
  }

  return (
    <>
      <p>count: {count}</p>
      <p>varUseRef: {varUseRef.current}</p>
      <p>varCreateRef: {varCreateRef.current}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </>
  )
}


