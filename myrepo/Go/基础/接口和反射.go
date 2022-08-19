package main

import "fmt"

// 定义一个接口，只定义有哪些方法签名和返回值
type HumanInterface interface {
	Run()
	SaySomething(string) string
}

// 实现一个接口，只需实现HumanInterface接口中所定义的方法即可，并且和接口HumanInterface在语法上没有直接关联，即鸭子类型，只需要实现相关的方法，即可认为此实现是是实现的HumanInterface接口
type HumanTypeOne struct{}

func (t HumanTypeOne) Run() {
	fmt.Println("Run HumanTypeOne")
}

func (t HumanTypeOne) SaySomething(str string) string {
	return str
}

type HumanTypeTwo struct{}

func (t HumanTypeTwo) Run() {
	fmt.Println("Run HumanTypeTwo")
}

func (t HumanTypeTwo) SaySomething(str string) string {
	return str
}

type HumanTypeThree struct{}

func (t *HumanTypeThree) Run() {
	fmt.Println("Run HumanTypeThree")
}

func (t *HumanTypeThree) SaySomething(str string) string {
	return str
}

type HumanTypeFour struct{}

func (t *HumanTypeFour) Run() {
	fmt.Println("Run HumanTypeFour")
}

func (t HumanTypeFour) SaySomething(str string) string {
	return str
}

type HumanTypeFive struct {
	Type string
}

func (t HumanTypeFive) Run() {
	fmt.Println("Run HumanTypeFive")
}
func (t HumanTypeFive) SaySomething(str string) string {
	return str
}

func main() {

	// 定义一个接口实例变量，类型为接口，值为接口的实现，该变量可以调用接口的实现上的方法
	var h1 HumanInterface = HumanTypeOne{}
	h1.Run()
	s1 := h1.SaySomething("你好, 我是h1")
	fmt.Println(s1)

	// 如果接口接收者是一个值类型，那么可以使用值类型或者指针类型进行调用
	var h2 HumanInterface = HumanTypeTwo{}
	h2.Run()
	s2 := h2.SaySomething("你好, 我是h2")
	fmt.Println(s2)

	var h21 HumanInterface = &HumanTypeTwo{}
	h21.Run()
	s21 := h21.SaySomething("你好, 我是h21")
	fmt.Println(s21)

	// 如果接收者是一个指针类型，那么可以指针进行调用，不能使用值类型调用
	// var h2  HumanInterface = HumanTypeThree{}  这里报错
	var h3 HumanInterface = &HumanTypeThree{}
	h3.Run()
	s3 := h3.SaySomething("你好, 我是h3")
	fmt.Println(s3)

	// 如果接口实现中既有接收者既有值类型，又有指针类型，那么只能使用引用类型调用
	// var h4 HumanInterface = HumanTypeFour{} 这里报错
	var h4 HumanInterface = new(HumanTypeFour)
	h4.Run()
	s4 := h4.SaySomething("你好, 我是h4")
	fmt.Println(s4)

	// 类型断言，可以理解为通过接口的类型，反查结构体,    接口变量.(T)
	var persistent HumanInterface = HumanTypeFive{Type: "monkey"}
	p, err := persistent.(HumanTypeFive)
	fmt.Println(p, err) // {monkey} true

	var intInterface interface{}
	var a int = 10
	intInterface = a // 空接口可以接收任意数据类型
	b, err := intInterface.(int)
	fmt.Println(b, err) // 10 true

}
