package main

import (
	"fmt"
	"structor/people"
	"time"
)

// 结构体是值类型
// 未指定属性名称，对应类型按零值初始化

type User struct {
	id    string
	name  string
	age   int
	birth time.Time
	tel   string
	addr  string
}

// 创建结构体的函数，类似于构造函数，可以创建值类型或者指针类型的结构体
func NewUser(id string, name string, age int) User {
	return User{
		id:    id,
		name:  name,
		age:   age,
		birth: time.Now(),
		tel:   "",
		addr:  "",
	}
}

func NewUserPointer(id string, name string, age int) *User {
	return &User{
		id:    id,
		name:  name,
		age:   age,
		birth: time.Now(),
		tel:   "",
		addr:  "",
	}
}

func main() {
	var user1 User = User{id: "1", name: "daryl", age: 18}
	fmt.Printf("%T %#v \n", user1, user1) // main.User main.User{id:"1", name:"daryl", age:18, birth:time.Time{wall:0x0, ext:0, loc:(*time.Location)(nil)}, tel:"", addr:""}

	// 由于结构体是值类型，因此赋值不会互相影响
	var user2 User = User{id: "2", name: "daryl"}
	var user3 = user2
	user3.name = "tom"
	fmt.Println(user2) // {2 daryl 0 {0 0 <nil>}  }
	fmt.Println(user3) // {2 tom 0 {0 0 <nil>}  }

	// 结构体指针的几种方式
	var user4 *User
	user4 = &User{id: "1"}
	var user5 = user4
	user5.id = "2"
	fmt.Println(*user4) // {2  0 {0 0 <nil>}  }
	fmt.Println(*user5) // {2  0 {0 0 <nil>}  }

	var user6 = new(User)
	fmt.Println(*user6) // {  0 {0 0 <nil>}  }

	// 通过函数创建结构体
	var user7 = NewUser("7", "seven", 18)
	fmt.Println(user7) // {7 seven 18 {13886051980684794744 3334201 0xd679a0}  }

	var user8 = NewUserPointer("8", "eight", 20)
	fmt.Println(*user8) // {8 eight 20 {13886051980684794744 3334201 0xd679a0}  }

	var p1 people.People = people.People{
		Gender: "1",
		Height: 180,
		Weight: 100,
	}

	fmt.Println(p1) // {1 180 100}

	// 这里只能通过短声明来使用，因为NewPeople1的结构体类型只在包内可见，无法手动指定其类型，只能通过NewPeople1函数的返回类型进行推导
	p2 := people.NewPeople1("2", 170, 80)
	fmt.Println(p2) // {2 170 80}

	// 但有个问题是，通过这种方式创建出来的结构体，还是不能访问包内可见的属性
	// fmt.Println(p2.gender) // 这一行会报错

	// 如果想要访问或者修改包内可见的结构体属性，还是需要借助函数来进行,
	// 并且函数的入参类型需要是一个指针，否则也无法修改，因为go语言中的函数入参传递是值传递，会对入参进行拷贝，修改的不是同一个结构体
	people.SetHeight(&p2, 186)
	fmt.Println(p2) // {2 186 80}

	p2.SetWeight(200)
	fmt.Println(p2)             // {2 186 200}
	fmt.Println(p2.GetWeight()) // 200

	p2.Print()
}
