import React from 'react';
import './App.css'
import './index.css'


import Com1 from './components/jsx初体验'
// import List from './components/列表渲染'
// import Father from './components/组合组件及传值props'
// import Wrapper from './components/state'
import TransFatherToChild from './components/组件通信-子传父状态提升'
// import TransChildToFather from './components/组件通信-父传子'
// import TransBetweenCompTree from './components/组件通信-组件树传值contentType'
// import Consumer from './components/组件通信-组件树传值-consumer'
import CompRouter from './components/router/index'
// import LazyLoadTest from './components/lazy懒加载'
// import ErrorTest from './components/错误边界'
// import RefsComponent from './components/refs'
import MyBtnTest from './components/refs转发'
// import ControlComp from './components/受控组件'
// import PropTypesComp from './components/propTypes'
// import Mouse from './components/render props模式'
// import MousePosition from './components/HOC'
import Counter from './components/setState推荐语法'
import SyncCount from './components/setState转同步的方法'
// import LifeCycle from './components/生命周期'
import CountHooks from './components/hooks初探useState'
import TimerHooks from './components/hooks_useEffect'
// import ContextHooks from './components/hooks_useContext'
import ReducerCounter from './components/hooks_useReducer'
import ReducerCounter2 from './components/hooks_useReducer2'
import OriginRedux from './components/原始redux使用'
import SagaTest from './components/redux/SagaTest'
import ReactChildren from './components/API_React.Children'
import Dialog from './components/protals'
import HocChain from './components/HOC链式调用'
import HooksCallBack from './components/hooks_useCallback'
import HooksMemo from './components/hooks_useMemo'
import HooksRef from './components/hooks_useRef_useImperativeHandle转发'
import HooksMyHooks from './components/hooks_自定义hook'

import MobxComp from './components/mobx/mobxTest'


function App () {
  return (
    <div className="App">
      {/* <LazyLoadTest></LazyLoadTest> */}
      <br />
      {/* <Com1></Com1> */}
      <br />
      {/* <List></List> */}
      <br />
      {/* <Father></Father> */}
      <br />
      {/* <Wrapper></Wrapper> */}
      <br />
      {/* <TransChildToFather></TransChildToFather> */}
      <br />
      {/* <TransFatherToChild></TransFatherToChild> */}
      <br />
      {/* <TransBetweenCompTree></TransBetweenCompTree> */}
      <br />
      {/* <Consumer></Consumer> */}
      <br />
      {/* <CompRouter></CompRouter> */}
      <br />
      {/* <ErrorTest></ErrorTest> */}
      <br />
      {/* <RefsComponent></RefsComponent> */}
      <br />
      {/* <MyBtnTest></MyBtnTest> */}
      <br />
      {/* <ControlComp></ControlComp> */}
      <br />
      {/* <PropTypesComp list={[1, 2, 3]}>
        {<h1>123</h1>}
      </PropTypesComp> */}
      <br />
      {/* <Mouse render={mouse => <h1>rendre props-鼠标位置：{mouse.x},{mouse.y}</h1>}></Mouse> */}
      <br />
      {/* <MousePosition a={1}></MousePosition> */}
      <br />
      {/* <Counter></Counter> */}
      <br />
      <SyncCount></SyncCount>
      <br />
      {/* <LifeCycle></LifeCycle> */}
      <br />
      <CountHooks></CountHooks>
      <br />
      {/* <TimerHooks></TimerHooks> */}
      <br />
      {/* <ContextHooks></ContextHooks> */}
      <br />
      {/* <ReducerCounter></ReducerCounter> */}
      {/* <ReducerCounter2 initialCount={0}></ReducerCounter2> */}
      {/* <OriginRedux></OriginRedux> */}
      {/* <SagaTest></SagaTest> */}
      {/* <ReactChildren></ReactChildren> */}
      {/* <Dialog>dialog</Dialog> */}
      {/* <HocChain a={'a'}></HocChain> */}
      {/* <HooksCallBack></HooksCallBack> */}
      {/* <HooksMemo></HooksMemo> */}
      {/* <HooksRef></HooksRef> */}
      {/* <HooksMyHooks></HooksMyHooks> */}
      <MobxComp></MobxComp>
    </div>
  );
}

export default App;
