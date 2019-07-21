import React from 'react';
import '../static/css/App.css';

import {connect} from 'react-redux';

import {SET_NAME, ADD_AGE, CHANGE_COMPANY_NAME} from "../types/index";


// router
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import Cmp1 from './Cpm1';
import Cmp2 from './Cpm2';
import News from './News';
import Qt from './Qt'

class App extends React.Component {
    // constructor(...args){
    //     super(...args);
    // }
    fn() {
        let newName = 'newname';
        this.props.setName(newName)
    };

    fn2() {
        this.props.addAge(5)
    }

    fn3() {
        this.props.changeCompanyName('admin@beings.com')
    }


    render() {
        return (
            <Router>
                <div>
                    {/*需要用bind(this)来改变this指向为App，否则为undefined*/}
                    <input type="button" name="" title="" value="改名" onClick={this.fn.bind(this)}/>
                    <input type="button" name="" title="" value="+5" onClick={this.fn2.bind(this)}/>
                    <input type="button" name="" title="" value="修改company" onClick={this.fn3.bind(this)}/><br/>
                    company name: {this.props.company.name}<br/>
                    users name: {this.props.users.name}<br/>
                    users age: {this.props.users.age}<br/>
                    props gender: {this.props.gender}<br/>
                    props age: {this.props.age}
                    <br/>
                    <br/>
                    <br/>
                    <br/>


                    {/* Link可以放在Router里面的任何位置，Link会渲染成a标签，Link放在哪里，a标签就在哪里 */}
                    <Link to='/'>首页</Link>
                    <Link to='/cmp1'>cmp1</Link>
                    <Link to='/cmp2'>cmp2</Link>

                    {/*路由参数*/}
                    <Link to='/news/1'>news1</Link>
                    <Link to='/news/2'>news2</Link>

                    {/* exact 表示不向后匹配，Route可以放在Router里的任何位置，且组件会渲染到相应的位置，组件内返回什么标签，就渲染成什么标签，不会固定渲染成div啥的 */}
                    <Route path='/cmp1' exact component={Cmp1}/>
                    <Route path='/cmp2' exact component={Cmp2}/>

                    {/* 上面传过来的路由参数会传到指定组件的props中去 this.props.match.params.id  这个id在Route指定的是什么，传过去的就是什么 */}
                    {/* 和koa一样，支持多参数  /news/:id1/:id2 */}
                    <Route path='/news/:id' component={News}/>

                    {/* 嵌套路由 */}
                    <Link to='/qt'>嵌套</Link>
                    <Route path='/qt' component={Qt} />


                </div>
            </Router>
        );
    }
}

// export default App;

// connect接收两个参数，第一个参数是一个函数，用来整合state和props中的数据，这个函数接收的两个参数state和props，state是状态机里return出来的参数，props是组件上绑定传递出来的参数
// 第二个参数是方法对象，可以写处理数据的方法，用{}包起来
export default connect(
    function (state, props) {
        // 这里的state是所有的state，包括users和company
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
        addAge(n) {
            return {
                type: ADD_AGE,
                n
            }
        },
        changeCompanyName(comName) {
            return {
                type: CHANGE_COMPANY_NAME,
                comName: comName
            }
        }
    }
)(App);