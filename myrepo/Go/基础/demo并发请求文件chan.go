package main

import (
	"fmt"
	"sync"
	"time"
)

func downloadFile(name string, path string) {
	time.Sleep(10 * time.Millisecond)
	fmt.Println("download " + name + " from " + path)
}

type File struct {
	Name string
	Path string
}

func main() {
	// 请求100个文件

	start := time.Now()
	wg := sync.WaitGroup{}
	chanCount := 10

	channel := make(chan File, chanCount)

	wg.Add(1)
	go func(channel chan<- File) { // 限制channel只能进行写
		defer wg.Done()
		for i := 1; i <= 100; i++ {
			channel <- File{Name: fmt.Sprintf("%d.jpg", i), Path: fmt.Sprintf("https://image.aaa.com/%d.jpg", i)}
		}
		close(channel)
	}(channel)

	for i := 0; i < chanCount; i++ {
		wg.Add(1)
		go func(channel <-chan File) { // 限制channel只能进行读
			defer wg.Done()
			for f := range channel {
				downloadFile(f.Name, f.Path)
			}
		}(channel)
	}

	wg.Wait()
	fmt.Println(time.Now().Sub(start))
}
