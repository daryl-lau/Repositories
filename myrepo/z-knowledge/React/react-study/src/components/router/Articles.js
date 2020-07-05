import React from 'react'

class Articles extends React.Component {

    render () {
        console.log(this.props.match.params.id);
        return (
            <div>
                <h4>文章{this.props.match.params.id}</h4>
            </div>
        )
    }
}

export default Articles