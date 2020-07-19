import React from 'react'
import ReactDOM from 'react-dom'


// Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。

export default class Dialog extends React.Component {
  constructor(props) {
    super(props)
    this.node = document.createElement('div')
  }

  componentDidMount () {
    document.body.appendChild(this.node)
  }

  render () {
    // createPortal(child, container)
    // 第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment。
    // 第二个参数（container）是一个 DOM 元素。
    return ReactDOM.createPortal((
      this.props.children
    ), this.node)
  }
}