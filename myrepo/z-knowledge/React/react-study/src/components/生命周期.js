import React from 'react'

export default class LifeCycle extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      text: 'oldValue'
    }
    console.log('执行constructor');
  }

  componentDidMount () {
    console.log('子组件被挂载了');
  }

  // getDerivedStateFromProps 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。
  // 它应返回一个对象来更新 state，如果返回 null 则不更新state。
  // 如果下面return {text: 'hello'}， 那么页面会被渲染为hello，下面按钮修改了text，也不会修改text的值，依然渲染hello，
  // 因为渲染render之前还会调用getDerivedStateFromProps，又把text设置为了hello
  static getDerivedStateFromProps (nextProps, nextState) {
    console.log(nextProps, nextState, 'getDerivedStateFromProps');
    return null
    // return { text: 'hello'}
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
    this.setState((state, props) => {
      // prevState 和 this.state 拿到的都是当前状态
      console.log(state, props, 'setState', this.state, this.props);
      return {
        text: 'newValue'
      }
    })
  }

  render () {
    console.log('render');
    return (
      <div>
        <p>{this.state.text}</p>
        <button onClick={this.changeText}>修改</button>
      </div>
    )
  }
}

export class LifeCycleFather extends React.Component {
  state = {
    text: 'test'
  }

  componentDidMount () { 
    console.log('父组件被挂载了');
  }
  
  static getDerivedStateFromProps () { 
    console.log('father getDerivedStateFromProps');
    return null
  }

  shouldComponentUpdate () { 
    console.log('father shouldComponentUpdate');
  }

  getSnapshotBeforeUpdate () { 
    console.log('father getSnapshotBeforeUpdate');
    return 'father'
  }

  componentDidUpdate () { 
    console.log('father updated');
  }

  render () {
    console.log('father render');
    return <>
      <LifeCycle text={this.state.text} />
      <button onClick={() => this.forceUpdate()}>修改111</button>
    </>
  }
}