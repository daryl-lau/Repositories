import React, { useState, useEffect } from 'react'

function Comp (props) {
  console.log(props);

  //! 极不推荐这样做，因为这个value可以通过外面父层的props修改，也可以通过里面的setValue修改，打破了react的单一数据源原则，可能会导致数据混乱
  const [value, setValue] = useState(props.value)

  const handleClick = () => {
    setValue({ ...value, name: 'jack' })
  }

  return (
    <>
      <p>{value.name}, {value.age}</p>
      <p>{props.value.name}, {props.value.age}</p>
      <button onClick={handleClick}>子组件中修改</button>
    </>
  )
}


export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: { name: 'jerry', age: 18 }
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({ value: { ...this.state.value, name: 'tom' } })
  }


  render () {
    return (
      <>
        <Comp value={this.state.value}></Comp>
        <button onClick={this.handleClick}>在父组件中修改</button>
      </>
    )
  }
}