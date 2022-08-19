package main

import (
	"fmt"
)

// panic 抛出错误，通过panic抛出的错误，程序将直接终止，如果错误是一个可恢复的，我们需要保持程序运行，还是需要对错误进行手动处理
// 此时我们还是需要将其转换成为error的方式，通过defer函数调用和recover恢复函数执行，可以将其转换，是一种常见的方式
// defer执行时机是其所在函数退出的时候执行，并且是一个堆栈解构，defer中的函数会存起来，当所在函数结束后，再取出来执行，由于是堆栈解构，先进后出，会优先执行代码上下文中靠后的defer调用

func fact(n int64) int64 {
	if n < 0 {
		panic("n不能小于0")
	}

	if n == 0 || n == 1 {
		return 1
	}

	return n * fact(n-1)
}

func warpedErrorFact(n int64) (r int64, err error) {
	defer func() {
		errMsg := recover()
		if errMsg != nil {
			err = fmt.Errorf("%v", errMsg)
		}
	}()
	r = fact(n)
	return
}

func main() {

	defer func() {
		fmt.Println("函数延迟执行1")
	}()
	defer func() {
		fmt.Println("函数延迟执行2")
	}()
	defer func() {
		fmt.Println("函数延迟执行3")
	}()

	// defer func() {
	// 	errMsg := recover() // recover恢复函数需要再defer函数内部调用，此时如果程序出错，则返回panic中的错误信息，如果没有出错，则返回nil，因此我们可以通过recover的返回值，模拟出result err := funcXXX()的形式
	// 	if errMsg != nil {
	// 		fmt.Println(errMsg)
	// 	}
	// }()

	// fact(-1) // 直接调用，此时程序会直接终止

	r, err := warpedErrorFact(-5)
	fmt.Println(r, err) // 0 n不能小于0

	r1, err1 := warpedErrorFact(5)
	fmt.Println(r1, err1) // 120 <nil>
}
