class Promise {
  constructor(executor) {
    // 内部状态
    this.state = 'pending'

    // 成功的值
    this.value = undefined

    // 失败的值
    this.error = undefined

    // 成功回调
    this.resolvedCallbacks = []

    // 失败回调
    this.rejectedCallbacks = []

    this.resolve = (value) => {
      this.state = 'fulfilled'
      this.value = value
      this.resolvedCallbacks.forEach(fn => fn())
    }

    this.reject = (error) => {
      this.state = 'rejected'
      this.error = error
      this.rejectedCallbacks.forEach(fn => fn())
    }

    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  then (resolvedCallback, rejectedCallback) {

    resolvedCallback = typeof resolvedCallback === 'function' ? resolvedCallback : v => v
    rejectedCallback = typeof rejectedCallback === 'function' ? rejectedCallback : v => v

    let promise2;
    promise2 = new Promise((resolve, reject) => {
      if (this.state == 'pending') {
        this.resolvedCallbacks.push(() => {
          let x = resolvedCallback(this.value)
          this.resolvePromise(promise2, x, resolve, reject)
        })
        this.rejectedCallbacks.push(() => {
          let x = rejectedCallback(this.error)
          this.resolvePromise(promise2, x, resolve, reject)
        })
      }
      if (this.state == 'fulfilled') {
        let x = resolvedCallback(this.value)
        this.resolvePromise(promise2, x, resolve, reject)
      }
      if (this.state == 'rejected') {
        let x = rejectedCallback(this.error)
        this.resolvePromise(promise2, x, resolve, reject)
      }
    })

    return promise2
  }

  resolvePromise (promise2, x, resolve, reject) {
    if (promise2 === x) return reject(new Error('循环引用了'))

    if (x instanceof Promise) {
      x.then((data) => { resolve(data) }, (err) => { reject(err) })
      return
    }

    if (x && typeof x !== 'object' && typeof x !== 'function') {
      resolve(x)
    } else {
      if (typeof x === 'function') {
        try {
          resolve(x(this.value))
        } catch (err) {
          reject(err)
        }
      } else if (typeof x === 'object' && x.then) {
        x.then.call(x, (data) => { resolve(data) }, (err) => { reject(err) })
      }
    }
  }
}


let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(111)
  }, 1000)
  // setTimeout(() => {
  //   reject(111)
  // }, 1000);
  // resolve(111)
  // reject(111)
  // throw new Error('出错了')
})
p.then((data) => {
  console.log(data)
  return data + 'new'
  // return new Promise((resolve, reject) => {
  //   resolve(data + 'new')
  // })
  // return (data) => { return data + 'new'; }
  // return { then: (resolve, reject) => { resolve(data + 'new') } }
}, (err) => { console.log('err', err) })
  .then((data) => { console.log(data); })
