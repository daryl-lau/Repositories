package main

import "fmt"

func main() {
	slice := []int{1, 2, 125, 6, 122, 6, 9999, 3, 9, 122, 1, 451, 1, 2, 999, 5, 6, 2, 1}

	// 找到最大值及其索引
	var max, index int
	for idx, value := range slice {
		if value > max {
			max = value
			index = idx
		}
	}

	fmt.Println(max, index) //9999 6

	// 冒泡排序
	for i := 0; i < len(slice); i++ {
		for j := i + 1; j < len(slice); j++ {
			if slice[i] > slice[j] {
				slice[i], slice[j] = slice[j], slice[i]
			}
		}
	}
	fmt.Println(slice) // [1 1 1 1 2 2 2 3 5 6 6 6 9 122 122 125 451 999 9999]

	// 找到一个元素的索引，如果没有返回-1，有则返回该元素的索引号
	slice1 := []int{1, 2, 125, 6, 122, 6, 9999, 3, 9, 122, 1, 451, 1, 2, 999, 5, 6, 2, 1}
	target := 125
	var dstIndex int = -1
	for index, value := range slice1 {
		if target == value {
			dstIndex = index
			break
		}
	}
	fmt.Println(dstIndex) // 2

	// 二分查找，二分查找只能查找有序集合，
	slice3 := []int{10, 11, 21, 32, 53, 70, 85, 138, 223, 361}

	target1 := 8
	start := 0
	end := len(slice3)
	for {
		middle := (start + end) / 2
		if slice3[middle] == target1 {
			fmt.Println(middle)
			break
		} else if slice3[middle] > target1 {
			end = middle - 1
		} else {
			start = middle + 1
		}
		if start > end {
			fmt.Println(-1)
			break
		}
	}
}
