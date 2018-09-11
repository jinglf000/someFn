// prototype 原型共享，当修改 person1实例的friends时，person2也会发生改变；

function Person() {}

Person.prototype = {
	name: 'xiao ming',
	age: 12,
	sayName: function () {
		console.log(this.name);
	},
	friends: ['12', '2', 'er']
};


var person1 = new Person();
var person2 = new Person();

person1.age = 45;
console.log(person1.age);

console.log(person2.age);
// history onpopstate onhashchange