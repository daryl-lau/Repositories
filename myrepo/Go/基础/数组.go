package main

import "fmt"

func main() {

	// go 中数组不可删除和添加  因为长度会影响类型，类型固定后就不能添加和删除了，和js不同
	// 长度一旦固定则不可变，一般在go中很少使用，一般使用切片

	var arr1 [10]int = [10]int{}
	fmt.Printf("%T, %v \n", arr1, arr1) // [10]int, [0 0 0 0 0 0 0 0 0 0]

	arr2 := [10]int{}
	fmt.Printf("%T, %v \n", arr2, arr2) // [10]int, [0 0 0 0 0 0 0 0 0 0]

	arr3 := [10]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	fmt.Printf("%T, %v \n", arr3, arr3) // [10]int, [1 2 3 4 5 6 7 8 9 10]

	arr4 := [10]int{1, 2, 3, 4, 5}
	fmt.Printf("%T, %v \n", arr4, arr4) // [10]int, [1 2 3 4 5 0 0 0 0 0]

	arr5 := [10]int{0: 1, 3: 2, 5: 3}
	fmt.Printf("%T, %v \n", arr5, arr5) // [10]int, [1 0 0 2 0 3 0 0 0 0]

	str1 := [5]string{}
	fmt.Printf("%T, %q \n", str1, str1) // [5]string, ["" "" "" "" ""]

	str2 := [5]string{"abc", "def"}
	fmt.Printf("%T, %q \n", str2, str2) // [5]string, ["abc" "def" "" "" ""]

	str3 := [5]string{0: "abc", 3: "def"}
	fmt.Printf("%T, %q \n", str3, str3) // [5]string, ["abc" "" "" "def" ""]

	// ...推导
	var arr6 [10]int
	fmt.Printf("%T, %v \n", arr6, arr6) // [10]int, [0 0 0 0 0 0 0 0 0 0]

	arr6 = [...]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10} // ... 会按照后面给定的个数自动推导
	fmt.Printf("%T, %v \n", arr6, arr6)            // [10]int, [1 2 3 4 5 6 7 8 9 10]

	// arr6 = [...]int{1,2,3}		// 报错 cannot use [...]int{…} (value of type [3]int) as type [10]int in assignment

	for i := 0; i < len(arr6); i++ {
		fmt.Println(arr6[i])
	}

	for index := range arr6 {
		fmt.Println(arr6[index])
	}

	for index, value := range arr6 {
		fmt.Println(index, value)
	}

	for _, value := range arr6 {
		fmt.Println(value)
	}
}
