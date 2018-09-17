const path = require('path');
// http library comes already with express
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

// join allows to go straight to the directory
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
// passing server, getting back websocket server
var io = socketIO(server);
// var message = require()

app.use(express.static(publicPath));

// register an event listener to listen for connection
// it is like a tunnel 
io.on('connection', (socket) => {
	console.log('NEW USER CONNECTED');

	// Welcome message to the joined person, only once on connection
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	// Broadcast message that a user joined (the user won't get it)
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

	//========================================================
	// Creating message for the chat form
	//========================================================

	// event listener for when client sends a message
	socket.on('createMessage', (message, callback) => {
		console.log('Client asked to create message: ', message);

		// broadcasting message to every connected user
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback(`Acknowledgement from the server. I received your message from: ${message.from} text: ${message.text}`);

		// broadcasting to everyone but the sender
		// socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
	});

	//========================================================
	// Creating message for the location query
	//========================================================

	socket.on('createLocationMessage', (coords) => {
		console.log('Client asked to send location coords: ', coords);
		// io.emit('newLocationMessage', generateLocationMessage('Admin', `${message.latitude}, ${message.longitude}`));
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));

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