import React from 'react'

// 直接字符串的ref已经被启用了，可以使用，但是react会发出一个警告，并且官方表示会在未来移除
// class RefsComponent extends React.Component {
//   handleClick () {
//     // 使用原生的 DOM API 获取焦点
//     this.refs.myInput.focus();
//   }
//   render () {
//     return (
//       <div>
//         <input type="text" ref="myInput" />
//         <input
//           type="button"
//           value="点我输入框获取焦点"
//           onClick={this.handleClick.bind(this)}
//         />
//       </div>
//     );
//   }
// }


/* 
*ref 的值根据节点的类型而有所不同：
*当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
*当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。
*你不能在函数组件上使用 ref 属性，因为他们没有实例。
*/
class RefsComponent extends React.Component {
  constructor(props) {
    super(props)
    // 1、使用React.createRef()创建一个ref绑定到实例上
    this.inputRef = React.createRef()
  }
  handleClick () {
    // 当 ref 被传递给 render 中的元素或组件时，对该节点的引用可以在 ref 的 current 属性中被访问。
    this.inputRef.current.focus()
    console.log(this.inputRef);
    console.log(this);
  }
  render () {
    return (
      <div>
        {/* 2、在render的任意组件上通过ref属性绑定ref */}
        <input type="text" ref={this.inputRef} />
        <input
          type="button"
          value="点我输入框获取焦点"
          onClick={this.handleClick.bind(this)}
        />
      </div>
    );
  }
}

export default RefsComponent