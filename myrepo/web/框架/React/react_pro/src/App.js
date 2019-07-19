import React from 'react';
import './App.css';

import {connect} from 'react-redux';


import Cmp from './Cpm'

class App extends React.Component {
    // constructor(...args){
    //     super(...args);
    // }
    fn() {
        let newName = 'zhangsan';
        this.props.setName(newName)
    };

    fn2() {
        this.props.addAge(5)
    }


    render() {
        return (
            <div>
                {/*需要用bind(this)来改变this指向为App，否则为undefined*/}
                <input type="button" name="" title="" value="改名" onClick={this.fn.bind(this)}/>
                <input type="button" name="" title="" value="+5" onClick={this.fn2.bind(this)}/>
                {this.props.name}<br/>
                {this.props.gender}<br/>
                {this.props.age}
                <Cmp/>
            </div>
        );
    }
}

// export default App;

// connect接收两个参数，第一个参数是一个函数，用来整合state和props中的数据，这个函数接收的两个参数state和props，state是状态机里return出来的参数，props是组件上绑定传递出来的参数
// 第二个参数是方法对象，可以写处理数据的方法，用{}包起来
export default connect(
    function (state, props) {
        console.log(state);
        return {
            // 保留状态机里的属性
            ...state,

            // 如果组件传递了相同的属性名，使用props里的覆盖之前的
            // name: props.name
            // ...props,

        }
    },
    {
        // 这里写的方法，都会放在this.props上，调用的时候也需要使用this.props
        setName(newName) {
            // 这里返回给action，在reducer里的action
            return {
                type: 'set_name',
                name: newName
            }
        },
        addAge(n) {
            return {
                type: 'add_age',
                n
            }
        }
    }
)(App);