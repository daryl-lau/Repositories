package main

import "fmt"

/*
  go 中并没有枚举类型，但是可以通过 const 来模拟枚举
*/

func main() {
	const (
		SUNDAY    int = 0
		MONDAY    int = 1
		TUESDAY   int = 2
		WEDNESDAY int = 3
		THURSDAY  int = 4
		FRIDAY    int = 5
		SATURDAY  int = 6
	)

	fmt.Println(SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY)
	// 0 1 2 3 4 5 6
}
