import React from 'react'

// context的方式
// 只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。
// 这有助于在不使用 Provider 包装组件的情况下对组件进行测试。
// 注意：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效。
const ColorCtx = React.createContext("red")     // defaultValue

class Father extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      style: {
        color: 'green',

        // 在传入的对象中定义修改颜色的函数，这样就会把函数传给Consumer，然后在Consumer中进行调用 
        changeColor: () => {
          console.log(111);
          this.setState({
            style: {
              // 注意这里不能直接修改，需要先保存原来的值，再进行修改，因为这个函数自己也在state中
              ...this.state.style,
              color: this.hexRandomColor()
            }
          })
        }
      }
    }
  }

  hexRandomColor = () => {
    let hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    let str = '#';
    for (let i = 0; i < 6; i++) {
      str += hex[Math.floor(Math.random() * 16)]
    };
    return str;
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
      // 在Consumer中可以修改传过来的context，但前提是原先的context里面有预先定义的修改value的回调函数
      <ColorCtx.Consumer>
        {
          value => {
            return (
              <div>
                <h4 style={{ color: value.color }}>ChCh</h4>
                <button onClick={value.changeColor}>修改颜色</button>
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