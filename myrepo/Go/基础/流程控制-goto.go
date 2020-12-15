package main

import "fmt"

func main() {
	// goto 表示代码运行过程中跳转到哪里，START 和 END 不是固定的，可以自己取值
	sum := 0
	index := 1
START:
	if index > 100 {
		goto END
	}
	sum += index
	index++
	goto START
END:
	fmt.Println(sum)
}
