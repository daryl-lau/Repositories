package main

import (
	"fmt"
	"time"
)

func main() {
	channel1 := make(chan int)
	channel2 := make(chan int)

	go func() {
		time.Sleep(3 * time.Second)
		channel1 <- 3
		channel1 <- 2
	}()

	fmt.Println("start")

	// 读取管道中的内容，当case中的任意一个读取到了结果，就直接打印，并继续执行代码
	// 如果所有case的管道中没有一直没有写入，则会一直等待
	// 如果有default，则不会进行等待，执行default中的代码，如果其他case中的管道先与default读取到了数据，则执行该case中的代码

	// select语句中除default外，每个case操作一个channel，要么读要么写
	// select语句中除default外，各case执行顺序是随机的
	// select语句中如果没有default语句，则会阻塞等待任一case
	// select语句中读操作要判断是否成功读取，关闭的channel也可以读取
	select {
	case v, ok := <-channel1:
		fmt.Println(v, ok)
	case v, ok := <-channel2:
		fmt.Println(v, ok)
	default:
		fmt.Println("default")
	}
	fmt.Println("end")

	// 一般配个for循环使用，随机打印10个01
	zero := make(chan int)
	one := make(chan int)

	go func() {
		for i := 0; i < 5; i++ {
			zero <- 0
		}
	}()
	go func() {
		for i := 0; i < 5; i++ {
			zero <- 1
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
