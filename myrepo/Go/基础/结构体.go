package main

import "fmt"

type User struct {
	name string
	age  int
}

type Employee struct {
	user   User
	addr   string
	salary int
}

func (u *User) SetUserName(name string) {
	u.name = name
}

func (u User) GetUserName() string {
	return u.name
}

func (e *Employee) SetSalary(salary int) {
	e.salary = salary
}

func (e Employee) GetSalary() int {
	return e.salary
}

func main() {
	var emp1 *Employee = &Employee{user: User{name: "jerry", age: 18}, salary: 20000}

	fmt.Println(emp1.user.GetUserName())
	fmt.Println(emp1.GetSalary())

	emp1.user.SetUserName("tom")
	emp1.SetSalary(30000)

	fmt.Println(emp1.user.GetUserName())
	fmt.Println(emp1.GetSalary())
}
