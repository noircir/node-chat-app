var socket = io();

socket.on('connect', function () {
	console.log("Connected to server");
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});


//=================
// Plain Chat
//=================

// sending form data to server

jQuery('#message-form').on('submit', function (e) {
	// prevent page refresh default
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, function (data) {
		// console.log('Client sent form data to the server', data);
	});
});

// receiving a response object from server and printing new chat message

socket.on('newMessage', function (message) {

	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	jQuery('#messages').append(li);
});



//======================
// Geolocation link
//======================

// capturing location and sending location data to server

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your browser.');
	}

	navigator.geolocation.getCurrentPosition( function (position) {

		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function () {
		alert('Unable to fetch location.');
	});
});

// receiving an object from server and creating a link

socket.on('newLocationMessage', function (message) {
	var li = jQuery('<li></li>');

	// target="_blank" opens a new tab
	var a = jQuery('<a target="_blank">My current location</a>');

	li.text(`${message.from}: `);
	a.attr('href', message.url);
	li.append(a);
	jQuery('#messages').append(li);

});