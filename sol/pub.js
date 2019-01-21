const socket = require(`zeromq`).socket(`pub`); 

socket.bindSync(`tcp://127.0.0.1:3000`);

const topic = `heartbeat`;

setInterval(function () {
	const timestamp = Date.now().toString();
	socket.send([topic, timestamp]);
}, 2000);
