package main

import "fmt"

func main() {
	var name1 string = "jerry \n tom"
	var name2 string = `jerry \n tom` // 原样字符串
	fmt.Println(name1, name2)

	// 字符串比较
	var (
		s1 string = "123abc"
		s2 string = "123acc"
	)

	fmt.Println(s1 > s2) // false，字符串比较会先将字符串按字母逐个比较，比较的是字母转换的ASCII码

	s3 := "hello,"
	s4 := "world!"
	fmt.Println(s3 + s4)

	// 字符串相加只能操作字符串，不能操作别的数据类型，不像js会进行隐式的类型转换，go语言中没有隐式类型转换
	// fmt.Println("hello" + 123) // 报错：invalid operation: "hello" + 123 (mismatched types untyped string and untyped int)
}
