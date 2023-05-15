package main

import "fmt"

type Address struct {
	country  string
	province string
}

type User struct {
	id   string
	name string
	Address
}

func main() {
	var u1 User = User{"001", "jerry", Address{"china", "hubei"}}
	fmt.Println(u1) // {001 jerry {china hubei}}

	var u2 User = User{"002", "tom", Address{country: "china", province: "hubei"}}
	fmt.Println(u2) // {001 tom {china hubei}}

	var u3 User = User{id: "003", name: "jack", Address: Address{country: "china", province: "hubei"}}
	fmt.Println(u3) // {001 jack {china hubei}}

	fmt.Println(u1.country)  // china
	fmt.Println(u2.province) // hubei
	fmt.Println(u3.country)  // china

	// 上述访问或修改属性的方法同样可以使用链式调用，只是可以省略其中匿名嵌套的结构体名
	fmt.Println(u1.Address.country)  // china
	fmt.Println(u2.Address.province) // hubei
	fmt.Println(u3.Address.country)  // china
}
