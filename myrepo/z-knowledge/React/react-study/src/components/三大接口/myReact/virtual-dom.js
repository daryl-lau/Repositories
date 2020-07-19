export function mount (vnode, container) {
  const { vtype } = vnode;
  //创建⽂本节点
  if (!vtype) {
    mountText(vnode, container);
  }
  // 创建原⽣节点
  if (vtype === 1) {
    mountHtml(vnode, container);
  }
  // 创建函数组件
  if (vtype === 2) {
    mountFunc(vnode, container);
  }
  //创建类组件
  if (vtype === 3) {
    mountClass(vnode, container);
  }
}
//创建⽂本节点
function mountText (vnode, container) {
  const textNode = document.createTextNode(vnode);
  container.appendChild(textNode);
}
// 创建原⽣节点
function mountHtml (vnode, container) {
  const { type, props } = vnode;
  const node = document.createElement(type);
  const { children, ...rest } = props;
  Object.keys(rest).map(item => {
    if (item === "className") {
      node.setAttribute("class", rest[item]);
    } else if (item.slice(0, 2) === "on") {
      node.addEventListener("click", rest[item]);
    }
  });
  children.map(item => {
    if (Array.isArray(item)) {
      item.map(c => {
        mount(c, node);
      });
    } else {
      mount(item, node);
    }
  });
  container.appendChild(node);
}
// 创建函数组件
function mountFunc (vnode, container) {
  const { type, props } = vnode;
  const node = type(props);
  mount(node, container);
}
//创建类组件
function mountClass (vnode, container) {
  const { type, props } = vnode;
  const cmp = new type(props);
  const node = cmp.render();
  mount(node, container);
}