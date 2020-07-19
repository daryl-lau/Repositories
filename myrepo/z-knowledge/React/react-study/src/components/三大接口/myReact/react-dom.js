import { mount } from "./virtual-dom";
function render (vnode, container) {
  //vnode->node
  mount(vnode, container);
  // container.appendChild(node)
  console.log("render", vnode);
}
export default {
  render,
};