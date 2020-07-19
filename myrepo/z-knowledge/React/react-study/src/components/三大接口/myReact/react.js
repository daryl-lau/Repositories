import { Component } from "./Component";

function createElement (type, props, ...children) {
  props.children = children;
  //判断组件类型
  let vtype;
  if (typeof type === "string") {
    // 原⽣标签
    vtype = 1;
  } else if (typeof type === "function") {
    // 类组件 函数组件
    vtype = type.isReactComponent ? 3 : 2;
  }
  return {
    vtype,
    type,
    props,
  };
}
const React = {
  createElement,
  Component,
};
export default React;