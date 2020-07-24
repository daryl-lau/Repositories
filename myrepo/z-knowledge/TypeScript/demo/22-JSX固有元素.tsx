
// 固有元素
// 这里的JSX 和 IntrinsicElements 都是内置的接口，名字不能随便叫
// 如果没有声明该接口，那么所有固有元素都不做类型检查，
// 一旦声明了，所有的元素就在JSX.IntrinsicElements上查找对应的元素，作为类型检查的依据（所有元素，div a h1等）

// declare namespace JSX {
//   interface IntrinsicElements {
//     foo: any,
//     div: any,
//   }
// }

// <div>
//   <foo />,
//   {/* 下面bar会报错，因为上面IntrinsicElements中没有bar的固有元素，因此不能使用bar元素 */}
//   <bar />
// </div>


// 注意：你也可以在JSX.IntrinsicElements上指定一个用来捕获所有字符串索引：

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
<div>
  <foo />,
  {/* 下面bar不会报错 */}
  <bar />
</div>