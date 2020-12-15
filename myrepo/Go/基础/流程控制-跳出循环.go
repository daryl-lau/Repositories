package main

import "fmt"

func main() {
	for i := 0; i <= 10; i++ {
		if i == 5 {
			break // break 跳出循环
		}
		fmt.Println(i)
	}
	fmt.Println("-----------------------")
	for j := 0; j <= 10; j++ {
		if j == 5 {
			continue // continue 跳出本次循环，开始下一次循环
		}
		fmt.Println(j)
	}
	fmt.Println("-----------------------")

	// 默认 break 只能跳出当前循环，不能跳出外级循环
	for k := 0; k <= 10; k++ {
		for u := 0; u <= 10; u++ {
			if u == 5 {
				break // continue 跳出本次循环，开始下一次循环
			}
			fmt.Println(k, u)
		}
	}

	fmt.Println("-----------------------")
	// 如果想要跳出外层循环，需要结合label
LOOP:
	for x := 0; x <= 10; x++ {
		for y := 0; y <= 10; y++ {
			if y == 5 {
				break LOOP // continue 跳出本次循环，开始下一次循环
			}
			fmt.Println(x, y)
		}
	}

	// 和js里面的一样
}
