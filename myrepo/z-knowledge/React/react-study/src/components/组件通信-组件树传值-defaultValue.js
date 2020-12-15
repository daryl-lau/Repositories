import React from 'react'

// context的方式
// 只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。
// 也就是说只有在没有使用provider包装组件的情况下，defaultValue才会生效，例如下面的Father组件中没有使用ColorCtx.Provider包装子组件
// 这有助于在不使用 Provider 包装组件的情况下对组件进行测试。
// 注意：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效。
const ColorCtx = React.createContext({color: "red"})     // defaultValue
ColorCtx.displayName = 'TransBetweenCompTree2'

class Father extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      style: {
        color: 'green',
      }
    }
  }

  render () {
    return (
      <ColorCtx.Provider value={this.state.style}>
        <div>
          <h1>Father</h1>
          <Ch></Ch>
        </div>
      </ColorCtx.Provider>
    )
  }
}

class Ch extends React.Component {

  render () {
    return (
      <div>
        <h2>CH</h2>
        <ChCh></ChCh>
      </div>

    )
  }
}

class ChCh extends React.Component {

  render () {
    return (
      <ColorCtx.Consumer>
        {
          value => {
            return (
              <div>
                <h4 style={{ color: value.color }}>ChCh</h4>
                <ChChCh></ChChCh>
              </div>
            )
          }
        }
      </ColorCtx.Consumer>

    )
  }
}

class ChChCh extends React.Component {

  // 在使用consumer的时候，不能在生命周期中获取到上下文的信息，只能在consumer里面获取到
  componentDidMount () { 
    console.log(this, 'consumer');
    console.log(this.context, 'consumer');
  }

  render () {
    return (

      // 如果不用static contextType 静态属性的方式，也可以使用Consumer的方式
      // 但是需要注意的是，Consumer里面需要是一个函数，参数是上面Provider传过来的value
      <ColorCtx.Consumer>
        {
          value => {
            return (
              <div>
                <h4 style={{ color: value.color }}>ChChCh</h4>
              </div>
            )
          }
        }
      </ColorCtx.Consumer>
    )
  }
}

export default Father