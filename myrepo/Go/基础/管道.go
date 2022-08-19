package main

import (
	"fmt"
	"time"
)

func main() {
	// 不带缓冲区的管道 make(chan T)  T无限制，但是一般存放值类型，因为放入引用类型的话，可能会对原本的值进行修改
	// 有对管道的读,就要有对管道的写,否则会出现死锁m，类似于消费者模式，管道中的值消费完了，但是没有了生产者提供数据，就会造成死锁
	// 读语法 <-channel
	// 写语法 channel <- 1
	// 读管道会检查有没有写入goroutin，如果有，则会进行等待

	channel := make(chan int)
	go func() {
		time.Sleep(time.Second)
		channel <- 1
	}()
	go func() {
		time.Sleep(time.Microsecond)
		channel <- 2
	}()
	fmt.Println(<-channel) // 2 因为2先放入队列
	fmt.Println(<-channel) // 1
	// fmt.Println(<-channel) 再打印一下，就会死锁

	// 带缓冲区的管道 make(chan T, Size)，Size表示长度
	// 比如Size是3，可以往管道中写入3个值，如果没有读取管道，写入的值超出了3的限制，则会造成死锁
	// 如果使用不带缓冲的管道，写入管道如果没有读取，则会造成死锁，而带缓冲的管道，写入如果没有超出size，即使没有读也不会造成死锁，而当写入超出了size，才会造成死锁，这是他们的区别之一
	channel2 := make(chan int, 3)
	channel2 <- 1
	channel2 <- 2
	channel2 <- 3
	// channel2 <- 4 再写入值则会造成死锁

	// 再读取管道的时候，如果检测到有其他例程有对该管道进行写，读取管道则会等待写入完之后，再读取，后面的代码也会阻塞，直到读取成功
	// 下面的代码，等待1秒后打印123，再写入管道2，再打印456，主例程有读取管道，会等待例程写入后读取，然后再执行后面代码
	channel3 := make(chan int)
	go func() {
		time.Sleep(time.Second)
		fmt.Println(123)
		channel3 <- 2
		fmt.Println(456)
	}()
	fmt.Println(<-channel3)
	fmt.Println(123123)

	// close() 可以关闭一个chan，当chan关闭后，可以继续读取chan，但是返回的是零值，并且第二个返回参数是false（正产的是true）
	// 不能对已关闭的chan进行写，但是可以读
	channel4 := make(chan int)
	go func() {
		time.Sleep(time.Second)
		i1, ok := <-channel4
		fmt.Println(i1, ok)
		fmt.Println("555")
		i2, ok := <-channel4
		fmt.Println(i2, ok)
		fmt.Println("666")
	}()
	channel4 <- 4
	close(channel4)
	time.Sleep(time.Second * 5)
	fmt.Println("channel4")

	// 不能在同一个例程中对同一个管道同时进行读写操作，否则造成死锁
	// channel5 := make(chan int)
	// fmt.Println(<-channel5)
	// channel5 <- 1000

	// 为防止管道误读或者误写，可以声明管道只读或者只写
	// 不能直接声明一个只读或者只写的管道，因为这样做没有意义，一般用于函数传参，限制函数内部对管道的只读或者只写
	channel6 := make(chan int)
	var readOnlyChannel <-chan int = channel6
	var writeOnlyChannel chan<- int = channel6
	fmt.Println(readOnlyChannel, writeOnlyChannel)
}
