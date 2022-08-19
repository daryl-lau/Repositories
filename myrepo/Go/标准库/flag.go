package main

import (
	"flag"
	"fmt"
)

func main() {
	var (
		host string
		port int
		help bool
	)
	flag.StringVar(&host, "H", "127.0.0.1", "host地址")
	flag.IntVar(&port, "port", 8080, "host port")
	flag.BoolVar(&help, "help", false, "help info")

	flag.Usage = func() {
		flag.PrintDefaults()
	}

	flag.Parse()

	if help {
		flag.Usage()
		return
	}

	fmt.Println(host, port)
}
