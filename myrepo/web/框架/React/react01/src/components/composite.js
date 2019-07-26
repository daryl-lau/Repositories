// 复合组件

import React, {Component} from 'react';
import {Button} from 'antd'

const click = () => {
    alert('bbb')
};

function Dialog(props) {
    console.log(props);
    return (
        <div style={{width: '100%', height: '100%', border: '2px solid black'}}>


            {/*children属性接收父组件使用子组件时，在里面写的所有（是所有！）其他标签，children是一个数组，保存所有标签的对象
               所有标签保存在一个数组里面，
            */}

            {/* 获取所有元素（带标签） */}
            {props.children}

            {/* 获取纯文本，不带标签 */}
            {props.children[0].props.children}

            {/* 获取标签名称 */}
            {props.children[0].type}

            {/*复合组价接收父组件传递下来的属性*/}
            {props.button}
        </div>
    )
}

function WelcomeDialog() {
    return (
        // 传递属性时可以传递JSX，直接传一个组件下去
        <Dialog button={<Button type={"danger"} onClick={click}>确定</Button>}>

            {/* 父组件在子组件内定义了两个新的元素，也没有像上面button那样显式传递给子组件，
                此时React将下面两个标签转为对象，组成一个数组，数组属性名为children，然后传递给子组件，子组件用props.children获取 */}
            <h3>欢迎光临！</h3>
            <p>感谢使用React!</p>


        </Dialog>
    )
}

export default WelcomeDialog;