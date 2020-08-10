// function debounce (func, time) {
//   let timer
//   return function (...args) {
//     if (timer) clearTimeout(timer)
//     timer = setTimeout(() => {
//       func.apply(this, ...args)
//     }, time)
//   }
// }
import { useRef, createRef } from 'react'

const useDebounce = (func, time) => {
  // return debounce(func, time)
  let timer = useRef()
  return function (...args) {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      func(...args)
    }, time)
  }
}

export default useDebounce