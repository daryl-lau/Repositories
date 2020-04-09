window.onload = function () {
  var config = [
    {
      width: 400,
      top: 20,
      left: 50,
      opacity: 0.2,
      "z-index": 2
    }, //0
    {
      width: 600,
      top: 70,
      left: 0,
      opacity: 0.8,
      "z-index": 3
    }, //1
    {
      width: 800,
      top: 120,
      left: 200,
      opacity: 1,
      "z-index": 4
    }, //2
    {
      width: 600,
      top: 70,
      left: 600,
      opacity: 0.8,
      "z-index": 3
    }, //3
    {
      width: 400,
      top: 20,
      left: 750,
      opacity: 0.2,
      "z-index": 2
    } //4
  ]

  // 1. 获取相应的元素
  let wrap = document.getElementById('wrap');
  let liArr = document.getElementsByTagName('li');
  let arrow = document.getElementById('arrow');
  let next = document.getElementById('arrRight');
  let prev = document.getElementById('arrLeft');

  // 2. 设置鼠标的移入事件
  wrap.onmouseover = function () {
    arrow.style.display = 'block';
  }
  wrap.onmouseout = function () {
    arrow.style.display = 'none';
  }

  // 3. 将数组中的属性值赋值给对应的li标签
  // 使用循环遍历,来赋值
  setStyle();
  function setStyle() {
    for (let i = 0; i < liArr.length; i++) {
      // 给每一个li标签设置config数组中对应的属性值
      // 一一对应
      variableMove(liArr[i], config[i], 10);
    }
  }

  // 4. 给next按钮设置点击事件
  // 将config数组中的对象位置改变

  next.onclick = function () {
    // 把尾巴删除,将尾巴添加在数组的最前面
    // 删除数组元素的方法有返回值(返回被删除的数据)
    config.unshift(config.pop());
    // 重新循环调用缓动动画来赋值
    setStyle();
  }

  // 5. 给prev按钮设置点击使劲

  prev.onclick = function () {
    // 把开头删除,然后添加到尾巴
    config.push(config.shift());
    // 重新循环调用缓动动画来赋值
    setStyle();
  }

}
