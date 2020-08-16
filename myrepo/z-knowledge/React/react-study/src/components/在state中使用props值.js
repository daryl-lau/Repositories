import React from 'react'

class MyComp extends React.Component {
  constructor(props) {
    super(props)

    // constructor仅仅在组件挂载的时候才会访问一次，因此这里的state在挂载之后，父组件的props无论怎么变，这里state的值都不会变
    // 如果想要子组件的state随着父组件的props变化而变化，可以使用getDerivedStateFromProps生命周期钩子
    this.state = {
      count: this.props.count
    }
  }

  // 这里nextProps获取到的就是最新的props值，getDerivedStateFromProps钩子返回一个对象，用来修改state
  static getDerivedStateFromProps (nextProps) {
    console.log(nextProps);
    return { count: nextProps.count }
  }

  render () {
    return (
      <>
        <p>{this.state.count}</p>
        <p>{this.props.count}</p>
      </>
    )
  }
}


class WrapComp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  handleClick = () => {
    this.setState({ count: this.state.count + 1 })
  }

  render () {
    return (
      <>
        <MyComp count={this.state.count} />
        <button onClick={this.handleClick}>+1</button>
      </>
    )
  }
}

export default WrapComp