import React, {Component} from 'react';

import {Link, Route, Switch} from 'react-router-dom'

function Home() {
    return <div>
        Home
    </div>
}


function Details() {
    return <div>
        <ul>
            <li><Link to='/details/html5'>html5</Link></li>
            <li><Link to='/details/java'>java</Link></li>
            <li><Link to='/details/python'>python</Link></li>
        </ul>

    </div>
}

function Lang(props) {
    return (
        <div>
            {props.match.params.lang}
            <button onClick={props.history.goBack}>返回</button>
            <button onClick={() => props.history.push('/home')}>回到首页</button>
        </div>
    )
}

function NotFound() {
    return <div>
        404 Not Found
    </div>
}

class RouterTest extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/details'>Details</Link></li>
                </ul>
                {/*exact表示精确匹配，如果不配置exact，那么如下所示的/details和/details/:lang，如果路径为/details/java，
                    会同时显示/details 和 /details/:lang的内容，配置exact的话，如果路径为/details/java，那么只会显示
                    /details/:lang的内容*/}
                {/*<Route exact path='/home' component={Home}/>*/}
                {/*<Route exact path='/details' component={Details}/>*/}
                {/*<Route exact path='/details/:lang' component={Lang}/>*/}

                {/*如果加上Switch标签，则如果有重复的Route，则只显示第一个匹配到的，同时，如果定义了没有路径的页面，也需要加Switch*/}
                <Switch>
                    <Route exact path='/home' component={Home}/>
                    <Route exact path='/details' component={Details}/>
                    <Route exact path='/home' component={Home}/>
                    <Route exact path='/details/:lang' component={Lang}/>
                    <Route exact component={NotFound}/>
                </Switch>

            </div>
        )
    }
}

export default RouterTest;