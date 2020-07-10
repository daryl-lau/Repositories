import React from 'react'

class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 1
        }
    }

    clickHandle = () => {

        // 函数内部多次调用setState，会将所有的setState操作进行合并，执行一次渲染
        // 下面调用两次setState，初始值是1，虽然调用两次了，但是渲染出来的值是2，而不是3
        // this.setState({
        //     count: this.state.count + 1
        // })

        // this.setState({
        //     count: this.state.count + 1
        // })

        // setState推荐语法
        // 在setState里面传入一个回调函数，回调函数的参数是最新的state和最新的props
        // 每次调用setState的时候，获取到的state和props都是最新的
        // 因此下面调用了两次setState，渲染出来的值是3，而不是上面的2
        this.setState((state, props) => {
            return {
                count: state.count + 1
            }
        })
        this.setState((state, props) => {
            return {
                count: state.count + 1
            }
        })

        // setState的操作是异步的，和怎么使用无关，因此无论使用哪种凡是调用setState，下面打印的值只会是初始值1
        console.log(this.state.count);


        // setState第二个参数
        // setState推荐语法接收第二个参数，是一个回调函数，在状态发生修改后并且dom更新后会立即执行，获取到修改后的状态和dom
        // 下面的打印会输出4，初始值1，上面调用了2次，自己调用了一次，打印4，
        // 在这个回调函数里面获取到的dom也是修改了之后的，和componentDidUpdate声明周期类似
        this.setState((state, props) => {
            return {
                count: state.count + 1
            }
        }, () => {
            console.log('更新后的状态：', this.state.count);
            console.log(document.querySelector('#title').innerHTML);
            
        })

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