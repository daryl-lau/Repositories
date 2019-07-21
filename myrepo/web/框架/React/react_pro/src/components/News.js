import React from 'react';
import {connect} from 'react-redux';

class News extends React.Component {
    // constructor(...args) {
    //     super(...args)
    // }

    render() {
        return (
            <section>
                <p>News</p>
            </section>
        )
    }
}


export default connect(function (state, props) {
        console.log(state,props);
        return state
    },
    {}
)(News)