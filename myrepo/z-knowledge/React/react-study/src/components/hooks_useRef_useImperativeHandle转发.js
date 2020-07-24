import React, { useRef, useEffect, useImperativeHandle } from 'react'

export default function HooksRef (props) {

  const inputRef = useRef()
  const btnRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <div>
      <p>useRef</p>
      <input ref={inputRef} />
      <FancyInput ref={btnRef} onClick={() => { btnRef.current.getWidth() }} />
    </div>
  )
}

// useImperativeHandle 应当与 forwardRef 一起使用
// 这里的ref参数和类组件的使用方式有点不同，类组件里面直接把ref属性赋给button的ref属性就可以了，外面拿到的直接就是内部的dom了
// 但是在函数组件中，ref需要传递给useImperativeHandle，通过它来吧定义的处理函数和外部的ref关联起来，而内部则需要创建自己内部的ref用于处理dom
function FancyInput (props, ref) {
  const buttonRef = useRef();

  // useImperativeHandle定义回调函数，在外部可以使用ref.current直接调用
  useImperativeHandle(ref, () => ({
    getWidth: () => {
      console.log(buttonRef.current);
      console.log(buttonRef.current.offsetWidth);
    }
  }));
  return <button ref={buttonRef} onClick={props.onClick}>获取按钮的宽度</button>;
}
FancyInput = React.forwardRef(FancyInput);