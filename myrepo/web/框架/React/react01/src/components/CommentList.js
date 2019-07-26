import React, {Component} from 'react';
import {Button} from "antd";

// 展示组件, 即使数据相同，也会进行渲染，并且进行diff算法检测，会消耗服务器资源，可以使用shouldComponentUpdate生命周期来进行控制是否
// 渲染，但是一旦用到生命周期，就需要使用class来定义组件
/*
function CommentList(props) {
    console.log('render');
    return (
        <div>
            {props.data.map((d, i) => {
                return <p key={i}>{d.content} {d.author}</p>
            })}
        </div>
    )
}
*/


class CommentList extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !(nextProps.data.content === this.props.data.content && nextProps.data.author === nextProps.data.author);
    }

    render() {
        console.log('render');
        return (
            <div>
                {this.props.data.content} ---{this.props.data.author}
            </div>
        )
    }
}


class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {content: '天不生我李淳罡，剑道万古长如夜', author: '李淳罡'},
                {content: '风紧，扯呼', author: '老黄'},
            ]
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                data: [...this.state.data]
            })
        }, 1000)
    }

    change = () => {
        this.setState({
            data: [...this.state.data, {content: '折剑出江湖', author: '温华'}]
        })
    };

    render() {

        // 这样写会导致整个评论组件的重新渲染，不合理，应该是按照每一条评论进行渲染
        // <CommentList data={this.state.data}/>

        //

        return (
            <div>
                <Button type='primary' onClick={this.change}>修改</Button>
                {this.state.data.map((i, index) => <CommentList data={i} key={index}/>)}
            </div>
        )
    }
}

export default Comment;