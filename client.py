
import zmq
import time


def main() -> None:
    ctx = zmq.Context.instance()
    sock = ctx.socket(zmq.PAIR)
    sock.connect("tcp://127.0.0.1:30001")
    print("start connect ")

    
    time.sleep(1)
    sock.set_hwm(1000000000)

    i = 0
    while True:
        sock.recv()
        i = i + 1
        if i % 10000 == 0:
            print("receive ", i)

    print("endding")


if __name__ == "__main__":
    main()