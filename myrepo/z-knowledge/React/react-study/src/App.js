import React from 'react';
import './App.css'
import './index.css'


import Com1 from './components/jsx初体验'
import List from './components/列表渲染'
import Father from './components/组合组件及传值props'
import Wrapper from './components/state'
import TransFatherToChild from './components/组件通信-子传父'
import TransChildToFather from './components/组件通信-父传子'
import TransBetweenCompTree from './components/组件通信-组件树传值contentType'
import Consumer from './components/组件通信-组件树传值-consumer'
import CompRouter from './components/router/index'
import LazyLoadTest from './components/lazy懒加载'
import ErrorTest from './components/错误边界'
import RefsComponent from './components/refs'
import MyBtnTest from './components/refs转发'
import ControlComp from './components/受控组件'
import PropTypesComp from './components/propTypes'
import Mouse from './components/render props模式'
import MousePosition from './components/HOC'
import Counter from './components/setState推荐语法'


function App () {
  return (
    <div className="App">
      <LazyLoadTest></LazyLoadTest>
      <hr />
      <Com1></Com1>
      <hr />
      <List></List>
      <hr />
      <Father></Father>
      <hr />
      <Wrapper></Wrapper>
      <hr />
      <TransChildToFather></TransChildToFather>
      <hr />
      <TransFatherToChild></TransFatherToChild>
      <hr />
      <TransBetweenCompTree></TransBetweenCompTree>
      <hr />
      <Consumer></Consumer>
      <hr />
      <CompRouter></CompRouter>
      <hr />
      <ErrorTest></ErrorTest>
      <hr />
      <RefsComponent></RefsComponent>
      <hr />
      <MyBtnTest></MyBtnTest>
      <hr />
      <ControlComp></ControlComp>
      <hr />
      <PropTypesComp list={[1, 2, 3]}>
        {<h1>123</h1>}
      </PropTypesComp>
      <hr />
      <Mouse render={mouse => <h1>rendre props-鼠标位置：{mouse.x},{mouse.y}</h1>}></Mouse>
      <hr />
      <MousePosition a={1}></MousePosition>
      <hr />
      <Counter></Counter>
    </div>
  );
}

export default App;
