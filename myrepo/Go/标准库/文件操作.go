package main

import (
	"fmt"
	"io"
	"os"
)

func main() {

	// 读取文件，根据可执行文件所在的目录查找文件
	// 先定义一个容器，读取文件按照字节放到该容器中，每读取一次，就往里填充，container不会重置，直接进行覆盖填充
	// 返回读取进去的长度，以及err，只要有读取到内容，则返回nil，如果没有读取到内容，则返回io.EOF

	container := make([]byte, 3)
	const path = "./file.txt"

	fileHandle, err := os.Open(path)
	if err != nil {
		fmt.Println("打开文件错误")
	} else {
		defer fileHandle.Close()
		for {
			n, err := fileHandle.Read(container)
			fmt.Println(container, n, err)
			if err == io.EOF {
				break
			}
		}
	}

	// 写入文件
	const writePath = "./fileWrite.txt"
	fileHandle1, err := os.Create(writePath) // Create 如果没有原文件，则创建，如果有则清空源文件
	defer fileHandle1.Close()
	n, err := fileHandle1.Write([]byte("123"))
	n, err = fileHandle1.Write([]byte("456"))
	fmt.Println(n, err)

}
