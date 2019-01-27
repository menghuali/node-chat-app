const moment = require('moment');

// Jan 1st 2019 00:00:10 am

var date = moment();
var format = 'MMM Do, YYYY hh:mm:ss a'
console.log(date.format(format));

date.add(1, 'year');
console.log(date.format(format));

date.subtract(2, 'months');
console.log(date.format(format));

console.log(new moment().format('h:mm a'));

var createAt = 1234;
date = new moment(createAt);
console.log(date.format(format));

console.log(new moment().valueOf());
