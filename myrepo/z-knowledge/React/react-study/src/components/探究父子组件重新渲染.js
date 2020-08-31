import React from 'react'


// 父组件发生了变化（props,setState），子组件都会发生重新渲染，但是否重新渲染要取决于shouldComponentUpdate的返回值
// 如果返回true则子组件会发生re-render，如果返回false，则不会re-render
// 但是re-render和更新dom是不同的，re-render了也不一定会更新dom，取决于diff算法，比较前后两次的差异，
// 如果没有差异则不会进行dom的更新，有则将差异的进行dispatch

export default class Com1 extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({ count: 2 })
  }

  render () {
    console.log('com1 render');
    return (
      <div>
        <Com2></Com2>
        <p>{this.state.count}</p>
        <button onClick={this.handleClick}>+1</button>
      </div>

    )
  }
}

class Com2 extends React.Component {

  shouldComponentUpdate () {
    return false
  }

  render () {
    console.log('com2 render');
    return (
      <Com3></Com3>
    )
  }
}

class Com3 extends React.Component {
  render () {
    console.log('com3 render');
    return (
      <p>Com3</p>
    )
  }
}

