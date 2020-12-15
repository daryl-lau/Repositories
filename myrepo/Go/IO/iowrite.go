package main

import "fmt"

func main() {
	name := "jerry"
	age := 18
	weight := 59.3
	percent := 20.32
	// Println 会换行，并且逗号之间会有空格
	fmt.Println("姓名", name)
	fmt.Println("年龄", age)

	// Print 不会换行
	fmt.Print("姓名", name)
	fmt.Print("年龄", age)

	// Printf 模板字符串，后面的变量依次占位，类型要选择正确
	// %s 		字符串
	// %[n]d 	数字		n 表示宽度
	// %f 		浮点		%[w].[p]f , w表示宽度，p表示小数点后取几位
	// % 		转义符		%% 原样输出%
	fmt.Printf("姓名：%s, 年龄：%5d, 体重：%.2f, 体脂率：%%%.2f", name, age, weight, percent)
}
