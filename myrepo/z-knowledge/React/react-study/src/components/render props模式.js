import React from 'react'

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
    // render props模式，这里渲染的是外面调用的时候传过来的函数的返回值，同时把组件内部的状态传递给外面的函数
    // 外面的传递过来的函数不一定要叫render，任何名字都行，同时还可以把函数放在props.children里面
    // 这种使用方式被称之为render props模式，实现组件的复用
    return this.props.render(this.state)
  }
}

export default Mouse