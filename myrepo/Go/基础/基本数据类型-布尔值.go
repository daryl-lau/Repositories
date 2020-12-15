package main

import "fmt"

func main() {
	// 布尔类型，零值进行初始化
	var isTrue bool = true
	fmt.Println(isTrue)
	// %T 可以打印值类型
	fmt.Printf("%T %t", isTrue, isTrue)
}
