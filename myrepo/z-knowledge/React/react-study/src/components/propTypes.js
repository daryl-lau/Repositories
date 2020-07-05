import React from 'react'

// react里面没有这个包，要先安装
import PropTypes from 'prop-types'

class PropTypesComp extends React.Component {
    render () {
        return (
            <ul>
                {this.props.list.map(item => <li key={item}>{item}</li>)}
                {this.props.children}
            </ul>
        )
    }
}

PropTypesComp.propTypes = {
    list: PropTypes.array,
    children: PropTypes.element
}

export default PropTypesComp

