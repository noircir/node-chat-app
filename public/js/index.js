var socket = io();

socket.on('connect', function () {
	console.log("Connected to server");
});

// receiving pushed SMS
socket.on('newMessage', function(message) {
	console.log('Got new message', message);
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	jQuery('#messages').append(li);
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

// socket.emit('createMessage', {
// 	from: 'Frank',
// 	text: 'Hi'
// }, function (data) {
// 	console.log('Got it', data);
// });

jQuery('#message-form').on('submit', function (e) {
	// prevent page refresh default
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function () {

	});
});