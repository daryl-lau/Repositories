package utils

import "testing"

// 单元测试
// 命令
// go test -v .   							基本使用
// go test -v -coverprofile=utils.out .   	统计测试覆盖率
// to  tool cover -html utils.out			在网页中查看具体哪些代码没有覆盖到
func TestAdd(t *testing.T) {
	got := Add(1, 2)
	if got != 3 {
		t.Errorf("1 + 2 != %d, ERROR", got)
	}
}

func TestFact(t *testing.T) {
	got, err := Fact(5)
	if got != 120 {
		t.Errorf("5! != %d, ERROR %v", got, err)
	}
}

// 基准测试
// 命令
// go test -count=3 -benchmem -bench .
func BenchmarkInt2StrV1(b *testing.B) {
	for i := 0; i < b.N; i++ {
		Int2StrV1(i)
	}
}

func BenchmarkInt2StrV2(b *testing.B) {
	for i := 0; i < b.N; i++ {
		Int2StrV2(i)
	}
}
