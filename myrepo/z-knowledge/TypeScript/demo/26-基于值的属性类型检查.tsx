
/* 
* 对于基于值的元素，就稍微复杂些。 
* 它取决于先前确定的在元素实例类型上的某个属性的类型。 
* 至于该使用哪个属性来确定类型取决于JSX.ElementAttributesProperty。 
* 它应该使用单一的属性来定义。 这个属性名之后会被使用。 
* TypeScript 2.8，如果未指定JSX.ElementAttributesProperty，那么将使用类元素构造函数或SFC调用的第一个参数的类型。
*/


// 全局ElementAttributesProperty 不能指定多个属性名，只能指定一个
declare namespace JSX {
  interface ElementAttributesProperty {
    props: any; // 指定用来使用的属性名
  }
}

class MyCmp {
  // 在元素实例类型上指定属性
  // 创建类组件的时候，给定props属性，就是上面ElementAttributesProperty定义的属性名，
  // 里面存放MyCmp这个类组件将来使用的时候需要传递的属性，后面使用的时候就按照这里面定义的属性来传递属性
  props: {
    foo?: string;
    foo1: string;
  }

  render() { }
}


class MyCmp1 {
  props: {
    foo: number
    foo1: boolean
  }
  render() { }
}

// `MyComponent`的元素属性类型为`{foo?: string}`
// <MyCmp foo="bar" foo1="foo1" />    // 正确
<MyCmp1 foo={1} foo1={false} />       // 正确