package main

import (
	"fmt"
	"sync"
)

func PrintChar(wg *sync.WaitGroup, flag string) {
	defer wg.Done()
	for i := 'A'; i <= 'Z'; i++ {
		fmt.Printf("%s %c \n", flag, i)
	}
}

func main() {
	// main函数由go调度器创建例程进行执行 => 主例程
	// 自己用go+函数调用创建的例程 => 工作例程
	// 当主例程执行完成，自动结束所有工作例程
	// 等待工作例程结束后再让主例程退出，主例程需要等待某几个或所有的工作例程结束
	var wg sync.WaitGroup
	wg.Add(3)
	go PrintChar(&wg, "F1")
	go PrintChar(&wg, "F2")
	go PrintChar(&wg, "F3")
	fmt.Println("start")
	wg.Wait()
	fmt.Println("end")

	// 如果多个例程对同一个变量或者数据进行修改，则需要加锁，否则可能导致数据异常
	i := 10
	var locker sync.Mutex
	go func() {
		locker.Lock()
		defer locker.Unlock()
		i += 2
	}()
	i /= 5
	fmt.Println(i)
}
