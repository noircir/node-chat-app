var expect = require('expect');
var {generateMessage} = require('./message');

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