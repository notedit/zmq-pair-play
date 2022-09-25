const zmq = require("zeromq");

const crypto = require("crypto");

async function run() {
  zmq.Context.setMaxThreads(1);
  const sock = zmq.socket("pair");

  sock.bindSync("tcp://127.0.0.1:30001");
  console.log("start ipc://filename");

  let i = 0;
  console.time("send");
  let send = Buffer.alloc(1000);
  while (true) {
    sock.send(send, 1);
    i++;

    if (i % 10000 == 0) {
      console.log("send ", i);
    }

    if (i > 1000000) {
      break;
    }
  }
  console.timeEnd("send");
}

run();
