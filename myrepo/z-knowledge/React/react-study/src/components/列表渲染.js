import React from 'react'
import { connect } from 'react-redux'

class ListView extends React.Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate (props, state) {
        console.log(props, this.props);
        if (props.item === this.props.item) { return false }
        return true
    }


    render () {
        console.log('ListView Render');
        return (
            <div>
                <p>{this.props.item}</p>
            </div>
        )
    }
}


class List extends React.Component {
    constructor(...props) {
        super(...props)
        // this.list = ['one', 'two', 'three', 'four', 'five']
    }

    render () {
        // console.log(this.props.listData.map((item, index) => <li key={index}>{item}</li>));
        return (
            // <ul>
            //     {/* 每一个li都需要指定一个唯一的key，和vue的原因一样 */}
            //     {this.list.map((item, index) => <li key={index}>{item}</li>)}

            //     {/* <h1>{this.props.company.name}</h1>
            //     <button onClick={this.props.changeComNameSync}>同步修改</button>
            //     <button onClick={this.props.changeComNameAsync}>异步修改</button> */}
            // </ul>

            <div className="waterfall">
                {this.props.listData.map((item, index) => <ListView item={item} key={index}></ListView>)}
            </div>

        )
    }
}

class LoadData extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick () {
        this.props.loadData(['one', 'two', 'three', 'four', 'five'])
        this.props.test()
    }

    render () {
        return <button onClick={this.handleClick}>加载数据</button>
    }
}

export const LoadDataComp = connect(
    null,
    {
        loadData (payload) {
            return { type: 'sagaAddList', payload }
        },
        test () {
            return { type: 'sagaTest' }
        }
    }
)(LoadData)


export default connect(
    (state) => {
        return {
            listData: [...state.list]
        }
    }
)(List)

// export default connect((state, props) => {
//     return {
//         ...state,
//         ...props
//     }
// }, {
//     changeComNameSync () {
//         return changeCompanySync('sync new name')
//     },
//     changeComNameAsync () {
//         return changeCompanyAsync('async new name')
//     }
// })(List)

