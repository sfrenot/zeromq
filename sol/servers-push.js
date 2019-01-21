const socket = require(`zeromq`).socket(`push`); // Create PUSH socket
 
socket.bindSync(`tcp://127.0.0.1:3000`);      // Bind to localhost:3000
 
var counter = 0;
 
setInterval(function () {
	const message = `Ping #${counter++}`;
	console.log(`Sending '${message}'`);
	socket.send(message);                     // Send message once per 2s
}, 2000);
