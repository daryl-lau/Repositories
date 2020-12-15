package main

import "fmt"

func main() {
	// 整型，在 go 中，有多个整型 int int8 int16 等，根据二进制位数来区分，有符号整型二进制第一位是符号位，1表示负数，0表示正数
	// uint8 表示无符号整型，只取正整数 unit8取值范围 0-255，nit8取值范围 -128-127
	// 可以使用不同的进制表示数字
	// int 和 uint 如果不指定具体的位数，则根据操作系统的来，32位操作系统就是32位，64位操作系统就是64位
	var (
		d1 int   = -18
		d2 uint8 = 254
		d3 int   = 0b1010 // 二进制表示
		d4 int   = 012    // 8进制表示
		d5 int   = 0xA    // 16进制表示
		d6 byte  = 'a'    // byte 表示字节，单引号里面是字符或者码点
		d7 rune  = '赞'    // unicode编码
	)
	// 以上这些都属于整型，不论多少进制，都是属于整型
	fmt.Printf("%T, %d \n", d1, d1)
	fmt.Printf("%T, %d \n", d2, d2) // %d 表示十进制
	fmt.Printf("%T, %b \n", d3, d3) // %b 表示二进制
	fmt.Printf("%T, %o \n", d4, d4) // %o 表示8进制
	fmt.Printf("%T, %x \n", d5, d5) // %x 表示16进制
	fmt.Printf("%T, %c \n", d6, d6) // %c 表示字符
	fmt.Printf("%T, %q \n", d7, d7) // %q 表示带引号的字符
}
