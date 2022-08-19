package main

import (
	"context"
	"fmt"
)

func main() {

	ctx, _ := context.WithCancel(context.Background())

	go func() {
		select {
		case <-ctx.Done():
			fmt.Println("Interuped")
		}
	}()
}
