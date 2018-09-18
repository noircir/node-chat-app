var moment = require('moment');

// Jan 1st 1970 00:00:00 am

// var date = new Date();

// console.log(date.getMonth());

// new Date().getTime();
var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

var createdAt = 34568;
var date = moment(createdAt);


// date.add(100, 'year').subtract(9, 'months');
console.log(date.format('h:mm a'));