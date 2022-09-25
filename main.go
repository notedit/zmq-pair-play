package main

import (
	"fmt"
	"time"

	zmq "github.com/pebbe/zmq4"
)

func main() {

	sender, _ := zmq.NewSocket(zmq.PAIR)
	err := sender.Bind("tcp://127.0.0.1:30001")
	sender.SetSndhwm(10000000)
	sender.SetRcvhwm(10000000)

	if err != nil {
		panic(err)
	}

	time.Sleep(10 * time.Second)

	i := 0
	start := time.Now()
	for {
		_, err := sender.SendBytes(make([]byte, 10), 1)
		if err != nil {
			fmt.Println("error ", err)
		}
		if i%10000 == 0 {
			fmt.Println("send message ", i)
		}
		if i > 10000 {
			fmt.Println("send message ", i)
			break
		}
		i++
	}
	elapsed := time.Now().Sub(start)
	fmt.Println("time ", elapsed)

	select {}

}
