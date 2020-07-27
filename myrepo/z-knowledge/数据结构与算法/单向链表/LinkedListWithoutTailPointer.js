
// 单向链表，每一个数据看做一个节点，每个节点都有一个next指针，指向下一个节点，尾部next指向null
// 索引: O(n)
// 搜索: O(n)
// 插⼊入: O(1)
// 移除: O(1)
// 下面的实现是一个无头链表

class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}
class LinkedList {
  constructor() {
    this.head = null
    this._current
    this.length = 0
  }
  append (element) {
    const node = new Node(element)
    if (this.head === null) { // 插⼊入第⼀一个链表
      this.head = node
    } else {
      this._current = this.head
      while (this._current.next) { // 找到最后⼀一个节点
        this._current = this._current.next
      }
      this._current.next = node
    }
    this.length++
  }
  // 移除指定位置元素
  removeAt (position) {
    if (position > -1 && position < this.length) {
      let _previous
      let index = 0
      if (position === 0) { // 如果是第⼀一个链表的话, 特殊对待
        this.head = this.head.next
      } else {
        this._current = this.head
        while (index < position) { // 循环找到当前要删除元素的位置
          _previous = this._current
          this._current = this._current.next
          index++
        }
        _previous.next = this._current.next
      }
      this.length--
    }
  }
  // 在指定位置加⼊入元素
  insert (position, element) {
    const node = new Node(element)
    let index = 0
    let _current, _previous
    if (position > -1 && position < this.length + 1) {
      if (position === 0) { // 在链表最前插⼊入元素
        _current = this.head
        this.head = node
        this.head.next = _current
      } else {
        _current = this.head
        while (index < position) { // 同 removeAt 逻辑, 找到⽬目标位置
          _previous = _current
          _current = _current.next
          index++
        }
        _previous.next = node // 在⽬目标位置插⼊入相应元素
        node.next = _current
      }
      this.length++
    }
  }
  // 链表中是否含有某个元素, 如果有的话返回相应位置, ⽆无的话返回 -1
  indexOf (element) {
    let index = 0
    this._current = this.head
    while (index < this.length) {
      if (this._current.element === element) {
        return index
      }
      this._current = this._current.next
      index++
    }
    return -1
  }// 移除某元素
  remove (element) {
    const position = this.indexOf(element)
    this.removeAt(position)
  }
  // 获取⼤大⼩小
  size () {
    return this.length
  }
  // 获取最开头的链表
  getHead () {
    return this.head
  }
  // 是否为空
  isEmpty () {
    return this.length === 0
  }
  // 打印链表元素
  log () {
    this._current = this.head
    let str = this._current.element
    while (this._current.next) {
      this._current = this._current.next
      str = str + ' ' + this._current.element
    }
    console.log(str)
    return str
  }
}

var linkedList = new LinkedList()
linkedList.append(5)
linkedList.append(10)
linkedList.append(15)
linkedList.append(20)
linkedList.log() // '5 10 15 20'
linkedList.removeAt(1)
linkedList.log() // '5 15 20'
linkedList.insert(1, 10)
linkedList.log()