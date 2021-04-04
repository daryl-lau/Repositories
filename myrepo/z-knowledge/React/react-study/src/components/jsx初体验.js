
// 只要是用到了jsx的地方，都需要引入React，否则报错
// 报错什么原因？ 因为在使用JSX的时候，JSX会被babel编译成为一个React.createElement的函数进行调用，返回一个react元素
import React from 'react';

class Com1 extends React.Component {
  constructor(...props) {
    super(...props)
    this.name = 'jerry'
    this.age = 18
    this.func3 = this.func3.bind(this)
    this.state = {
      text: 'text'
    }
  }

  // 如果使用箭头函数声明函数，调用方式：
  // 不传参：this.func1，如果不传参，事件参数默认会自己添加上
  // 传参： (e) => {this.func1(e,'param1', 'param2')}，如果传参，事件参数需要手动传递过来
  func1 = (e, param1, param2) => {
    console.log(e);
    console.log(param1);
    console.log(param2);
  }

  // 如果不用箭头函数声明函数，那么下面调用的时候需要使用this.func2.bind(this, '123', '456')，且事件对象隐式添加到最后一个参数上
  // 不传参：this.func2.bind(this)
  // 传参：this.func2.bind(this, 'param1', 'param2')  事件对象隐式的添加到最后一个形参上
  func2 (param1, param2, e,) {
    console.log('param1', param1);
    console.log('param2', param2);
    console.log('event', e);
  }

  func3 (e, param1, param2) {
    console.log(e, 'event');
    console.log(param1);
    console.log(param2);
  }

  func4 () {
    // console.log(this.name);
    alert(this.name);
  }

  // 每个组件都必须要有一个render函数返回模板，否则报错
  render () {
    // 注意js里面的return是不能换行的，如果要换行，用()包起来
    return (
      <div>
        <p>jsx初体验</p>

        {/* 在jsx中只要是变量，都是用单括号{}包起来，而不是双括号  */}
        <p>{this.name}</p>

        {/* 对象也必须要使用单括号包起来，看起来像双括号，其实不是 */}
        <p style={{ color: 'red' }}>{this.age + 10}</p>

        {/* class样式需要使用classNme指定，因为class是保留关键字，不能使用 */}
        <p className="class1"></p>

        {/* label特殊属性for，需要使用htmlFor */}
        <label htmlFor="username">用户名：</label>
        <input id='username'></input>

        {/* react中事件传参 */}
        <button onClick={this.func4}>点击4</button>
        <button onClick={(e) => { this.func1(e, '123', '456') }}>点击1</button>
        <button onClick={this.func2.bind(this, '123', '456')}>点击2</button>
        <button onClick={this.func1}>点击1</button>
        <button onClick={this.func3.bind(this, 1, 2)}>点击3</button>
      </div>
    )
  }
}

export default Com1