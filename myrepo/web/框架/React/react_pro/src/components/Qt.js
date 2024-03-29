import React from 'react';
import {connect} from 'react-redux';

// router
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import Qta from './Qt_a'
import Qtb from './Qt_b'
import {Redirect} from 'react-router-dom'

function PrivateRoute({component: Component, ...rest}) {
    const isLogin = false;
    return <Route {...rest} component={
        (props) => {
            console.log('props', props);
            return isLogin ?
            <Component {...props}/> :
            // state用来保存当前的路径，登录后直接进行跳转
            <Redirect to={{pathname:'/login', state: {from: props.location.pathname}}}/>
        }
    }/>
}

class Cmp extends React.Component {
    // constructor(...args) {
    //     super(...args)
    // }

    render() {
        const path = this.props.match.path;
        return (
            <Router>
                <section>
                    <p>嵌套</p>
                </section>

                {/* 在react中，嵌套路由不支持相对路径写法，需要从顶层开始往下写 */}
                <Link to={`${path}/qt_a`}>嵌套a</Link>
                <Link to={`${path}/qt_b`}>嵌套b</Link>

                {/*<Route path={`${path}/qt_a`} component={Qta}/>*/}
                <PrivateRoute  path={`${path}/qt_a`} component={Qta} />
                <Route path={`${path}/qt_b`} component={Qtb}/>
            </Router>
        )
    }
}


export default connect(function (state, props) {
        console.log(state, props);
        return state
    },
    {}
)(Cmp)