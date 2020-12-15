import React from 'react'

class ReactChildren extends React.Component {
  render () {


    // children还可以是一个函数，如果内部不调用，则会报错，所以内部需要使用this.props.children()来调用
    console.log(this.props.children, 'ReactChildren');
    return (
      <div>
        {/* {this.props.children('1211233')} */}

        {/* 
          如果children里面只有一个元素，那么this.props.children是一个对象，如果children里面有多个元素，那么this.props.children是一个数组
          如果不确定传入的个数，那么自己需要做一些判断，来进行处理，好在React帮我们想到了这一点，提供了一系列的API，专门用来处理this.props.children
          有这些，React.Children.map,React.Children.forEach,React.Children.count,React.Children.only,React.Children.toArray,
          React.Children.map和数组的map使用方法不一样，React.Children.map第一个参数传入的是children，
          第二个参数是一个函数，参数是每个child，以及map的index，我们可以直接返回child渲染，也可以根据child进行扩展，添加属性等操作
          但是child是只读的（所有的react元素都是只读的），不能直接进行修改，需要使用React.cloneElement api克隆扩展
          React.cloneElement(
            element,        // 克隆的母体React元素
            [props],        // 扩展的属性，如果属性重名则覆盖，是一个对象，可以扩展多个属性
            [...children]   // 为新生成的React元素添加新的children，取代从母体中克隆而来的children，可以是数组，添加多个children
                            // 每个子元素上都需要有一个唯一的key属性，否则会报错
          )                   
        */}
        {React.Children.map(this.props.children, (child, index) => {
          console.log(child);
          // return child   // 直接返回child渲染
          return React.cloneElement(child, { style: { color: 'red' }, name: 'title' }, [child.props.children, <span key={null}>新添加的内容</span>])
          // return React.cloneElement(child, { style: { color: 'red' }, name: 'title' }, ['我是新的children', '123123', <span key='123'>我是新的children</span>])
        })}
      </div>
    )
  }
}

export default class Wrapper extends React.Component {
  render () {
    return (
      <ReactChildren>
        <h1 name="name">Title</h1>
        <p><span>这是title</span></p>

        {/* 在children里传入一个函数，内部需要进行调用，否则报错，同样可以进行传参，和render props一样，只不过是写在了children里面 */}
        {/* {(msg) => { return <h1>{msg}</h1> }} */}
      </ReactChildren>
    )
  }
}