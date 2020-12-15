package main

import "fmt"

// func main() {
// 	i := 1
// 	for i <= 9 {
// 		j := 1
// 		for j <= i {
// 			fmt.Printf("%d * %d = %d\t", i, j, i*j)
// 			j++
// 		}
// 		fmt.Println("")
// 		i++
// 	}
// }

//优化
func main() {
	for i := 1; i <= 9; i++ {
		for j := 1; j <= i; j++ {
			fmt.Printf("%d * %d = %d\t", i, j, i*j)
		}
		fmt.Println(" ")
	}
}
