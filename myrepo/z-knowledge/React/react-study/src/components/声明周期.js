import React from 'react'

export default class LifeCycle extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: 'oldValue'
    }
  }

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