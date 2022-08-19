package main

import "fmt"

func add(a int, b int) int {
	return a + b
}

// 任意多个参数
func anyArgs(args ...string) {
	fmt.Printf("%T %v \n", args, args) // []string [1 2 3]
}

func sumFunc(n ...int) int {
	sum := 0
	for _, v := range n {
		sum += v
	}
	return sum
}

// 多个返回值
func calc(a, b int) (int, int, int, int) {
	return a + b, a - b, a * b, a / b
}

// 命名返回值，返回类型中定义的参数，将直接再函数作用域中申明，并使用零值初始化，在函数体内部不需要重复定义
// 并可以直接return，无需加上返回参数
func sumFunc2(n ...int) (sum int) {
	for _, v := range n {
		sum += v
	}
	return
}

func calc2(a, b int) (jia, jian, cheng, chu int) {
	jia = a + b
	jian = a - b
	cheng = a * b
	chu = a / b
	return
}

// 闭包，闭包就是在一个函数中返回另一个函数，在返回函数的内部使用到了外层函数的变量，这个变量在函数执行完的时候并不会被销毁，留着别删
func bb() func() string {
	name := "123"
	return func() string {
		return name
	}
}

func main() {
	sum := add(1, 2)
	fmt.Println(sum) // 3

	anyArgs("1", "2", "3")

	fmt.Println(sumFunc(1, 2, 3, 4, 5)) // 15

	r1, r2, r3, r4 := calc(4, 2)
	fmt.Printf("%v %v %v %v \n", r1, r2, r3, r4) // 6 2 8 2

	fmt.Println(sumFunc2(1, 2, 3, 4)) // 10

	rt1, rt2, rt3, rt4 := calc2(6, 2)
	fmt.Printf("%v %v %v %v \n", rt1, rt2, rt3, rt4) // 8 4 12 3
}
