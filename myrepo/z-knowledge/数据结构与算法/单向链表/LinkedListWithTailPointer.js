
class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.length = 0
    this.head = null
    this.tail = null
  }

  append (data) {
    let node = new Node(data)
    if (this.head === null) {
      this.head = node
      this.tail = node
    } else {
      this.tail.next = node
      this.tail = node
    }
    this.length++
    return true
  }

  insert (index, data) {
    // 如果索引不正确，抛出异常
    if (index < 0 || index > this.length || isNaN(index)) {
      throw new Error('索引只能在0到链表长度之间')
    }

    // 如果传入的index等于length，则直接append一个就可以了
    if (index === this.length) {
      return this.append(data)
    }

    let node = new Node(data)
    if (index === 0) {
      node.next = this.head
      this.head = node
    } else {
      let _current = this.head
      let _previous = 0
      // 这个while循环找到要插入位置的前一个节点_current
      while (_previous < index - 1) {
        _current = _current.next
        _previous++
      }
      // 将找到的_current的next保存到nextNode，然后拼接到添加节点的next上，链就连上了
      let nextNode = _current.next
      _current.next = node
      node.next = nextNode
    }
    this.length++
  }

  remove (index) {
    if (index < 0 || index >= this.length || isNaN(index)) {
      return null
    }
    if (index === 0) {
      return this.head = this.head.next
    }
    let _del_node = this.head
    let _pre_index = 0
    let _previous = null
    while (_pre_index < index) {
      _previous = _del_node
      _del_node = _del_node.next
      _pre_index++
    }
    _previous.next = _del_node.next
    if (_del_node.next === null) {
      this.tail = _previous
    }
    this.length--
  }

  indexOf (data) {
    let index = 0
    let _current = this.head
    while (index < this.length) {
      if (_current.data === data) {
        return index
      }
      _current = _current.next
      index++
    }
    return -1
  }

  get (index) {
    if (index < 0 || index >= this.length || isNaN(index)) {
      return null
    }
    if (index === 0) {
      return this.head.data
    } else if (index === this.length - 1) {
      return this.tail.data
    } else {
      let position = 0
      let _current = this.head
      while (position < index - 1) {
        _current = _current.next
        position++
      }
      return _current.next.data
    }
  }

  /* 
    Node { data: { a: 1 }, next: null }
    Node { data: { new: 111 }, next: Node { data: { a: 1 }, next: null } }
    Node { data: 11111, next: Node { data: { new: 111 }, next: Node { data: [Object], next: null }}}
    Node { data: { a: 'data' }, next: Node { data: 11111, next: Node { data: [Object], next: [Node] } }}
    Node { data: { a: 2 }, next: Node { data: { a: 'data' },next: Node { data: 11111, next: [Node] }}}
    Node { data: { tail: 'test' }, next: Node { data: { a: 2 }, next: Node { data: [Object], next: [Node] } }}
  */
  reverse () {
    let _current = this.head
    let _previous = null;
    let _next = null;
    while (_current !== null) {
      _next = _current.next;
      _current.next = _previous;
      _previous = _current;
      if (_previous.next === null) {
        this.tail = _previous
      }
      _current = _next;
    }
    this.head = _previous
    return _previous
  }

  size () {
    return this.length
  }

  isEmpty () {
    return this.length === 0
  }

  log () {
    let _current = this.head
    while (_current) {
      console.log(_current.data);
      _current = _current.next
    }
  }
}


// 测试
let list = new LinkedList()

list.append({ a: 1 })
list.append({ a: 2 })
list.append({ a: 5 })

list.insert(1, { new: 111 })
list.log()
console.log(list.size());

list.remove(3)
list.log()
console.log(list.size());

console.log('-------------------');
list.append({ tail: 'test' })
list.log()

console.log('-------------------');
list.insert(2, 11111)
list.log()

console.log('-------------------');
console.log(list.get(0), '0');
console.log(list.get(4), '4');
console.log(list.get(1), '1');
console.log(list.get(2), '2');
console.log(list.get(3), '3');
console.log(list.get(-1), '-1');

console.log('-------------------');
console.log(list.indexOf(11111));
console.log(list.indexOf({ a: 1 }));

let data = { a: 'data' }
list.insert(3, data)
list.log()
console.log(list.indexOf(data));
console.log(list.get(data));

console.log('-------------------');
list.reverse()
list.log()

console.log('-------------------');
list.append(1000)
list.log()
console.log(list.size());
console.log(list.get(0));
console.log(list.get(5));
