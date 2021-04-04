import React from 'react'
import ReactDOM from 'react-dom'


// Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。
// antd中的Dialog就是用的这个方案

export default class Dialog extends React.Component {
  constructor(props) {
    super(props)
    // this.node = document.createElement('div')
    this.node = undefined
  }

  componentDidMount () {
    // document.body.appendChild(this.node)
    console.log(this);
  }

  componentWillUnmount () {
    // document.body.removeChild(this.node)
  }

  show = () => {

    if (this.node) return

    this.node = document.createElement('div')
    document.body.appendChild(this.node)
    console.log(this.node);

    let res = ReactDOM.createPortal(<div style={{position: 'fixed', top: '200px', left: '200px', backgroundColor: 'red'}}>123</div>,this.node)
    console.log(res);

    ReactDOM.render(res, this.node)

    setTimeout(() => { this.hide()}, 2000)
  }

  hide = () => {
    if (!this.node) return
    ReactDOM.unmountComponentAtNode(this.node)
    document.body.removeChild(this.node)
    this.node = undefined
    console.log(this.node);
  }

  render () {
    // createPortal(child, container)
    // 第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment。
    // 第二个参数（container）是一个 DOM 元素。
    return (
      <>
        <button onClick={this.show}>show</button>
        <button onClick={this.hide}>hide</button>
      </>
    )
  }
}