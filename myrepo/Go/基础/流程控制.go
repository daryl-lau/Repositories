package main

import "fmt"

func main() {
	// if else
	condition := true
	if condition == true {
		fmt.Println("true")
	} else {
		fmt.Println("false")
	}

	// if else if
	score := 100
	if score == 100 {
		fmt.Println("pretty good")
	} else if score >= 90 {
		fmt.Println("good")
	} else if score >= 60 {
		fmt.Println("ok")
	} else {
		fmt.Println("bad")
	}

	// switch case
	switch {
	case score == 100:
		fmt.Println("pretty good")
	case score >= 90:
		fmt.Println("good")
	case score >= 60:
		fmt.Println("ok")
	default:
		fmt.Println("bad")
	}

	// for循环
	sum := 0
	for index := 1; index <= 100; index++ {
		sum += index
	}
	fmt.Println(sum)

	// go 中没有while循环，使用for循环代替
	sum1 := 0
	index1 := 1
	for index1 <= 100 {
		sum1 += index1
		index1++
	}
	fmt.Println(sum1)

	// 死循环
	sum2 := 0
	index2 := 1
	for {
		if index2 > 100 {
			break
		}
		sum2 += index2
		index2++
	}
	fmt.Println(sum2)
}
