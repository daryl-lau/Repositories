package main

import (
	"context"
	"fmt"
	"time"
)

func main() {

	// context 可以在不同例程间共享状态
	// context.WithCancle 返回一个ctx对象和cancle，cancle需要手动调用，
	// ctx.Done()返回一个管道，当ctx手动调用cancle的时候，此管道就可以读取内容了
	ctx, cancle := context.WithCancel(context.Background())

	go func() {
		cancle()
	}()

	go func() {
		select {
		case v, ok := <-ctx.Done():
			fmt.Println("Interuped WithCancel", v, ok)
		}
	}()

	// context.WithTimeout 可以传一个时间，时间到了自动写入管道
	ctx1, _ := context.WithTimeout(context.Background(), time.Millisecond)
	go func() {
		select {
		case v, ok := <-ctx1.Done():
			fmt.Println("Interuped WithTimeout", v, ok)
		}
	}()

	ctx2, _ := context.WithDeadline(context.Background(), time.Now().Add(time.Second*1))
	go func() {
		select {
		case v, ok := <-ctx2.Done():
			fmt.Println("Interuped WithDeadline", v, ok)
		}
	}()

	time.Sleep(time.Second * 2)
	fmt.Println("end")
}
