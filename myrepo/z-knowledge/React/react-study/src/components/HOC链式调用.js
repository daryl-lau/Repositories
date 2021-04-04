import React from 'react'

function Comp (props) {
  console.log('Comp');
  return (<div>{props.a}</div>)
}


function HocComp (Cmp) {
  return function Aaa (props) {
    console.log(111111);
    return (<Cmp {...props} />)
  }
}

function HocComp1 (Cmp) {
  return function Bbb (props) {
    console.log(222222);
    return (<Cmp {...props} />)
  }
}
// 链式调用从外往里执行，先打印222222再打印111111
export default HocComp1(HocComp(Comp))