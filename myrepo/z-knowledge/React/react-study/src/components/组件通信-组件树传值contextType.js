import React from 'react'

// 一层一层props的方式，很麻烦
// class Father extends React.Component {
//     constructor(...args) {
//         super(...args)
//         this.state = {
//             color: 'red'
//         }
//     }

//     render () {
//         return (
//             <div>
//                 <h1>Father</h1>
//                 <Ch color={this.state.color}></Ch>
//             </div>
//         )
//     }
// }

// class Ch extends React.Component {
//     constructor(...args) {
//         super(...args)
//     }

//     render () {
//         return (
//             <div>
//                 <h2>CH</h2>
//                 <ChCh color={this.props.color}></ChCh>
//             </div>

//         )
//     }
// }

// class ChCh extends React.Component {
//     constructor(...args) {
//         super(...args)
//     }
//     render () {
//         return (
//             <div>
//                 <h3>ChCh</h3>
//                 <ChChCh color={this.props.color}></ChChCh>
//             </div>

//         )
//     }
// }

// class ChChCh extends React.Component {
//     constructor(...args) {
//         super(...args)
//     }
//     render () {
//         return (
//             <div>
//                 <h4 style={{ color: this.props.color }}>ChChCh</h4>
//             </div>

//         )
//     }
// }

// context的方式
// 只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。
// 这有助于在不使用 Provider 包装组件的情况下对组件进行测试。
// 注意：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效。
const ColorCtx = React.createContext("red")     // defaultValue
const BgCtx = React.createContext("green")     // defaultValue

class Father extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      style: { color: 'red' },
      bgColor: { color: 'green' }
    }
  }

  render () {
    return (
      // <ColorCtx.Provider value="blue">     // 可以传字符串
      // <ColorCtx.Provider value={{color: 'green'}}>    // 传对象官方不建议在这里传，而是提升到state中
      <ColorCtx.Provider value={this.state.style}>
        <BgCtx.Provider value={this.state.bgColor}>
          <div>
            <h1>Father</h1>
            <Ch></Ch>
          </div>
        </BgCtx.Provider>
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
  componentDidMount () {
    console.log(this);
    console.log(this.context);
  }
  // 嵌套的组建中每一层都可以使用这种方式来进行取值
  static contextType = ColorCtx
  render () {
    return (
      <div>
        <h3 style={{ color: this.context.color }}>ChCh</h3>
        <ChChCh></ChChCh>
      </div>
    )
  }
}

class ChChCh extends React.Component {


  // 挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。
  // 这能让你使用 this.context 来消费最近 Context 上的那个值。上面传递的value就绑定到了this.context上
  // 你可以在任何生命周期中访问到它，包括 render 函数中。
  // 注意这种方式只能订阅单一context，多个context通过consumer订阅
  // 什么意思呢，就是如果父级提供了多个context，例如：

  // <ThemeContext.Provider value={theme}>
  //     <UserContext.Provider value={signedInUser}>
  //       <Layout />
  //     </UserContext.Provider>
  //   </ThemeContext.Provider>

  // 此时static contentType 只能定义其中的一个
  // 而consumer可以订阅多个，例如：

  // <ThemeContext.Consumer>
  //   {theme => (
  //     <UserContext.Consumer>
  //       {user => (
  //         <ProfilePage user={user} theme={theme} />
  //       )}
  //     </UserContext.Consumer>
  //   )}
  // </ThemeContext.Consumer>


  componentDidMount () {
    console.log(this);
    console.log(this.context);
  }

  static contextType = BgCtx

  render () {
    return (
      <div>
        <h4 style={{ backgroundColor: this.context.color }}>ChChCh</h4>
      </div>
    )
  }
}

export default Father