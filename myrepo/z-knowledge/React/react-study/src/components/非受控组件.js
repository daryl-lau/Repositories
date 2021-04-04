import React from 'react'

export default class UnControlledComp extends React.Component {
  constructor(props) {
    super(props)
    this.inputRef = React.createRef()
  }

  handleClick = () => {
    console.log(this.inputRef.current.value);
  }

  render () {
    return (
      <>
        <input defaultValue="default value" ref={this.inputRef}></input>
        <button onClick={this.handleClick}>点击</button>
      </>
    )
  }
}