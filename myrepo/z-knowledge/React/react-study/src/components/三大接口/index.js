import React from "./myReact/react";
import ReactDOM from "./myRreact/react-dom";


function FuncCmp (props) {
  return <div>name: {props.name}</div>;
}
class ClassCmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }
  clickHandle = () => {
    console.log("clickHandle");
  };
  render () {
    const { counter } = this.state;
    return (
      <div>
        name: {this.props.name}
        <p>counter: {counter}</p>
        <button onCclick={this.clickHandle}>点击</button>
        {[0, 1, 2].map(item => {
          return <FuncCmp name={"我是function组件" + item}
            key={item} />;
        })}
      </div>
    );
  }
}
let jsx = (
  <div>
    <div className="border">我是内容</div>
    <FuncCmp name="我是function组件" />
    <ClassCmp name="我是class组件" />
  </div>
);
ReactDOM.render(jsx, document.getElementById("root"));
// 0. ⽂本 1. 原⽣的 2. function组件 3 class组件