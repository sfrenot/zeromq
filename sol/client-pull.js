const socket = require(`zeromq`).socket(`pull`);    // Create PULL socket
 
socket.connect(`tcp://127.0.0.1:3000`);          // Connect to same address
 
socket.on(`message`, function (msg) {            // On message, log it
	console.log(`Message received: ${msg}`);
});
