package main

import "fmt"

func main() {
	// key value 的无序集合， 遍历时不保证顺序，在go中通过hash table实现
	// 定义  map[keyType]valueType，零值是nil

	// 字面量定义，零值是nil
	var map1 map[string]string
	fmt.Printf("%T %v \n", map1, map1 == nil) // map[string]string true

	// 字面量定义并赋值
	map2 := map[string]int{"key1": 1}
	fmt.Printf("%v %v \n", map2, map2 == nil) // map[key1:1] false

	// 增
	// 直接对key进行赋值，map是引用类型
	mapNew := map2
	map2["newKey"] = 11
	fmt.Println(map2, mapNew) // map[key1:1 newKey:11] map[key1:1 newKey:11]

	// 删
	// 调用内置函数delete
	delete(map2, "newKey")
	fmt.Println(map2) // map[key1:1]

	// 改
	// 直接对key的value进行修改
	map2["key1"] = 999
	fmt.Println(map2) // map[key1:999]

	// 查
	// 如果key对应的value存在，则直接返回对应的value
	value := map2["key1"]
	fmt.Println(value) // 999

	// 如果key对应的value不存在，则返回value类型的零值
	value2 := map2["key2"]
	fmt.Println(value2) // 0

	// 判断对应的value存不存在，可以接受第二个返回值，布尔类型，即对应key的value存不存在，不需要自己取值手动判断
	value3, exist3 := map2["key1"]
	fmt.Println(value3, exist3) // 1 true
	value4, exist4 := map2["key2"]
	fmt.Println(value4, exist4) // 0 false

	// 遍历，不保证顺序，没有index，只能用range遍历

	for key := range map2 {
		fmt.Println(key, map2[key])
	} // key1 999

	for key, value := range map2 {
		fmt.Println(key, value)
	} // key1 999

	// 通过make创建map
	map3 := make(map[int]string)
	map3[0] = "0"
	map3[1] = "1"
	fmt.Println(map3) // map[0:0 1:1]

}
