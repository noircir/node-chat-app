const path = require('path');
// http library comes already with express
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// join allows to go straight to the directory
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
// passing server, getting back websocket server
var io = socketIO(server);

app.use(express.static(publicPath));

// register an event listener to listen for connection
// it is like a tunnel 
io.on('connection', (socket) => {
	console.log('NEW USER CONNECTED');

	socket.emit('newEmail', {
		from: "mike@example.com",
		text: "Hey, what is going on.",
		createdAt: 123
	});

	// event listener for when client sends an email
	socket.on('createEmail', (newEmail) => {
		console.log('Client sent email: ', newEmail);
	});

	// pushing SMS
	socket.emit('newMessage', {
		from: "sigourney",
		text: "What's up?",
		createdAt: 123789
	});

	// event listener for when client sends an SMS
	socket.on('createMessage', (sms) => {
		console.log('Client sent message: ', sms);
	});

	socket.on('disconnect', (socket) => {
		console.log('USER DISCONNECTED');
	});
});

server.listen(port, () => {
	console.log('=============================');
	console.log(`Started up at port ${port}...`);
	console.log('=============================');
});