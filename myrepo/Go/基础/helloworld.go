// package 声明包，package main 声明 main 包
// 每一个源文件都有一个所属的包
// main 表示这个文件是需要编译成为可执行的二进制程序
package main

// 导入fmt包，调用上面的Println方法
import (
	"fmt"
)

// main 函数是二进制程序的入口
func main() {
	fmt.Println("hello, world!")
}
