import React,{Component} from 'react';


/*

页面初始化阶段：
    第一步：构造函数初始化，状态初始化
    第二步：组件将要挂载
    组件渲染
    第三步：组件已挂载

循环阶段：
    第一步：构造函数初始化，状态初始化
    第五步：组件是否需要更新
    第六步：组件将要更新
    组件渲染
    第七步：组件已经更新


*/

class Lifecycle extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: 'user1'
        };

        console.log('第一步：构造函数初始化，状态初始化')
    }

    fn(){
        this.setState({
            name: 'newname'
        })
    }

    componentWillMount() {
        // 此时可以访问属性和状态了，可以进行api调用，但是不能进行dom相关操作
        console.log('第二步：组件将要挂载')
    }

    componentDidMount() {
        // 组件已挂载，可以进行状态更新操作
        console.log('第三步：组件已挂载')
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // 父组件传递的属性有变化，做相应的响应
        console.log('第四步：接收父组件传递的属性', nextProps, nextContext)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // 组件是否需要更新，返回bool值，优化点
         console.log('第五步：组件是否需要更新');
        return true
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('第六步：组件将要更新');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('第七步：组件已经更新', prevProps, prevState, snapshot);
    }

    componentWillUnmount() {
    }

    render(){
        // 组件渲染发生在第二步，组件将要挂载之后
        console.log('组件渲染');
        return (
            <div>
                React声明周期
                <button onClick={this.fn.bind(this)}>修改</button>
            </div>
        )
    }
}

export default Lifecycle