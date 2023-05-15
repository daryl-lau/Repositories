package main

import (
	"fmt"
	"reflect"
)

type myInt int

func main() {
	var int1 int = 10
	var int2 myInt = 20

	fmt.Println(reflect.TypeOf(int1)) // int
	fmt.Println(reflect.TypeOf(int2)) // main.myInt

	fmt.Println(int1, int2) // 10 20
	// int2 = int1             // 编译报错 cannot use int1 (variable of type int) as myInt value in assignment

	// 可以通过类型转换来进行赋值
	var int3 myInt
	int3 = myInt(int1)
	fmt.Println(int3)
}
