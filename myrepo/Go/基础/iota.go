package main

import "fmt"

func main() {
	// 在文件中使用的 const 来模拟枚举，每次都要定义一个数，非常累赘;
	// 这里可以引入一个 iota 变量，这个变量有个特点就是在【同一个小括号内】，每调用一次，就会+1，类似一个每次+1的生成器;
	const (
		SUNDAY = iota
		MONDAY
		TUESDAY
		WEDNESDAY = iota
		THURSDAY
		FRIDAY
		SATURDAY
	)
	fmt.Println(SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY)
}
