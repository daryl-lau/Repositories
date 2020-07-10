import React from 'react'
import styles from './index.module.css'

export default class Sticky extends React.Component {
  constructor(props) {
    super(props)
    this.placeholder = React.createRef()
    this.content = React.createRef()
  }
  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const { top } = this.placeholder.current.getBoundingClientRect()
    const contentHeight = this.content.current.offsetHeight
    if (top < 0) {
      this.content.current.classList.add(styles.fixed)
      this.placeholder.current.style.height = contentHeight + 'px'
    } else {
      this.content.current.classList.remove(styles.fixed)
      this.placeholder.current.style.height = '0px'
    }
  }
  render () {
    return (
      <div>
        <div ref={this.placeholder}></div>
        <div ref={this.content}>{this.props.children}</div>
      </div>
    )
  }
}