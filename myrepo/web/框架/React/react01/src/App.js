import React, {Component} from 'react';
import {connect} from 'react-redux'

import img1 from './img1.jpg';
import './App.css'

import Lifecycle from './Lifecycle';
import Cart from './Cart'
import CommentList from './components/CommentList'
import WelcomeDialog from './components/composite'
import ContextExp from './components/ContextExp'

import HOC from './components/HigherOrderComponent'

import {SET_NAME, ADD_AGE} from './types'


// antd
import {Button} from 'antd';


// 函数型组件，在父组件内部，则直接用props接收父组件传递的属性，而不是this.props
// 如果组件在外部，则该组件使用this.props来接收参数
// 如果组件无状态，最好使用function来定义组件，如果组件有状态，则用class来定义组件
function Welcome(props) {
    return (
        <div>
            <p>Welcome, {props.name}</p>
        </div>
    )
}


class App extends Component {
    constructor(props) {
        super(props);

        // 初始化状态
        this.state = {
            date: new Date().toLocaleTimeString(),
            count: 0
        }
    }


    componentDidMount() {
        // this.timer = setInterval(() => {
        //
        //     // 更新状态，不能直接this.state.date修改状态，单向数据流
        //     this.setState({
        //         date: new Date().toLocaleTimeString()
        //     })
        // }, 1000);


        // setState()是异步的，setState()会批量统一执行,
        // setState()提供一个回调函数，用于实时获取修改后的数据

        /*this.setState({
            count: this.state.count + 1
        }, ()=>{
            console.log(this.state.count)
        });*/


        // 如果新改的属性值依赖前一个属性值，上面的写法是不合理的，可能会导致数据混乱
        // 正确的写法是使用函数，如果函数很简单，有且仅有一个return，可以简写为 (prevState, prevProps)=>( {count: prevState.count + 1} )
        this.setState((prevState, prevProps) => {
            return {
                count: prevState.count + 1
            }
        }, () => {
            // console.log(this.state.count)  // 返回的是1
        });

        // console.log(this.state.count)   // 返回0而不是1
    }

    // 定时器需要手动清除，和Vue一样
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    fn = () => {
        console.log(this.props.setName);
        this.props.setName('newName')
    };

    fn1 = () => {
        this.props.addAge(1)
    };

    render() {
        const name = 'React';
        const dom = <p>Dom</p>;

        return (
            <div>
                <h2>React真好用</h2>

                {/*    表达式  */}
                {name}


                {/*<p>{this.fn()}</p>*/}

                <button onClick={this.fn.bind(this)}>aaaaa</button>

                {/* 图片src可以直接从外部导入 */}
                {/* 行间样式需要使用json格式指定*/}
                <img src={img1} alt="" style={{width: 150}} className="img"/>


                {dom}

                {/* 传入组件自定义属性是只读的，单向数据流，不能修改，子组件想要修改的话，需要调用父级组件的回调函数，
                传入组件的自定义属性会全部包含在一个数组里面进行传递 */}
                <Welcome name='Tom'> </Welcome>

                <p>{this.state.date}</p>

                {/*<Lifecycle aaa='aaa'/>*/}

                <Cart title='购物车'/>


                {/*antd*/}
                <Button type="primary">按钮</Button>


                <CommentList/>

                <WelcomeDialog/>


                <h2>高阶组件</h2>
                {/*高阶组件传递属性给下层*/}
                <HOC id='1'/>


                <ContextExp/>
                <p>{this.props.users.name}</p>
                <p>{this.props.users.age}</p>
                <Button type={"primary"} onClick={this.fn}>修改名字</Button>
                <Button type={"primary"} onClick={this.fn1}>年龄+1</Button>
            </div>
        )
    }
}

export default connect(
    function (state, props) {
        // 这里的state是所有的state，包括users和company
        // props是通过组件传递过来的属性
        console.log(state);
        return {
            // 保留状态机里的属性,
            /*
                如果是使用...state.users, ...state.company来保留属性，那么如果users和company中有相同的属性名，那么将只会保留写在
                后面的那个属性,并且上面使用属性的时候，不能使用this.props.users.name，而只能使用this.props.name，这个name将会显示
                最后一个name属性值（如果组件传递的属性也有name，也将计算进去，显示写在代码最后的那个name属性值）

                按需保留state的属性，但是需要注意顺序覆盖关系，如果不想这样，直接全部保留，使用this.props.users.name引用，组件传递
                过来的属性直接this.props.name来引用，不会造成冲突，也就没有顺序覆盖关系
            */
            ...state,

            // 如果组件传递了相同的属性名，使用props里的覆盖之前的
            // name: props.name
            ...props,
        }
    },
    {
        // 这里写的方法，都会放在this.props上，调用的时候也需要使用this.props
        setName(newName) {
            // 这里返回给action，在reducer里的action
            return {
                type: SET_NAME,
                name: newName
            }
        },


        // addAge(n) {
        //     return {
        //         type: ADD_AGE,
        //         n
        //     }
        // },
        addAge(n) {
            return function (dispatch) {
                setTimeout(function () {
                    dispatch({type: ADD_AGE, n})
                }, 1000)
            }
        }


        // changeCompanyName(comName) {
        //     return {
        //         type: CHANGE_COMPANY_NAME,
        //         comName: comName
        //     }
        // }
    }
)(App);