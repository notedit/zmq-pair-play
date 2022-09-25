
import zmq
import time


def main() -> None:
    ctx = zmq.Context.instance()
    sock = ctx.socket(zmq.PAIR)
    sock.bind("tcp://127.0.0.1:30001")
    print("start binding ")

    
    time.sleep(10)
    sock.set_hwm(1000000000)

    msg = b'a' * 100
    for i in range(1000001):
        sock.send(msg)

    print("endding")


if __name__ == "__main__":
    main()