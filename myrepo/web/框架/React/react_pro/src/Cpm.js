import React from 'react';
import {connect} from 'react-redux';

class Cmp extends React.Component {
    // constructor(...args) {
    //     super(...args)
    // }

    render() {
        return (
            <div>
                ssdfasdf
            </div>
        )
    }
}


export default connect(function (state, props) {
        console.log(state,props);
        return state
    },
    {}
)(Cmp)