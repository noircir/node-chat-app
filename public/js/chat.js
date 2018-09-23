var socket = io();

//=======================================================
// Always scroll up to show new message on the bottom, 
// but don't scroll when user reads history of messages
//=======================================================

function scrollToBottom() {
	// Selectors
	var messages = jQuery('#messages');
	// the last message, added just before 'scrollToBottom' was called
	var newMessage = messages.children('li:last-child');

	//Heights
	// prop method is a cross-browser way to fetch properties

	var clientHeight = messages.prop('clientHeight');
	var scrollTop = messages.prop('scrollTop');
	var scrollHeight = messages.prop('scrollHeight');
	// calculates the message height taking into account padding
	var newMessageHeight = newMessage.innerHeight();
	// height of the previous child, i.e second-to-last message
	// This is needed for when the chat is slightly scrolled at the second last message
	// that is, the user has not intended to look deep into chat archive
	var lastMessageHeight = newMessage.prev().innerHeight();

	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		// setting scrollTop to the whole height of the container, 
		//which means we are at the very bottom of the messages
		messages.scrollTop(scrollHeight);
		console.log('should scroll ');
	};

};

//=======================================================
// Capturing the name and the room of the joining person
//=======================================================

socket.on('connect', function () {
	// console.log("Connected to server");

	var params = jQuery.deparam(window.location.search);

	socket.emit('join', params, function (err) {
		if (err) {
			alert(err);
			window.location.href = '/';
		} else {
			console.log('No error.');
		}
	});
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

//===============================================
// Redrawing the list of users in the sidebar
// when somene joins or leaves the chat room
//===============================================

socket.on('updateUserList', function (users) {
	console.log('Users list', users);
	var ol = jQuery('<ol></ol>');

	users.forEach(function (user) {
		ol.append(jQuery('<li></li>').text(user));
	});

	jQuery('#users').html(ol);
});


//=================
// Plain Chat
//=================

// sending form data to server

jQuery('#message-form').on('submit', function (e) {
	// prevent page refresh default
	e.preventDefault();

	var messageTextbox = jQuery('[name=message]');

	socket.emit('createMessage', {
		text: messageTextbox.val()
	}, function () {
		messageTextbox.val('');
	});
});

// receiving a response object from server and printing a new chat message

socket.on('newMessage', function (message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');

	// tell mustache which template to use
	var template = jQuery('#message-template').html();

	// inject values into the template
	var html = Mustache.render(template, {
		from: message.from,
		text: message.text,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);
	scrollToBottom();

	// var li = jQuery('<li></li>');
	// li.text(`${message.from}  ${formattedTime}: ${message.text}`);

	// jQuery('#messages').append(li);
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

	locationButton.attr('disabled', 'disabled').text('Sending location...');

	navigator.geolocation.getCurrentPosition( function (position) {

		locationButton.removeAttr('disabled').text('Send location');

		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function () {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location.');
	});
});

// receiving an object from server and creating a link

socket.on('newLocationMessage', function (message) {

	var formattedTime = moment(message.createdAt).format('h:mm a');

	// tell mustache which template to use
	var template = jQuery('#location-message-template').html();

	// prepare html with injected values into the template
	var html = Mustache.render(template, {
		from: message.from,
		url: message.url,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);
	scrollToBottom();

	// var li = jQuery('<li></li>');

	// // target="_blank" opens a new tab
	// var a = jQuery('<a target="_blank">My current location</a>');

	// li.text(`${message.from} ${formattedTime}: `);
	// a.attr('href', message.url);
	// li.append(a);
	// jQuery('#messages').append(li);

});