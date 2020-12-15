package main

import "fmt"

const created int = 1

/*
 * const 声明常量，如果第在同一个小括号内，常量没有初始化赋值，则沿用前一个常量的初始值
 * 如果前面没有初始值的常量，则报错 missing value in const declaration
 * 常量一经初始化，则不允许修改
 * 这一特性只适用常量，不适用变量
 */
const (
	deleted int = 2
	updated
	selected
	a string = "aaa"
	b
	c
)

func main() {
	fmt.Println(created, deleted, updated, selected, a, b, c) // 1 2 2 2 aaa aaa aaa
}
