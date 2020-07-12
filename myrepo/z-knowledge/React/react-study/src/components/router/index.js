import React from 'react'

import { Link, Route } from 'react-router-dom'

import News from './News'
import Articles from './Articles'
import Nesting from './Nesting'

class Main extends React.Component {
    render () {
        return (
            <div>
                <h4>首页</h4>
            </div>
        )
    }
}

class CompRouter extends React.Component {
    render () {
        return (
            <div>
                <h3>路由测试</h3>
                <Link to={'/'}>首页</Link>
                <Link to={'/news'}>新闻</Link>
                <Link to={'/articles/1'}>文章1</Link>
                <Link to={'/articles/2'}>文章2</Link>
                <Link to={'/nesting/a'}>嵌套</Link>

                {/* exact 表示完全匹配，只有完全匹配到'/'，才会渲染组件，如果不加，只要是匹配到'/'，就会渲染出首页组件
                Route可以放在Router里的任何位置，且组件会渲染到相应的位置，组件内返回什么标签，就渲染成什么标签，不会固定渲染成div啥的 */}
                <Route path={'/'} component={Main} exact></Route>
                <Route path={'/news'} component={News} ></Route>
                <Route path={'/articles/:id'} component={Articles} ></Route>
                <Route path={'/nesting'} component={Nesting} ></Route>

                {/* Route还可以使用render props模式 */}
                <Route path={'/test'} render={() => <div>test</div>} />
            </div>
        )
    }
}

export default CompRouter