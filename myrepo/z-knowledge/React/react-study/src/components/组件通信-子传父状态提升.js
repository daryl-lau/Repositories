import React from 'react'

class TransFather extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            msg: '这是父组件的默认信息'
        }
    }

    cbChangeMsg = (msg) => {
        this.setState({
            msg
        })
    }

    render () {
        return (
            <div>
                <p>{this.state.msg}</p>

                {/* 父组件把回调函数传给子组件 */}
                <TransChild cbChangeMsg={this.cbChangeMsg}></TransChild>
            </div>
        )
    }
}

class TransChild extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            msg: '我是子组件中的值'
        }
    }

    handleChange = () => {
        // 子组件调用回调函数，传递值进行修改
        this.props.cbChangeMsg(this.state.msg)
    }

    render () {
        return (
            <div>
                <button onClick={this.handleChange}>修改父组件的值</button>
                <button onClick={() => { this.props.cbChangeMsg(this.state.msg) }}>修改父组件的值</button>

                {/* 在render函数中，事件处理函数中如果修改了state，就不能直接调用，react定义render函数只能是一个props和state的纯粹的函数 */}
                {/* <button onClick={this.handleChange()}>修改父组件的值</button> */}
            </div>
        )
    }
}

export default TransFather