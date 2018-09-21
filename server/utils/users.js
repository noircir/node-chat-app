[{
	id: 'lakjfdjf',
	name: 'Nellie',
	room: 'The Office Fans'
}]

// addUser(id, name, room)
//removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
	constructor () {
		this.users = [];
	}
	addUsers (id, name, room) {
		var user = {id, name, room};
		this.users.push(user);
		return user;
	}
}


module.exports = {Users};


// using ES6 class syntax

// class Person {
// 	// constructor is called by default
// 	constructor (name, age) {
// 		// 'this' refers to the instance, as opposite to class
// 		this.name = name,
// 		this.age = age
// 	}
// 	getUserDescription () {
// 		return `${this.name} is ${this.age} year(s) old`;
// 	}
// }

// var me = new Person('Nellie', 25);
// var description = me.getUserDescription();
// console.log(description);
// console.log('this.name', me.name);