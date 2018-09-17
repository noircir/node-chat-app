var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

// 'describe', 'it should' come from Mocha.
// 'request' comes from supertest (high-level abstraction for testing http).
// 'expect' comes from expect

describe('generateMessage', () => {
	it('should generate the correct message object', () => {

		var from = 'Monty';
		var text = 'Asian street food festival';
		var msg = generateMessage(from, text);

		expect(typeof msg.createdAt).toBe('number');
		expect(msg).toMatchObject({from, text});
	});
});

describe('generateLocationMessage', () => {
	it('should generate the correct location object', () => {

		var from = 'Hannah Gadsby';
		var latitude = 12;
		var longitude = -12;
		var url = 'https://www.google.com/maps?q=12,-12'

		var msg = generateLocationMessage(from, latitude, longitude);

		expect(typeof msg.createdAt).toBe('number');
		expect(msg).toMatchObject({from, url});
	});
});