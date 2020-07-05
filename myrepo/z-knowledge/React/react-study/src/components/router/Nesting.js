import React from 'react'
import { Link, Route } from 'react-router-dom'

import NestingA from './NestingA'
import NestingB from './NestingB'

class Nesting extends React.Component {
    render () {
        return (
            <div>
                {/* 在react中，不支持相对路径一级一级往下写，每一级都需要从顶层进行匹配 */}
                <Link to={'/nesting/a'}>嵌套A</Link>
                <Link to={'/nesting/b'}>嵌套B</Link>
                <Route path={'/nesting/a'} component={NestingA}></Route>
                <Route path={'/nesting/b'} component={NestingB}></Route>
            </div>
        )
    }
}

export default Nesting