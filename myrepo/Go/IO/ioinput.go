package main

import "fmt"

func main() {
	var name string
	var age int
	fmt.Print("请输入你的名字：")
	fmt.Scan(&name) // fmt.Scan 会挂起程序的运行，等待用户输入，变量需要提前声明，&name 是一个指针，把用户的输入赋值给变量，在下面就可以使用变量
	fmt.Print("请输入你的年龄：")
	fmt.Scan(&age) // 用户的输入需要符合声明的变量类型，否则程序会自动进行类型转换
	fmt.Printf("姓名：%s，年龄：%d", name, age)
}
