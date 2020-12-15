package main

import "fmt"

func main() {
	// go 语言中不会对变量进行类型转换，需要自己手动转换
	// 例如 int 和 int8 相加时，就不能相加，需要转换成一致的类型
	var (
		d1 int  = 10
		d2 int8 = 10
	)
	// fmt.Println(d1 + d2) // 报错：invalid operation: d1 + d2 (mismatched types int and int8)

	// 上面会报错，因为 int 类型和 int8 类型不能直接相加，需要进行转换，例如
	fmt.Println(d1 + int(d2))
	fmt.Println(int8(d1) + d2)

	// 注意！在转换的时候，如果是把范围大的类型转换为范围小的类型，需要注意转换的范围是否合适
	// 例如 int 转 int8，64位系统 int 有64位，取值很大，而 int8 只能取 -128-127，如果 int 类型的数字为1000，转为 int8 结果就不对，短的位会进行截取
	var (
		d3 int  = 1000
		d4 int8 = 100
	)
	fmt.Println(int8(d3) + d4) // 76 这里的结果是76，而不是1100，因为 1000 转int8 的结果并不是1000. int8 最大只能取值127
	fmt.Println(int8(d3))      // 1000 int 类型转 int8 类型的值为 -24
}
