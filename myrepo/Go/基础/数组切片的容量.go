package main

import (
	"fmt"
)

func main() {

	arr := [10]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	slice1 := arr[2:5]

	// 切片从2到5，此时切片没有超过数组的长度，则容量为数组的length - startIndex  => 10 - 2 = 8
	fmt.Println(slice1, len(slice1), cap(slice1)) // [3 4 5] 3 8

	// 由于切片是由数组切出来的，因此底层会共享该数组的内存空间，此时如果把切片修改一下，则数组也会随之修改
	slice1 = append(slice1, 100)
	fmt.Println(slice1, arr) // [3 4 5 100] [1 2 3 4 5 100 7 8 9 10]

	// 反之，修改数组也会导致切片随之修改
	arr[2] = 100
	fmt.Println(slice1, arr) // [100 4 5 100] [1 2 100 4 5 100 7 8 9 10]

	//-------------------------------------------------------------
	// 详细看下切片的容量是按照什么规则来的
	// 1. 直接进行切片，切片的容量即数组的length - startIndex => 5 - 2 = 3
	arr2 := [5]int{1, 2, 3, 4, 5}
	slice2 := arr2[2:4]
	fmt.Println(slice2, len(slice2), cap(slice2)) // [3 4] 2 3

	// 2. 容量为3，切片占了两个，还剩余一个还可以继续存值，此时不会重新申请内存空间，而是直接使用原数组共享的空间，因此此时会像上面说的那样，修改数组或切片，两者会互相影响
	slice2 = append(slice2, 100)
	arr2[2] = 333
	fmt.Println(arr2, slice2, len(slice2), cap(slice2)) // [1 2 333 4 100] [333 4 100] 3 3

	// 3. 如果继续向切片中添加元素，此时容量已经不够了，此时会重新申请内存空间，将原数组的元素拷贝过来，容量会在原来的基础上进行翻倍，即 3 * 2 = 6
	// 同时，由于重新申请了内存空间，此时修改原数组或者切片，两者不会互相影响了，可以看得到下面我们修改了arr2的 4 => 444，而切片并没有随之修改
	slice2 = append(slice2, 200)
	arr2[3] = 444
	fmt.Println(arr2, slice2, len(slice2), cap(slice2)) // [1 2 333 444 100] [333 4 100 200] 4 6

	// 4. 再继续再切片中新增元素，如果容量不够，又会进行扩容，在原来的基础上进行翻倍
	slice2 = append(slice2, 300)
	slice2 = append(slice2, 400)
	slice2 = append(slice2, 500)
	fmt.Println(arr2, slice2, len(slice2), cap(slice2)) // [1 2 333 444 100] [333 4 100 200 300 400 500] 7 12

	// !!! 如果数组切片都会互相影响，可能会导致一些异常bug，此时我们可以在切片的时候传入第三个参数，表示容量end， endIndex <= 容量end <= 数组长度
	// 即容量最多保留到哪里
	arr3 := [5]int{1, 2, 3, 4, 5}
	slice3 := arr3[2:4:4] // 此时容量end为4，即不预留容量，添加一个元素的话，会重新申请一个内存空间，此时修改数组或切片，两者是不会互相影响的（但是如果不添加一个元素，就不会重新申请内存，此时直接修改arr或者切片，两者还是会互相影响，这点需要注意）
	slice3 = append(slice3, 100)
	arr3[2] = 333
	fmt.Println(arr3, slice3, len(slice3), cap(slice3)) // [1 2 333 4 5] [3 4 100] 3 4   这里容量是4，因为重新申请了内存，容量在原来基础上翻倍，即 2 * 2 = 4
}
