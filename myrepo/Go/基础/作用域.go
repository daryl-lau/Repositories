package main

import "fmt"

var name string = "jerry"

// go 语言是块级作用域，作用域查找规则从下往上找，如果整个全局包括go语言内置的变量都没有的话，则报错
// go 语言中不存在像js语言那种变量提升，在当前作用域中找不到就向上找，也不存在什么暂存死区
func main() {
	fmt.Println(name) // jerry， 这里找到的是文件级别作用域的name
	{
		name = "tom"      // 这里修改的是文件级别作用域的name
		fmt.Println(name) // tom 因为当前代码块中没有name变量，则向上找到了文件级别的全局变量
	}
	fmt.Println(name) // tom 因为当前代码块中没有name变量，则向上找到了文件级别的全局变量
	{
		name := "jack"    // 这里在这个作用域内定义了一个局部变量
		fmt.Println(name) // jack 这里找到的是当前作用域中的name变量
		name = "rose"     // 这里修改的也是当前作用域中的name变量
		fmt.Println(name) // rose 这里找到的还是当前作用域中的name变量
	}
	fmt.Println(name) // tom， 这里找到的文件级别全局作用域的name变量
}
