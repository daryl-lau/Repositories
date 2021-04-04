import React from 'react'

class Father extends React.Component {
  constructor(...props) {
    super(...props)
    this.list = ['one', 'two', 'three', 'four', 'five']
  }

  render () {
    return (
      <ul>
        {
          this.list.map((item, index) => (
            // 父向子传值直接在属性上定义
            <Child key={index} text={item}></Child>
          ))
        }
      </ul>
    )
  }
}

class Child extends React.Component {

  render () {
    return (
      // 子组件通过this.props[属性名]接收
      <li>{this.props.text}</li>
    )
  }
}

export default Father