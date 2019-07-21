import React from 'react';
import {connect} from 'react-redux';

class News extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            data: 'aaa'
        }
    }


    // componentDidUpdate 可以进行async进行异步操作，一般会进行网络请求
    componentDidUpdate(prevProps, prevState, snapshot) {
        let prev_id = prevProps.match.params.id;
        let id = this.props.match.params.id;


        // 修改状态不能直接放在componentDidUpdate里面，否则将会进入无限循环，因为setState每调用一次，都会触发componentDidUpdate


        // 当props和state发生变化的时候，都会触发componentDidUpdate

        // 这样写的目的是为了避免路由切换的时候频繁的进行数据更新，消耗系统资源，只有当路由真正切换的时候，才进行数据更新
        if (id !== prev_id) {
            console.log('update', id);
            this.setState({
                    data: id === '1' ? 'aaa' : 'bbb'
                }
            )
        }
    }

    render() {
        console.log('render')
        return (
            <section>
                <p>News</p>
                {/*路由参数： {this.props.match.params.id}*/}
                {this.state.data}
            </section>
        )
    }
}


export default connect(function (state, props) {
        // console.log(state, props);
        return state
    },
    {}
)(News)