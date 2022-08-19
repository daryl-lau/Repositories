package main

import (
	"encoding/json"
	"fmt"
	"time"
)

type User struct {
	Id          string
	Name        string
	Age         int
	Gender      bool
	Friends     []string
	visibleTest bool
}

// 当结构体用于json的时候，可以设置一些辅助flag,
// `json:"name,string,omitempty" `
type User1 struct {
	Id          string   `json:"id"` // 在反序列化的时候，将id的key映射为Id，但是在序列化的时候，
	Name        string   `json:"name"`
	Age         int      `json:"age,string"` // 可以将age的值 int类型转为string类型，目前只支持string
	Gender      bool     `json:"gender"`
	Friends     []string `json:"friends"`
	Password    string   `json:"-"`                            // 不序列化和反序列化此属性
	VisibleTest bool     `json:"visibleTest,string,omitempty"` // 当此属性为零值的时候，序列化的时候剔除掉此属性，反序列化无影响
}

// 自定义类型和自定义系列化方法
type BirthDate time.Time
type BoyBool bool
type HasCarBool bool

type User2 struct {
	Birthday BirthDate
	IsBoy    BoyBool
}

type User3 struct {
	HasCar HasCarBool
}

// 如果属性类型是BirthDate，则使用下面这个自定义的序列化方法
func (t BirthDate) MarshalJSON() ([]byte, error) {
	d := time.Time(t).Format("2006-01-02")
	r, err := json.Marshal(d) // 注意，即使返回的是一个字符串，也不能直接使用[]byte("str")进行返回，需要使用json.Marshal方法返回，这是因为实现的接口是MarshalJSON的，需要使用JSON处理，否则报错
	return r, err
}

func (t *BirthDate) UnmarshalJSON(i []byte) error { // 注意 UnmarshalJSON 需要使用指针接收者，否则无法修改，值类型接收者会进行拷贝，导致无法修改
	var s string
	if err := json.Unmarshal(i, &s); err != nil {
		return err
	}
	if date, err := time.Parse("2006-01-02", s); err != nil {
		return err
	} else {
		*t = BirthDate(date)
	}
	return nil
}

func (b BoyBool) MarshalJSON() ([]byte, error) {
	if b {
		r, err := json.Marshal("Y")
		return r, err
	}
	r, err := json.Marshal("N")
	return r, err
}

func (b *BoyBool) UnmarshalJSON(i []byte) error {
	var r string
	if err := json.Unmarshal(i, &r); err != nil {
		return err
	}
	if r == "Y" {
		*b = BoyBool(true)
	} else {
		*b = BoyBool(false)
	}
	return nil
}

// 上述过程中需要使用json.Marshal和json.Unmarshal在内部对值进行转换，但其本身就是一个字符串类型或者字符串切片
// 因此有一个更方便的接口实现，MarshalText和UnmashalText，可以直接对字符串进行处理，以上述布尔值转Y/N举例
func (b HasCarBool) MarshalText() ([]byte, error) {
	if b {
		return []byte("Y"), nil
	} else {
		return []byte("N"), nil
	}
}

func (b *HasCarBool) UnmarshalText(s []byte) error {
	if string(s) == "Y" {
		*b = HasCarBool(true)
	} else {
		*b = HasCarBool(false)
	}
	return nil
}

func main() {
	u := User{"001", "laobai", 18, true, []string{"xiaobai"}, true}
	fmt.Println(u)
	jsonU, err := json.Marshal(u)   // Marshal 返回的是一个字符切片, 如果结构体中的属性不是包外可见的，则该属性不会被序列化，上面的visibleTest是包内可见的，下面序列化中没有该属性
	fmt.Println(string(jsonU), err) // {"Id":"001","Name":"laobai","Age":18,"Gender":true,"Friends":["xiaobai"]} <nil>

	// 反序列化
	var d User
	json.Unmarshal(jsonU, &d)
	fmt.Println(d)             // {001 laobai 18 true [xiaobai] false} 最后一个false是visibleTest的零值
	fmt.Println(d.Id)          // 001
	fmt.Println(d.Name)        // laobai
	fmt.Println(d.Age)         // 18
	fmt.Println(d.Gender)      // true
	fmt.Println(d.Friends)     // [xiaobai]
	fmt.Println(d.visibleTest) // false

	u1 := User1{"002", "laobai", 18, true, []string{"xiaobai"}, "p@ssw0rd", false}
	fmt.Println(u1)
	jsonU1, err := json.Marshal(u1)
	fmt.Println(string(jsonU1), err) // {"id":"002","name":"laobai","age":"18","gender":true,"friends":["xiaobai"]} <nil>

	json1 := `
		{
			"id":"003",
			"name":"laobai",
			"age":18,
			"gender":true,
			"friends":["xiaobai"],
			"visibleTest":false
		}
	`
	var jtu User1
	json.Unmarshal([]byte(json1), &jtu)
	fmt.Println(jtu) // {003 laobai 0 true [xiaobai]  false}

	// json值转换
	u2 := User2{BirthDate(time.Now()), true}
	fmt.Println(u2) // {2022-08-16 20:04:34.9314004 +0800 CST m=+0.004556501 false}

	// 对于上面的u2，如果我想要把Birthday改成 2022-08-16 ，把 IsBoy改成 "Y"，此时我们需要自定义序列化函数
	r, err := json.Marshal(u2)
	fmt.Println(string(r), err) // {"Birthday":"2022-08-16","IsBoy":"Y"}  <nil>

	u3 := `{"Birthday":"2022-08-16","IsBoy":"Y"}`
	var jtu3 User2
	json.Unmarshal([]byte(u3), &jtu3)
	fmt.Printf("%#v \n", jtu3)

	utj3, _ := json.Marshal(jtu3)
	fmt.Println(string(utj3))

	// MarshalText & UnmarshalText 用例
	u4 := User3{true}
	jtu4, _ := json.Marshal(u4)
	fmt.Println(string(jtu4)) // {"HasCar":"Y"}

	var utj4 User3
	json.Unmarshal(jtu4, &utj4)
	fmt.Printf("%#v", utj4) // main.User3{HasCar:true}
}
