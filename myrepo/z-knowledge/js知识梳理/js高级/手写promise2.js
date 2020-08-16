class Promise {
  constructor(exector) {
    this.state = 'pending'
    this.value = undefined
    this.error = undefined
    this.resolveCallbacks = []
    this.rejectCallbacks = []
    this.resolve = (value) => {
      this.state = 'fulfilled'
      this.value = value
      this.resolveCallbacks.forEach(fn => fn())
    }
    this.reject = (err) => {
      this.state = 'rejected'
      this.error = err
      this.rejectCallbacks.forEach(fn => fn())
    }

    try {
      exector(this.resolve, this.rejects)
    } catch (error) {
      this.reject(err)
    }
  }

  then (resolveCallback, rejectCallback) {
    return new Promise((resolve, reject) => {
      if (this.state === 'pending') {
        this.resolveCallbacks.push(() => {
          let x = resolveCallback(this.value)
          resolve(x)
        })
        this.rejectCallbacks.push(() => {
          let x = rejectCallback(this.value)
          reject(x)
        })
      }
      if (this.state === 'fulfilled') {
        let x = resolveCallback(this.value)
        resolve(x)
      }
      if (this.state === 'rejected') {
        let x = rejectCallback(this.value)
        reject(x)
      }
    })
  }
}


let p = new Promise((resolve, reject) => {
  setTimeout(() => { resolve(111) }, 1000)
  // resolve(111)
})
p.then((data) => { console.log(data); return data + 'new' }, (err) => { console.log(err); })
  .then((data) => { console.log(data); return data + 'new' })
  .then((data) => { console.log(data); return data + 'new' })
  .then((data) => { console.log(data); return data + 'new' })
  .then((data) => { console.log(data); })