import React from "react";


// 展示组件
function Show(props) {
    return (
        <div>
            {props.id} - {props.name}
        </div>
    )
}


// 高阶组件 高阶组件实际上是一个函数，以需要扩展的组件为参数，返回一个新的组件
const ShowWrap = (Cmp) => {

    // 这个props获取的是外部引用后传递过来props
    // 外部引入这个高阶组件，传递属性，通过props获取，再将外部传递的属性和自己传递的属性进行合并，传递给下层组件
    return props => {
        return (
            <div>
                {/*这个是高阶组件里的元素*/}
                <p>id - name</p>

                {/*这个是下层的展示组件*/}

                {/*将从上层获取到的props进行解构，传递给下层组件*/}
                <Cmp {...props} name='abc'/>
            </div>
        )
    };
};

// 导出时，需要导出高阶组件包装后的组件
export default ShowWrap(Show);