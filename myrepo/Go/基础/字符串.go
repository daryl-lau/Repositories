package main

import (
	"fmt"
	"strconv"
	"unicode/utf8"
)

func main() {

	// 一个中文字符占三个字节，英文符占一个字节
	str := "我不是药神!!!"

	fmt.Println(len(str))                    // 18  len() 返回的是字节长度
	fmt.Println(utf8.RuneCountInString(str)) // 8	utf8.RuneCountInString() 返回的是码点长度

	for index := range str {
		fmt.Println(index)
	}
	// 0
	// 3
	// 6
	// 9
	// 12
	// 15
	// 16
	// 17

	// 字符串连接
	str1 := str + "真好看！"
	fmt.Println(str1) // 我不是药神!!!真好看！

	// 通过索引获取字符串，获取到的是unicode码点
	fmt.Println(str[16])         // 33
	fmt.Printf("%c \n", str[16]) // !

	for i, v := range str {
		fmt.Printf("%d %c \n", i, v)
	}
	// 0 我
	// 3 不
	// 6 是
	// 9 药
	// 12 神
	// 15 !
	// 16 !
	// 17 !

	// 字符串切片，可以将字符串转换为byte slice 或者rune slice
	byteStr := []byte(str)
	runeStr := []rune(str)
	fmt.Println(byteStr) // [230 136 145 228 184 141 230 152 175 232 141 175 231 165 158 33 33 33]  长度对应len()所获取的长度
	fmt.Println(runeStr) // [25105 19981 26159 33647 31070 33 33 33]	长度对应utf8.RuneCountInString()获取的长度

	fmt.Println(string(byteStr)) // 我不是药神!!!
	fmt.Println(string(runeStr)) // 我不是药神!!!

	charactor := []byte{230, 136, 145}
	fmt.Println(string(charactor)) // 我

	// 字符串转换
	// 数字 <=> 字符串
	r, err := strconv.Atoi("123")
	if err == nil {
		fmt.Printf("%T %v \n", r, r) // int 123
	}

	r1 := strconv.Itoa(456)
	fmt.Printf("%T %v \n", r1, r1) // string 456

	var bstring []byte = []byte("我爱中国")
	fmt.Println(bstring)

	var s []byte = make([]byte, 5)
	fmt.Println(strconv.Atoi(string(s)))
}
