import { observable, autorun, action, computed, decorate } from "mobx";
import { Provider } from "react-redux";

class Person {
  name = "John"
  age = 42
  showAge = false

  // 计算属性:
  get labelText () {
    return this.showAge ? `${this.name} (age: ${this.age})` : this.name;
  }
  // 动作:
  setAge (age) {
    this.age = age;
  }
}

decorate(Person, {
  name: observable,
  age: observable,
  showAge: observable,
  labelText: computed,
  setAge: action
})




class Counter {
  count = 0
  increment () {
    this.count++
  }
  decrement () {
    this.count--
  }
}

decorate(Counter, {
  count: observable,
  increment: action,
  decrement: action
})

// 实例化，然后导出
const person = new Person()
const counter = new Counter()

// autorun在初始化时会执行一次，且
// 当函数中用到的值发生了变化时，也会执行，可以在autorun里面进行副作用操作，网络请求等，但是如果是初始化请求的话不要依赖别的值，会导致重复请求 
// autorun函数返回一个取消函数，调用之后就不会再继续执行了，在这里导出了，在mobxTest里使用了，只要调用了dispose，这个autorun就不起作用了
export const dispose = autorun(() => {
  console.log(111, counter.count);
  fetch('https://baihuzi.com:5443/houses?cityId=AREA%7Cdbf46d32-7e76-1196&start=21&end=40')
    .then(res => res.json())
    .then(data => { return data })
})


autorun(() => {
  console.log(222);
})

export default { person, counter }

// 在这里导出，在项目index文件里
// import mobxStore from './components/mobx'
// import { Provider } from 'mobx-react'

{/* <Provider {...mobxStore}></Provider> */ }