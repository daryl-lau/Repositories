import React from 'react'

export default class LifeCycle extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: 'oldValue'
    }
  }

  // getDerivedStateFromProps 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。
  // 它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。
  // 如果下面return {text: 'hello'}， 那么页面会被渲染为hello，即使下面按钮修改了text，仍然不会修改text的值，依然渲染hello
  static getDerivedStateFromProps (nextProps, nextState) {
    console.log(nextProps, nextState, 'getDerivedStateFromProps');
    return null
  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log(nextProps, nextState, 'shouldComponentUpdate', this.props, this.state);
    return true
  }

  // 以render为界限，render之前是next，之后是prev


  // 状态已更改，但dom还未重新渲染，可以拿到之前dom的状态，返回值作为componentDidUpdate的第三个参数
  // 此钩子必须配合componentDidUpdate使用
  getSnapshotBeforeUpdate (prevProps, prevState) {
    console.log(prevProps, prevState, 'getSnapshotBeforeUpdate', this.props, this.state);
    return 111
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    console.log(prevProps, prevState, snapshot, 'componentDidUpdate', this.props, this.state);
  }

  changeText = () => {
    this.setState((prevState, prevProps) => {
      // prevState 和 this.state 拿到的都是当前状态
      console.log(prevState, prevProps, 'setState', this.state, this.props);
      return {
        text: 'newValue'
      }
    })
  }

  render () {
    return (
      <div>
        <p>{this.state.text}</p>
        <button onClick={this.changeText}>修改</button>
      </div>
    )
  }
}