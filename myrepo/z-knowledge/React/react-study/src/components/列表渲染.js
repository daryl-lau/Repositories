import React from 'react'
import { connect } from 'react-redux'

import { changeCompanySync, changeCompanyAsync } from './redux/actions'

class List extends React.Component {
    constructor(...props) {
        super(...props)
        this.list = ['one', 'two', 'three', 'four', 'five']
    }

    render () {
        return (
            <ul>
                {/* 每一个li都需要指定一个唯一的key，和vue的原因一样 */}
                {this.list.map((item, index) => <li key={index}>{item}</li>)}

                <h1>{this.props.company.name}</h1>
                <button onClick={this.props.changeComNameSync}>同步修改</button>
                <button onClick={this.props.changeComNameAsync}>异步修改</button>
            </ul>
        )
    }
}

export default connect((state, props) => {
    return {
        ...state,
        ...props
    }
}, {
    changeComNameSync () {
        return changeCompanySync('sync new name')
    },
    changeComNameAsync () {
        return changeCompanyAsync('async new name')
    }
})(List)

