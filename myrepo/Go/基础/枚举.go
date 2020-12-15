package main

import "fmt"

/*
  go 中并没有枚举类型，但是可以通过 const 来模拟枚举
*/
const (
	SUNDAY    int = 0
	MONDAY    int = 1
	TUESDAY   int = 2
	WEDNESDAY int = 3
	THURSDAY  int = 4
	FRIDAY    int = 5
	SATURDAY  int = 6
)

func main() {
	fmt.Println(SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY)
}
