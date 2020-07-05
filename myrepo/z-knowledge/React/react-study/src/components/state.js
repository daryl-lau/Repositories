import React from 'react'

class Wrapper extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            total: 0
        }
    }

    addTotal = () => {
        this.setState({
            total: this.state.total + 1
        })
    }

    render () {
        return (
            <div>
                {/* 组件的state是私有的，多次渲染也只会修改自己内部的state */}
                <Count cb={this.addTotal}></Count>
                <Count cb={this.addTotal}></Count>
                <Count cb={this.addTotal}></Count>
                <p>total: {this.state.total}</p>
            </div>
        )
    }
}

class Count extends React.Component {
    constructor(...props) {
        super(...props)

        // 组件的状态state是私有的，组件之间无法直接获取其他组件的state
        this.state = {
            count: 0
        }
    }

    // react事件处理函数中的this指向的不是当前组件，所以这里使用箭头函数，this就指向的就正确了
    // 如果不使用箭头函数，那么在下面调用函数的时候就需要使用onClick={this.handleClick.bind(this)}来手动进行this的绑定
    handleClick = () => {


        // 可以直接读取state的值，但是不能直接修改
        // 修改state只能使用setState方法，该方法接收一个对象，里面可以有多个键值对
        // 设置的状态和原本定义的状态进行合并，如果有重名，则覆盖原来的值
        // setState方法可能是异步的，如果有多个setState方法会合并一起处理
        this.setState({
            count: this.state.count + 1,
            aaa: 'aaa'
        })

        // 由于setState是异步的，这里的打印会比真是渲染出来的数量少一个，因为先打印了再才进行了修改
        // 如果不想异步执行，可以直接使用async/await进行同步化处理
        console.log(this.state.count);

        this.props.cb()

    }

    render () {
        return (
            <div>
                <button onClick={this.handleClick}>+1</button>&nbsp;
                {this.state.count}
            </div>
        )
    }
}


export default Wrapper