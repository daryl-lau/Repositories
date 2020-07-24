
// 固有元素的类型给定一个接口，定义固有元素上需要传递的属性
declare namespace JSX {
  interface IntrinsicElements {
    mytag: { requireProp: string, optionalProp?: number }
  }
}

{/* <mytag requireProp={"myOwnTag"}></mytag>     // 正确 */ }
{/* <mytag requireProp={"myOwnTag"} optionalProp={0}></mytag>   // 正确 */ }
{/* <mytag requireProp={"myOwnTag"} optionalProp={"123"}></mytag>   // 错误，optionalProp属性类型不对 */ }
{/* <mytag requireProp={"myOwnTag"} unKnowProp></mytag>   // 错误，unKnowProp属性类型不存在 */ }

// 正确，特殊情况，un-Know-Prop不符合JSX中驼峰命名的格式，ts不会做校验，因此没报错，但是使用方法是错的
<mytag requireProp={"myOwnTag"} un-Know-Prop></mytag>   