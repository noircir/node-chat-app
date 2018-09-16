var socket = io();

socket.on('connect', function () {
	console.log("Connected to server");
});

// receiving pushed SMS
socket.on('newMessage', function(sms) {
	console.log('Got new message', sms);
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});