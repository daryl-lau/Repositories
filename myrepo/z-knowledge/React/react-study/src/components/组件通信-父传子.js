import React from 'react'

class TransFather extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            msg: '这是父组件的默认信息'
        }
    }
    render () {
        return (
            <div>
                {/* 父组件把回调函数传给子组件 */}
                <TransChild msg={this.state.msg}></TransChild>
            </div>
        )
    }
}

class TransChild extends React.Component {

    render () {
        return (
            <div>
                {this.props.msg}
            </div>
        )
    }
}

export default TransFather