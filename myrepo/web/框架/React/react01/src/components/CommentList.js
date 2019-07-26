import React, {Component, PureComponent} from 'react';
import {Button} from "antd";

// 展示组件, 即使数据相同，也会进行渲染，并且进行diff算法检测，会消耗服务器资源，可以使用shouldComponentUpdate生命周期来进行控制是否
// 渲染，但是一旦用到生命周期，就需要使用class来定义组件
/*function Comment(props) {
    console.log('render', props);
    return (
        <div>
            {props.data.map((d, i) => {
                return <p key={i}>{d.content} {d.author}</p>
            })}
        </div>
    )
}*/


/*class CommentList extends Component {
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
}*/


/*
* PureComponent 继承自 Component
* 除了为你提供了一个具有浅比较的shouldComponentUpdate方法，PureComponent和Component基本上完全相同。
*
* 当props或者state改变时，PureComponent将对props和state进行浅比较。浅比较数组和对象时，仅比较引用是否相同，比较值时则比较值是否相等。
* 所以在对数组或对象进行改变的时候，如果没有引用一个新的数组或对象，即使改变了数组或对象的内容，组件也不会重新渲染
*
* 但是Component不会比较当前和下个状态的props和state，因此，每当shouldComponentUpdate被调用时，组件默认的会重新渲染。
* */

/*class Comment extends PureComponent {
    /!*shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !(nextProps.data.content === this.props.data.content && nextProps.data.author === nextProps.data.author);
    }*!/

    render() {
        console.log('render');
        return (
            <div>
                {this.props.content} ---{this.props.author}
            </div>
        )
    }
}*/

// {content, author} 直接解构props
const Comment = React.memo(({content, author}) => {
    return (
        <div>
            {content} ---{author}
        </div>
    )
});


class CommentList extends Component {
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



        return (
            <div>
                <Button type='primary' onClick={this.change}>修改</Button>

                {/*这样写会导致整个评论组件的重新渲染，不合理，应该是按照每一条评论进行渲染*/}
                {/*对应上面Comment组件的function的写法*/}
                {/*<Comment data={this.state.data}/>*/}

                {/*对应上面Comment组件的Component的写法*/}
                {/*{this.state.data.map((i, index) => <Comment data={i} key={index}/>)}*/}

                {/*对应上面Comment组件的PureComponent和React.memo的写法*/}
                {this.state.data.map((i, index) => <Comment content={i.content} author={i.author} key={index}/>)}
            </div>
        )
    }
}

export default CommentList;