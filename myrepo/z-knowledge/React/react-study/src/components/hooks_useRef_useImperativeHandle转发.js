import React, { useRef, useEffect, useImperativeHandle } from 'react'

export default function HooksRef (props) {

  const inputRef = useRef()
  const fancyInputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleClick1 = () => {
    console.log(fancyInputRef);
    console.log(fancyInputRef.current.getBtn1Width());
  }
  const handleClick2 = () => {
    console.log(fancyInputRef.current.getBtn2Width());
  }

  return (
    <div>
      <p>useRef</p>
      <input ref={inputRef} />
      <FancyInput ref={fancyInputRef} onClick1={handleClick1} onClick2={handleClick2} />
    </div>
  )
}

// useImperativeHandle 应当与 forwardRef 一起使用
// 在函数组件中，ref传递给 useImperativeHandle ，通过它来吧定义的处理函数和外部的ref关联起来，而内部则需要创建自己内部的ref用于处理dom
// 使用 useImperativeHandle 可以实现更细粒度的控制，如果子组件中有多个元素需要分别获取，就可以使用 useImperativeHandle 
// https://codesandbox.io/s/kind-https-qtm7q
function FancyInput (props, ref) {
  const button1Ref = useRef();
  const button2Ref = useRef();

  // useImperativeHandle定义回调函数，后面一个函数的返回对象会赋给ref上，也就是这里的 fancyInoutRef ，
  // 外部就可以直接通过 fancyInoutRef.current.getBtn1Width 拿到对象里的函数来使用
  useImperativeHandle(ref, () => ({
    getBtn1Width: () => {
      return button1Ref.current.offsetWidth;
    },
    getBtn2Width: () => {
      return button2Ref.current.offsetWidth;
    }
  }));
  return (
    <>
      <button ref={button1Ref} onClick={props.onClick1}>获取按钮的宽度11</button>
      <button ref={button2Ref} onClick={props.onClick2}>获取按钮的宽度2222</button>
    </>
  )
}
FancyInput = React.forwardRef(FancyInput);