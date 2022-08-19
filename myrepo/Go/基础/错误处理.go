package main

import (
	"errors"
	"fmt"
)

// go标准建议显式的将错误信息返回给开发者，由调用者自行处理
// 返回错误一般有两种方法，如fact函数中注释处的用法

func fact(n int64) (int64, error) {
	if n < 0 {
		return 0, fmt.Errorf("计算错误") // 和下面的方式一样
	}

	if n == 0 || n == 1 {
		return 1, nil
	}

	r, err := fact(n - 1)
	if err == nil {
		return n * r, nil
	}
	return 0, errors.New("计算错误") // 和上面的方式一样
}

// panic 抛出错误，通过panic抛出的错误，程序将直接终止，如果错误是一个可恢复的，我们需要保持程序运行，还是需要对错误进行手动处理
// 此时我们还是需要将其转换成为error的方式，通过defer函数调用和recover恢复函数执行，可以将其转换，是一种常见的方式

func fact1(n int64) int64 {
	if n < 0 {
		panic("n不能小于0")
	}

	if n == 0 || n == 1 {
		return 1
	}

	return n * fact1(n-1)
}

func main() {

	r, err := fact(5)
	fmt.Printf("%v %v\n", r, err) // 120 nil

	r1, err1 := fact(-1)
	fmt.Printf("%v %v\n", r1, err1) // 0 计算错误

	fact1(-1) // 直接调用，此时程序会直接终止
}
