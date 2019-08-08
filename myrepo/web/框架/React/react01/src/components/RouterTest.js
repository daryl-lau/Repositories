import React, {Component} from 'react';

import {Link, Route} from 'react-router-dom'

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
        </div>
    )
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
                {/*
                    exact表示精确匹配，如果不配置exact，那么如下所示的/details和/details/:lang，如果路径为/details/java，
                    会同时显示/details 和 /details/:lang的内容，配置exact的话，如果路径为/details/java，那么只会显示
                    /details/:lang的内容
                */}
                <Route exact path='/home' component={Home}/>
                <Route exact path='/details' component={Details}/>
                <Route exact path='/details/:lang' component={Lang} />

            </div>
        )
    }
}

export default RouterTest;