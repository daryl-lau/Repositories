let s1 = "get-element-by-id"  // 转化为 getElementById

function toCase (s) {
  return s.replace(/-\w/g, itme => itme.slice(1).toUpperCase())
}

let res = toCase(s1)
console.log(res);