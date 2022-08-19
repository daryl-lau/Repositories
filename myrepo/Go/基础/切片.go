package main

import "fmt"

func main() {
	// 切片是相同类型长度可变的元素集合

	// nil切片, 不赋值，可以理解威切片的零值是nil
	var slice []int
	fmt.Println(slice, slice == nil) // [] true

	// 空切片
	slice1 := []int{}
	fmt.Println(slice1, slice1 == nil) // [] false

	slice2 := []int{0: 1, 10: 10}
	fmt.Println(slice2) // [1 0 0 0 0 0 0 0 0 0 10]

	slice2[4] = 4
	fmt.Println(slice2) // [1 0 0 0 4 0 0 0 0 0 10]

	// 通过make函数来创建切片，类似于js中的 new Array(5).fill(0)
	slice3 := make([]int, 5)
	fmt.Println(slice3) // [0 0 0 0 0]

	slice4 := make([]string, 5)
	fmt.Printf("%q \n", slice4) // ["" "" "" "" ""]

	// 切片容量
	// 通过make函数的第三个参数，可以指定切片的容量
	// 切片在底层使用数组进行数据存储，数组是有固定长度的，当切片的长度超过了数组的长度，切片将会申请一个更长的数组，再将原来的数组拷贝过来
	slice5 := make([]int, 5, 10)
	fmt.Println(slice5, len(slice5), cap(slice5)) // [0 0 0 0 0] 5 10

	// 切片可以通过数组进行切片操作来获得，切片的长度既截取出来的长度3，切片的容量既数组的长度减去开始索引位 10 - 2 = 8
	arr1 := [10]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	slice6 := arr1[2:5]
	fmt.Println(slice6, len(slice6), cap(slice6)) // [3 4 5] 3 8

	// !!!需要注意的是，通过数组切片操作获得的切片，底层共享数组的数据
	// 可以看到我们此时将数组的第五个元素修改成为100，切片slice6同样会发生修改，使用时需要特殊注意
	arr1[4] = 100
	fmt.Println(arr1, slice6) // [1 2 3 4 100 6 7 8 9 10] [3 4 100]

	// 遍历，和遍历数组一样，可以通过下标或者range
	slice7 := []int{1, 2, 3, 4, 5}
	for i := 0; i < len(slice7); i++ {
		fmt.Println(slice7[i])
	}

	for index, value := range slice7 {
		fmt.Println(index, value)
	}

	// 添加 append(slice, item1, item2, item3, ...)，append接收一个添加了切片的返回值，不会直接在原始切片中添加元素
	slice8 := append(slice7, 6, 7, 8)
	fmt.Println(slice7, slice8) // [1 2 3 4 5] [1 2 3 4 5 6 7 8]

	// 删除，在go中没有直接提供删除切片元素的方法，例如js中的pop shift splice
	// 可以使用切片操作和解构来进行切片的删除
	slice9 := []int{1, 2, 3, 4, 5}

	// 删除最后一个元素
	slice10 := slice9[0 : len(slice9)-1]
	fmt.Println(slice9, slice10) // [1 2 3 4 5] [1 2 3 4]

	// 删除第一个元素
	slice11 := slice9[1:len(slice9)] // 如果取到末尾，len(slice9)可省略
	fmt.Println(slice9, slice11)     // [1 2 3 4 5] [2 3 4 5]

	// 删除中间元素, 比如删除3，索引位2的元素
	slice12 := append(slice9[0:2], slice9[3:]...) // 这里注意，会修改原始slice9切片, go中的解包操作符...是写在后面，而js中是写在前面
	fmt.Println(slice9, slice12)                  // [1 2 4 5 5] [1 2 4 5]

	// 切片的切片
	slice13 := make([]int, 5, 10)
	slice13[0] = 1
	slice13[1] = 2
	slice13[2] = 3
	fmt.Println(slice13, len(slice13), cap(slice13)) // [1 2 3 0 0] 5 10

	// 切片的endIndex可以超过长度，但不能超过容量，没有赋值的部分取零值
	fmt.Println(slice13[1:10]) // [2 3 0 0 0 0 0 0 0]

	// copy函数
	// 如果src length 和 dst length 相等，则直接进行覆盖
	dst := make([]int, 3)
	src := []int{1, 2, 3}
	copy(dst, src)
	fmt.Println(dst, src) // [1 2 3] [1 2 3]

	// 如果src length > dst length，则多出的部分会被舍弃
	dst1 := make([]int, 3)
	src1 := []int{1, 2, 3, 4}
	copy(dst1, src1)
	fmt.Println(dst, src) // [1 2 3] [1 2 3]

	// 如果src length < dst length，则只会覆盖src存在的部分
	dst2 := make([]int, 3)
	src2 := []int{1, 2}
	copy(dst2, src2)
	fmt.Println(dst2, src2) // [1 2 0] [1 2]
}
