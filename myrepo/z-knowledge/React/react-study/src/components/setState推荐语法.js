import React from 'react'

class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0,
        }
    }

    clickHandle = () => {

        // 函数内部多次调用setState，会将所有的setState操作进行合并，执行一次渲染，谁在最后执行谁
        // 下面调用3次setState，初始值是0，虽然调用三次了，但是渲染出来的值是3，而不是6
        // 第二个回调函数在状态改变后才会执行，由于最后合并调用count为3，因此三次打印都会是3
        this.setState({
            count: this.state.count + 1
        }, () => {
            console.log(this.state.count);  // 3
        })

        this.setState({
            count: this.state.count + 2
        }, () => {
            console.log(this.state.count);  // 3
        })
        this.setState({
            count: this.state.count + 3
        }, () => {
            console.log(this.state.count);  // 3
        })

        // setState推荐语法
        // 在setState里面传入一个回调函数，回调函数的参数是最新的state和最新的props
        // 每次调用setState的时候，获取到的state和props都是最新的
        // 因此下面调用了两次setState，渲染出来的值是2
        // this.setState((state, props) => {
        //     console.log(state);          // 0
        //     return {
        //         count: state.count + 1
        //     }
        // })
        // this.setState((state, props) => {
        //     console.log(state);          // 1
        //     return {
        //         count: state.count + 1
        //     }
        // })

        // setState第二个参数
        // setState推荐语法接收第二个参数，是一个回调函数，在状态发生修改后并且dom更新后会立即执行，获取到修改后的状态和dom
        // 下面回调函数内部会打印会输出2，第二个参数回调函数只有在所有状态发生改变后才会执行调用，
        // 在这个回调函数里面获取到的dom也是修改了之后的，和componentDidUpdate声明周期类似
        // this.setState((state, props) => {
        //     return {
        //         count: state.count + 1
        //     }
        // }, () => {
        //     console.log('更新后的状态：', this.state.count);  // 2
        // })

        // this.setState((state, props) => {
        //     return {
        //         count: state.count + 1
        //     }
        // }, () => {
        //     console.log('更新后的状态：', this.state.count);  // 2
        // })
        
        // setState的操作是异步的，和怎么使用无关，因此无论使用哪种凡是调用setState，下面打印的值只会是初始值0
        // console.log(this.state.count);

    }

    render () {
        console.log('render');
        return (
            <div>
                <h1 id="title">计数器：{this.state.count}</h1>
                <button onClick={this.clickHandle}>+1</button>
            </div>
        )
    }
}

export default Counter