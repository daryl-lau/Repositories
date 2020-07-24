
// 一旦建立起了类类型，实例类型由类构造器或调用签名（如果存在的话）的返回值的联合构成。
// 再次说明，在ES6类的情况下，实例类型为这个类的实例的类型，并且如果是工厂函数，实例类型为这个函数返回值类型

// 通过JSX.ElementClass接口来定义类组件的规范

declare namespace JSX {
  interface ElementClass {
    render: any;    // 必须要有一个render方法
  }
}

class MyComponent {
  render() { }
}
function MyFactoryFunction() {
  return { render: () => { } }
}


<MyComponent />; // 正确
<MyFactoryFunction />; // 正确

class NotAValidComponent { }
function NotAValidFactoryFunction() {
  return;
}


{/* <NotAValidComponent />; // 错误 */ }
{/* <NotAValidFactoryFunction />; // 错误 */ }