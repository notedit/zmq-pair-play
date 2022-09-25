const zmq = require("zeromq");
const { options } = require("zeromq/lib");

async function run() {
  zmq.Context.setMaxThreads(10);
  const sock = zmq.socket("pair");
  //sock.setsockopt(zmq.ZMQ_HWM, 10000000);
  //sock.hwm = 1000000;

  sock.connect("tcp://127.0.0.1:30001");

  let i = 0;
  sock.on("message", () => {
    i++;
    if (i % 10000 == 0) {
      console.log("message ", i);
    }
  });
}

run();
