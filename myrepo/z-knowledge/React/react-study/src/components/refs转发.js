import React from 'react'


// 假设封装一个btn组件，给一些样式，在外面用这个组件的时候，希望使用ref拿到组件内部的button dom，就需要ref转发

//! ref和key是不会随着props传递给下层组件的，在组件上绑定的ref只能获取到组件，不能获取到组件里面的具体元素
//! 如果想要在组件上传递ref，获取组件里面的具体元素，需要使用forwardRef传递ref 

// 以下是对上述示例发生情况的逐步解释：
// 我们通过调用 React.createRef 创建了一个 React ref 并将其赋值给 btnRef 变量。
// 我们通过指定 ref 为 JSX 属性，将其向下传递给 <MyBtn ref={btnRef}>。
// React 传递 ref 给 forwardRef 内函数 (props, ref) => ...，作为其第二个参数。
// 我们向下转发该 ref 参数到 <button ref={ref}>，将其指定为 JSX 属性。
// 当 ref 挂载完成，btnRef.current 将指向 <button> DOM 节点。

// 例如封装的btn按钮想要获取btn的宽度
class MyBtnTest extends React.Component {
    constructor(props) {
        super(props)
        this.btnRef = React.createRef()
    }

    clickHandle = () => {
        console.log(this.btnRef.current);
        console.log(this.btnRef.current.offsetWidth);
    }

    render () {
        return (
            <div>
                {/* 组件上没有事件，把处理函数当做属性传递给子组件，在子组件里面调用 */}
                <MyBtn ref={this.btnRef} onClick={this.clickHandle}>点击获取按钮的宽度</MyBtn>
            </div>
        )
    }
}

// 这里接收到的ref就是外面使用MyBtn时传过来的ref，再将其绑定到button元素上，那么外面获取到的ref就是button元素的ref了，而不是组件的ref
// 注意，ref不是props属性（ps:key也不是），是不会跟随props向下传递的，需要自己手动接收传递
const MyBtn = (props, ref) => {
    return (
        <button ref={ref} onClick={props.onClick}>
            {props.children}
        </button>
    )
}
MyBtn = React.forwardRef(MyBtn)

export default MyBtnTest