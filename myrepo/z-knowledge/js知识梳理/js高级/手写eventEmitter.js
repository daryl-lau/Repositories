class Emitter {
  constructor() {
    this.emitters = {}
  }

  on (eventName, handler) {
    this.emitters[eventName] = this.emitters[eventName] || []
    this.emitters[eventName].push(handler)
  }

  off (eventName, handler) {
    if (!this.emitters[eventName]) return
    let index = this.emitters[eventName].lastIndexOf(handler)
    this.emitters[eventName].splice(index, 1)
  }

  once (eventName, handler) {
    this.emitters[eventName] = this.emitters[eventName] || []
    function wrappedFunc () {
      handler.apply(this, arguments)
      this.off(eventName, wrappedFunc)
    }

    this.on(eventName, wrappedFunc)
  }

  emit (eventName) {
    this.emitters[eventName] = this.emitters[eventName] || []
    let args = Array.prototype.slice.call(arguments, 1)
    // 需要深拷贝一份出来，否则如果有once，函数执行了，移除了函数，会导致后面紧跟的函数执行不到，索引少了一位
    let arr = []
    for (let i = 0; i < this.emitters[eventName].length; i++) {
      arr.push(this.emitters[eventName][i])
    };
    arr.forEach(fn => fn.apply(this, args))
  }
}


let emitter = new Emitter()

const fn = function (msg, msg2) { console.log(msg, msg2); }

emitter.on('event', fn)
emitter.on('event', fn)
emitter.on('event', fn)
emitter.once('event', fn)
emitter.on('event', fn)
emitter.once('event', fn)
emitter.on('event', fn)
emitter.on('event', fn)

// emitter.on('event1', function (msg, msg2) { console.log(msg, msg2); })

// emitter.off('event', fn)


setInterval(() => {
  emitter.emit('event', 'msg1', 'msg2')
  console.log('----------------------');
}, 1000);
// emitter.emit('event1', 'msg111', 'msg2222')
