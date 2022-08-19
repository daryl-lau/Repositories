package main

import (
	"fmt"
	"sync"
	"time"
)

func downloadFile(wg *sync.WaitGroup, name string, path string) {
	defer wg.Done()
	time.Sleep(10 * time.Millisecond)
	fmt.Println("下载" + name + " " + path)
}

func main() {
	// 请求100个文件

	wg := sync.WaitGroup{}

	start := time.Now()
	for i := 0; i <= 100; i++ {
		wg.Add(1)
		go downloadFile(&wg, fmt.Sprintf("%d.jpg", i), fmt.Sprintf("https://image.aaa.com/%d.jpg", i))
	}

	wg.Wait()

	fmt.Println(time.Now().Sub(start))
}
