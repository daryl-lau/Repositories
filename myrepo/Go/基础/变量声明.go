package main

import (
	"fmt"
)

// 全局变量
// 局部变量声明了可以不使用
var name string = "jerry"

// 同时声明多个变量
var (
	height int = 170
	weight int = 60
)

// 变量短声明，变量短声明只能在函数内部声明，不能在函数外声明
// 报错：syntax error: non-declaration statement outside function body
// phone := "123456789"

// 类型推导，忽略类型，go会根据赋值进行类型推导
var wechat = "baihuzi"

// 连续声明变量，所有的变量都需要是int类型
var x, y, z int = 2, 3, 4

// 不指定类型，可以赋值为不同的数据类型
var a, b, c = 10, "123", true

func main() {
	// 局部变量，在函数体内声明的变量是局部变量
	// 局部变量必须使用，否则报错 xxxxx declared but not used
	var age int = 18

	// 变量短声明，变量短声明只能在函数内部声明，不能在函数外声明
	// 变量短声明不能指定类型，类型都是通过推导出来
	gender := "male"

	// 连续短声明
	top, left := 20, 30

	// 变量重新赋值，只能在函数体中进行，不行在函数体外进行
	wechat = "123"

	fmt.Println(name, age, gender, wechat)
	fmt.Println(x, y, z)
	fmt.Println(a, b, c)
	fmt.Println(left, top)
}
