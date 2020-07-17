import React from 'react'

class SyncCounter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }

  componentDidMount () {
    // window.addEventListener('click', this.clickHandle, false)
  }

  clickHandle = () => {
    // 方式一：给setState传递函数，state形参就是最新的state
    this.setState(state => {
      return { count: state.count + 1 }
    }, () => {
      console.log(this.state.count);   // 这里获取到的是修改后的count，但是注意如果有多次修改同一属性的话，这里打印的是最后合并更新了setState的状态
    })

    // 方式二：定时器
    // setTimeout(() => {
    //   this.setState({ count: this.state.count + 1 })
    //   console.log(this.state.count);  // 这里获取到的就是修改后的count
    // }, 0)

    // 方式三：原生事件中修改状态
    // componentDidMount () {
    //   window.addEventListener('click', this.clickHandle, false)
    // }

    // this.setState({ count: this.state.count + 1 })
    // console.log(this.state.count);    // 这里获取到的就是修改后的count

    // 方式四：使用async/await （野路子）
    // await this.setState({ count: this.state.count + 1 })
    // console.log(this.state.count);  // 这里获取到的就是修改后的count
  }

  render () {
    return (
      <div>
        <h1 id="title">同步计数器：{this.state.count}</h1>
        <button onClick={this.clickHandle}>+1</button>
      </div>
    )
  }
}

export default SyncCounter