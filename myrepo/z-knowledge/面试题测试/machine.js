
function machine (person) {
  return new Person(person)
}

class Person {
  constructor(name) {
    this.name = name
    this.queue = []
    let promise = async () => { console.log(`start ${this.name}`); }
    this.queue.push(promise)
  }

  async execute () {
    while (this.queue.length) {
      const task = this.queue.shift()
      await task()
    }
  }

  do (event) {
    let promise = async () => { console.log(`${this.name} ${event}`); }
    this.queue.push(promise)
    return this
  }

  wait (delay) {
    const promise = async () => {
      console.log(`wait ${delay}s`)
      await new Promise(resolve => {
        setTimeout(resolve, delay * 1000)
      })
    }
    this.queue.push(promise)
    return this
  }

  waitFirst (delay) {
    const promise = async () => {
      console.log(`wait ${delay}s`)
      await new Promise(resolve => {
        setTimeout(resolve, delay * 1000)
      })
    }
    this.queue.unshift(promise)
    return this
  }
}
// machine('ygy').execute()
// start ygy
// machine('ygy').do('eat').execute();
// start ygy
// ygy eat
// machine('ygy').do('eat').wait(5).do('eeeeee').execute()
// start ygy
// wait 5s（这里等待了5s）
// ygy eat

machine('ygy').do('eeeeeeeeee').waitFirst(5).do('eat').execute();
// wait 5s
// start ygy
// ygy eat