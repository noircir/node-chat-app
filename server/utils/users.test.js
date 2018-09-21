const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
	it('should add new user', () => {
		var chatUsers = new Users();
		var user = {
			id: 123,
			name: 'Nellie',
			room: 'The Office Fans'
		}
		expect(chatUsers.addUsers(user.id, user.name, user.room)).toEqual(user);

		// verifying that constructor has created an array with one element
		expect(chatUsers.users).toEqual([user]);
	});
});