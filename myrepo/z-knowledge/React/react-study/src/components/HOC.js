import React from 'react'

// 高阶组件的作用是进行状态逻辑的复用，或增强组件功能
// 高阶组件实际上是一个函数，参数是另一个组件，返回值是高阶组件内部新创建的组件，提供复用的state和逻辑代码
// 作为参数的另一个组件提供渲染界面，并在高阶函数内部的render中使用

// 设置displayName
function getDispalyName (Comp) {
  return Comp.displayName || Comp.name || 'Component'
}

function withMouse (Comp) {
  class Mouse extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        x: 0,
        y: 0
      }
    }

    moveHandle = e => {
      this.setState({
        x: e.clientX,
        y: e.clientY
      })
    }

    componentDidMount () {
      window.addEventListener('mousemove', this.moveHandle)
    }

    render () {
      return (
        // 将高阶函数内部复用的状态传递给组件使用
        <Comp {...this.state} {...this.props}></Comp>
      )
    }
  }
  Mouse.displayName = `WithMouse${getDispalyName(Comp)}`
  return Mouse
}

const Position = (props) => {
  return (
    <h1>高阶组件-鼠标位置：{props.x}, {props.y}</h1>
  )
}

const MousePosition = withMouse(Position)

export default MousePosition



// 函数式的HOC

// const hoc = (Cmp) => {
//   return (props) => {
//     return (
//       <div>
//         <Cmp {...props}></Cmp>
//       </div >
//     )
//   }
// }

// const hoc = Cmp => props => {
//   return <div><Cmp {...props}></Cmp></div>
// }

// const Aaa = hoc(Position)
// <Aaa a={1}></Aaa>

// 高阶工厂函数，返回高阶函数的函数，使用()链式调用
const hocCreater = () => {
  return Cmp => props => {
    return <Cmp />
  }
}

hocCreater()(Position)
