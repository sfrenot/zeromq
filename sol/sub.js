const socket = require(`zeromq`).socket(`sub`); 
 
socket.connect(`tcp://127.0.0.1:3000`);     
 
socket.subscribe(`heartbeat`);             
 
socket.on(`message`, function (topic, msg) {
	console.log(`Received: ${msg} for ${topic}`);
});
