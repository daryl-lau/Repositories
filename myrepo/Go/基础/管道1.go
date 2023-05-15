package main

import (
	"fmt"
)

func main() {

	// 随机打印10次0或1
	zero := make(chan int)
	one := make(chan int)

	go func() {
		for i := 0; i < 5; i++ {
			zero <- 0
		}
	}()
	go func() {
		for i := 0; i < 5; i++ {
			one <- 1
		}
	}()
	for i := 0; i < 10; i++ {
		select {
		case v := <-zero:
			fmt.Println(v)
		case v := <-one:
			fmt.Println(v)
		}
	}
}
