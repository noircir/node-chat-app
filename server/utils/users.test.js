const expect = require('expect');

const {Users} = require('./users');

beforeEach(() => {
	chatUsers = new Users();
	chatUsers.users = [{
		id: '1',
		name: 'Mike',
		room: 'Node Course'
	}, {
		id: '2',
		name: 'Sigourney',
		room: 'React Course'
	}, {
		id: '3',
		name: 'Dmitri',
		room: 'Node Course'
	}];
});

describe('Users', () => {

	it('should add new user', () => {
		var chatUsers = new Users();
		var user = {
			id: 123,
			name: 'Nellie',
			room: 'The Office Fans'
		}
		expect(chatUsers.addUser(user.id, user.name, user.room)).toEqual(user);

		// verifying that constructor has created an array with one element
		expect(chatUsers.users).toEqual([user]);
	});


	it('should return names for Node course', () => {
		var userList = chatUsers.getUserList('Node Course');

		expect(userList).toEqual(['Mike', 'Dmitri']);
	});


	it('should return names for React course', () => {
		var userList = chatUsers.getUserList('React Course');

		expect(userList).toEqual(['Sigourney']);
	});


	it('should remove a user', () => {
		var removedUser = chatUsers.removeUser('1');

		expect(removedUser.id).toBe('1');
		expect(chatUsers.users.length).toBe(2);
	});


	it('should not remove a user', () => {
		var user = chatUsers.removeUser('123');

		expect(user).toBeFalsy();
		expect(chatUsers.users.length).toBe(3);
	});


	it('should find user', () => {
		var userToFind = chatUsers.getUser('2');

		expect(userToFind).toEqual({
			id: '2',
			name: 'Sigourney',
			room: 'React Course'
		});
	});

	it('should not find user', () => {
		var userToFind = chatUsers.getUser('24');

		expect(userToFind).not.toBeDefined();
	});

});