var socket = io();

socket.on('connect', function () {
	console.log("Connected to server");
});

// receiving pushed SMS
socket.on('newMessage', function(message) {
	console.log('Got new message', message);
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});