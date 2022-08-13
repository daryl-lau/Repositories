package people

import "fmt"

// 无论是结构体本身的名称，还是其中定义的属性，都遵循大写包外可见，小写包外不可见特性
type People struct {
	Gender string
	Height int
	Weight int
}

// 由于包外可见特性，如果我们需要创建包内可见的结构体，则需要定义函数去进行修改
// 注意通过函数创建的结构体，属性在包外的可见性，依旧遵循上述包外可见规则
type people1 struct {
	gender string
	height int
	weight int
}

func NewPeople1(gender string, height int, weight int) people1 {
	return people1{
		gender: gender,
		height: height,
		weight: weight,
	}
}

// 如果想要访问或者修改包内可见的结构体属性，还是需要借助函数来进行,
// 入参类型需要是一个指针，否则也无法修改，因为go语言中的函数入参传递是值传递，会对入参进行拷贝，修改的不是同一个结构体
func SetHeight(p *people1, height int) {
	p.height = height
}

// 除了上述方式之外，通常我们可以定义一个方法，使用.的方式去访问或者修改包内可见的属性
// 此时会把a.GetWeight的a作为值拷贝传递给p， 如果接收者是一个值类型，但是调用者是一个指针：(*a).SetWeight  <=>  a.SetWeight
func (p people1) GetWeight() int {
	return p.weight
}

// 如果接收者是一个指针类型，但是调用者是一个值类型，需要使用这种方式调用(&a).SetWeight，但是这样写有点麻烦，此时go中有一个语法糖，可以直接使用a.SetWeight，即  (&a).SetWeight  <=>  a.SetWeight
func (p *people1) SetWeight(w int) {
	p.weight = w
}

// 如果在方法内部不需要访问实例属性，则可以省略接收者，只定义类型，例如
func (people1) Print() {
	fmt.Println("dididi")
}
