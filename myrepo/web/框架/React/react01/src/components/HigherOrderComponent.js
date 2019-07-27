import React, {Component} from "react";
import {Button} from "antd";

// 高阶组件和复合组件的区别在于：
// 高阶组件是将下层的组件拿到高阶组件内部使用，函数返回的是本组件，高阶函数需要将下层函数作为参数传递给上层
// 复合组件不需要将下层函数作为参数传递给上层，直接使用标签引用

// 展示组件
function Show(props) {
    return (
        <div>
            {props.id} - {props.name}
            {props.button}
        </div>
    )
}


// 高阶组件 高阶组件实际上是一个函数，以需要扩展的组件为参数，返回一个新的组件
/*const ShowWrap = (Cmp) => {

    // 这个props获取的是外部引用后传递过来props
    // 外部引入这个高阶组件，传递属性，通过props获取，再将外部传递的属性和自己传递的属性进行合并，传递给下层组件
    return props => {
        return (
            <div>
                {/!*这个是高阶组件里的元素*!/}
                <p>id - name</p>

                {/!*这个是下层的展示组件*!/}
                {/!*将从上层获取到的props进行解构，传递给下层组件*!/}
                <Cmp {...props} name='abc' button={<Button>按钮</Button>}/>
            </div>
        )
    };
};*/


// 可以重写展示组件的生命周期
const ShowWrap = Cmp => {
    class NewCmp extends Component {

        componentDidMount() {
            console.log(NewCmp.name + '渲染了')
        }

        render() {
            // 这里和上面写法不一样，这里不需要返回函数，上层的props通过this.props获取，而不是函数的方式获取
            return (
                <div>
                    <p>id - name</p>
                    <Cmp {...this.props} name='abc' button={<Button>按钮</Button>}/>
                </div>
            )
        }
    }

    return NewCmp;
};

const Log = Cmp => {
    console.log('日志打印');
    return props => {
        return <Cmp {...props} />
    }
}

// 导出时，需要导出高阶组件包装后的组件
export default Log(ShowWrap(Show));