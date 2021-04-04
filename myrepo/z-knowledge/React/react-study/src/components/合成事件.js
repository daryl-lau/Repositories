import React from 'react'
import { func } from 'prop-types';

/*
react合成事件

如果DOM上绑定了过多的事件处理函数，整个页面响应以及内存占用可能都会受到影响。React为了避免这类DOM事件滥用，
同时屏蔽底层不同浏览器之间的事件系统差异，实现了一个中间层——SyntheticEvent。

当用户在为onClick添加函数时，React并没有将Click事件绑定在对应的元素上面。
而是在document处监听所有支持的事件，当事件发生并冒泡至document处时，React将事件内容封装交给中间层SyntheticEvent（负责所有事件合成）
所以当事件触发的时候，对使用统一的分发函数ReactEventListener.dispatchEvent将指定函数执行。

二.合成事件和原生事件的执行顺序是什么？可以混用吗？
1.React的所有事件都通过 document进行统一分发。当真实 Dom触发事件后冒泡到 document后才会对 React事件进行处理。
2.所以原生的事件会先执行，然后执行 React合成事件，最后执行真正在 document上挂载的事件
3.React事件和原生事件最好不要混用。原生事件中如果执行了 stopPropagation方法，则会导致其他 React事件失效。因为所有元素的事件将无法冒泡到 document上，导致所有的 React事件都将无法被触发。。
*/

class SyntheticEvent extends React.Component {
  constructor(...props) {
    super(...props)
    this.btnRef = React.createRef()
  }

  clickHandler = (e) => {
    // 在 React 中 event 是一个 SyntheticEvent，如果和它的交互被延迟了（例如：通过 setTimeout），事件会被清除并且 .target.value 引用不会再有效。
    // 所有的react合成事件都存放在一个事件池里面，当调用的时候给合成事件的事件对象赋值，执行完之后把事件对象设置为null，放回事件池，而不用每次都创建一个新的合成事件
    // setTimeout(() => {
    //   console.log('React 事件触发了', e.target);
    // }, 2000)

    console.log('React 事件触发了', e.target);
  }

  // componentDidMount () {
  //   console.log(this.btnRef.current);
  //   this.btnRef.current.addEventListener('click', function (e) {
  //     console.log('原生事件触发了', e);
  //     // e.stopPropagation();   // 原生事件先触发，如果在原生事件中阻止冒泡了，那么react事件将不会被触发
  //   })
  // }

  render () {
    return (
      <>
        <button ref={this.btnRef} onClickCapture={this.clickHandler}>点击</button>
      </>
    )
  }
}

export default SyntheticEvent

