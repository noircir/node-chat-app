var socket = io();

socket.on('connect', function () {
	console.log("Connected to server");
});

// sending email
socket.emit('createEmail', {
	to: 'maddow@example.com',
	text: 'Hey, this is me.'
});

// receiving pushed from server email.
socket.on('newEmail', function(email) {
	console.log('New email', email);
});

// sending SMS
socket.emit('createMessage', {
	to: 'dmitri',
	text: 'Where are you?'
});

// receiving pushed SMS
socket.on('newMessage', function(sms) {
	console.log('Got new message', sms);
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});