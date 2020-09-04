import React, { Profiler } from 'react';
import './App.css'
import './index.css'


import Com1 from './components/jsx初体验'
import List from './components/列表渲染'
import { LoadDataComp } from './components/列表渲染'
// import Father from './components/组合组件及传值props'
// import Wrapper from './components/state'
// import TransFatherToChild from './components/组件通信-子传父状态提升'
// import TransChildToFather from './components/组件通信-父传子'
import TransBetweenCompTree from './components/组件通信-组件树传值contextType'
import TransBetweenCompTree1 from './components/组件通信-组件树传值contextType1'
import Consumer from './components/组件通信-组件树传值-consumer'
// import CompRouter from './components/router/index'
// import LazyLoadTest from './components/lazy懒加载'
// import ErrorTest from './components/错误边界'
// import RefsComponent from './components/refs'
// import MyBtnTest from './components/refs转发'
// import ControlComp from './components/受控组件'
import PropTypesComp from './components/propTypes-defaultProps'
// import Mouse from './components/render props模式'
// import MousePosition from './components/HOC'
import Counter from './components/setState推荐语法'
// import SyncCount from './components/setState转同步的方法'
import LifeCycle, { LifeCycleFather } from './components/生命周期'
import CountHooks from './components/hooks初探useState'
import TimerHooks from './components/hooks_useEffect'
// import ContextHooks from './components/hooks_useContext'
// import ReducerCounter from './components/hooks_useReducer'
import ReducerCounter2 from './components/hooks_useReducer2'
// import OriginRedux from './components/原始redux使用'
// import SagaTest from './components/redux/SagaTest'
import ReactChildren from './components/API_React.Children'
import ReactCloneElement from './components/API_React.cloneElement'
import Dialog from './components/protals'
// import HocChain from './components/HOC链式调用'
import HooksCallBack from './components/hooks_useCallback'
import HooksMemo from './components/hooks_useMemo'
import HooksRef from './components/hooks_useRef_useImperativeHandle转发'
import HooksMyHooks from './components/hooks_自定义hook'
// import HooksDebounce from './components/hooks-自定义useDebounce-测试'
import { UseRefCreateRef, UseRefCreateRef2 } from './components/hooks_useRef_createRef对比'
import SyntheticEvents from './components/合成事件'
import DangerouslySetInnerHtml from './components/dangerouslySetInnerHTML'
import FuncCompProps from './components/函数型组件使用props作为state'
import UseMemo from './components/使用useMemo hook进行优化'
import Render from './components/探究父子组件重新渲染'
import LazyInitState from './components/hooks_useState惰性初始化'
import Upload from './components/yewu/upload'
import AnimationComp from './components/react-spring/use-spring'
import AnimationComp2 from './components/react-spring/use-interpolate'
import AnimationComp3 from './components/react-spring/use-transition'
import ClassNamesUse from './components/classnames使用'
import KeepAlive from './components/keep-alive'

// import MobxComp from './components/mobx/mobxTest'


// function callback (
//   id, // 发生提交的 Profiler 树的 “id”
//   phase, // "mount" （如果组件树刚加载） 或者 "update" （如果它重渲染了）之一
//   actualDuration, // 本次更新 committed 花费的渲染时间
//   baseDuration, // 估计不使用 memoization 的情况下渲染整颗子树需要的时间
//   startTime, // 本次更新中 React 开始渲染的时间
//   commitTime, // 本次更新中 React committed 的时间
//   interactions // 属于本次更新的 interactions 的集合
// ) {
//   // 合计或记录渲染时间。。。
//   console.log(
//     id,
//     phase,
//     actualDuration,
//     baseDuration,
//     startTime,
//     commitTime,
//     interactions);
// }

function App () {
  return (
    <div className="App">

      <KeepAlive></KeepAlive>
      <ClassNamesUse></ClassNamesUse>
      {/* <LazyLoadTest></LazyLoadTest> */}
      <AnimationComp></AnimationComp>
      {/* <AnimationComp2></AnimationComp2> */}
      {/* <AnimationComp3></AnimationComp3> */}
      <br />
      <Com1></Com1>
      <br />
      {/* <Profiler id="list" onRender={callback}><List></List></Profiler> */}
      <List></List>
      <LoadDataComp></LoadDataComp>
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
      {/* <TransBetweenCompTree1></TransBetweenCompTree1> */}
      <br />
      <Consumer></Consumer>
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
      {/* <SyncCount></SyncCount> */}
      <br />
      {/* <LifeCycle></LifeCycle> */}
      {/* <LifeCycleFather></LifeCycleFather> */}
      <br />
      {/* <CountHooks></CountHooks> */}
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
      {/* <ReactCloneElement></ReactCloneElement> */}
      {/* <Dialog></Dialog> */}
      {/* <HocChain a={'a'}></HocChain> */}
      {/* <HooksCallBack></HooksCallBack> */}
      {/* <HooksMemo></HooksMemo> */}
      {/* <HooksRef></HooksRef> */}
      {/* <HooksMyHooks></HooksMyHooks> */}
      {/* <MobxComp></MobxComp> */}
      {/* <HooksDebounce></HooksDebounce> */}
      {/* <UseRefCreateRef></UseRefCreateRef> */}
      {/* <UseRefCreateRef2></UseRefCreateRef2> */}
      <SyntheticEvents></SyntheticEvents>
      {/* <DangerouslySetInnerHtml></DangerouslySetInnerHtml> */}
      {/* <FuncCompProps></FuncCompProps> */}
      {/* <UseMemo></UseMemo> */}
      {/* <Render></Render> */}
      {/* <LazyInitState></LazyInitState> */}
      {/* <Upload></Upload> */}
    </div>
  );
}

export default App;
