const path = require('path');
// http library comes already with express
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

// join allows to go straight to the directory
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
// passing server, getting back websocket server
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

// register an event listener to listen for connection
// it is like a tunnel 
io.on('connection', (socket) => {

	// Joining a chat room
	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and name room are required.');
		} 

		socket.join(params.room);
		// socket.leave('The Office Fans');

		// io.emit -> io.to('The Office Fans')
		//socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit
		//socket.emit

		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));

		// Welcome message to the joined person, only once on connection
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

		// Broadcast message that a user joined (the user won't get it)
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

		callback();
	});

	//========================================================
	// Creating message for the chat form
	//========================================================

	// event listener for when client sends a message
	socket.on('createMessage', (message, callback) => {
		console.log('Client asked to create message: ', message);

		// broadcasting message to every connected user
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback();

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

	socket.on('disconnect', () => {
		var user = users.removeUser(socket.id);

		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`));
		}
	});
});

server.listen(port, () => {
	console.log('=============================');
	console.log(`Started up at port ${port}...`);
	console.log('=============================');
});