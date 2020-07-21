

interface JJ {
  jjSize: string
  jjLength: number
}

// 泛型约束,必须要包含JJ中的属性
function create<T extends JJ>(what: T): T {
  return what
}

create({
  name: 'Jack',
  age: 18,
  jjSize: 'large',
  jjLength: 18
})

// 这里将会报错，因为传入参数必须要包含JJ中的属性
create({
  name: 'Jack',
  age: 18
})