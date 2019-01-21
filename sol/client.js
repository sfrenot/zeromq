let zmq = require('zeromq');
let client = zmq.socket('req');
client.connect('tcp://localhost:6666');

client.send("coucou2 ");

//process.exit()
/*

server.on('message', function(request) {
  console.log(request);
})
*/
