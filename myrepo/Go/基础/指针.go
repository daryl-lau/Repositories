package main

import (
	"fmt"
)

func main() {
	// 对于数字这种数据类型，当使用一个变量接收另一个变量时，会在内存中开辟一块新的内存地址用来保存，从而无法修改原始变量

	var num int = 100
	var num1 int = num

	num1 = 200

	fmt.Println(num, num1) // 100 200

	num3 := 500
	var num4 *int = &num3 // *int 表示指针类型  同理  *string 也是，在类型前加上*即表示指针  &可以拿到一个变量的指针
	*num4 = 600
	fmt.Println(num3, *num4) // 600 600

	// 可以申请一个空指针，用来存储数据
	num5 := new(int)         // num5此时是一个指针  *int类型，默认是零值 0
	fmt.Println(num5, *num5) // *int 0
	*num5 = 999
	fmt.Println(num5, *num5) // *int 999

	str1 := new(string)
	fmt.Println(str1, *str1) // *string   ""
}
