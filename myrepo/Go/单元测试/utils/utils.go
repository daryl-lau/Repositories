package utils

import (
	"errors"
	"fmt"
	"strconv"
)

func Add(a, b int) int {
	return a + b
}

func Minus(a, b int) int {
	return a - b
}

func Muti(a, b int) int {
	return a * b
}

func Divi(a, b int) int {
	return a / b
}

func Fact(n int64) (int64, error) {
	if n < 0 {
		return 0, fmt.Errorf("计算错误") // 和下面的方式一样
	}

	if n == 0 || n == 1 {
		return 1, nil
	}

	r, err := Fact(n - 1)
	if err == nil {
		return n * r, nil
	}
	return 0, errors.New("计算错误") // 和上面的方式一样
}

func Int2StrV1(i int) string {
	return fmt.Sprintf("%v", i)
}

func Int2StrV2(i int) string {
	return strconv.Itoa(i)
}

func init() {
	fmt.Println("123123123")
}
