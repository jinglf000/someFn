const set = new Set();
const map = new Map();
const obj = { name: 'My name is Object', age: 12 };
const arr = [12,4,5,8,0];
const symbol = Symbol('hello');

set.add('12');
set.add(12);
set.add(undefined);
set.add(undefined);
set.add(null);
set.add(map);
set.add(obj);
set.add(symbol);

// console.log(Symbol('hello') === Symbol('hello'));
// console.log(set.keys());
// console.log(set.values());
// console.log(set);

// for (let i of set.entries()) console.log(i);
// console.log(arr.keys());
// for (let i of arr.entries()) console.log(i); iterator

obj[symbol] = 'symbol base';

map.set(arr, 'this is an arr');

map.set(map, 'this is a map');

map.set(map, map);

map.helloworld = 'helloworld';

map[map] = map;

// console.log(map.toString());
toString = Object.prototype.toString

// console.log(toString.call(set));// [object Set]
// console.log(toString.call(map));// [object Map]

// console.log(map['[object Map]']) ==> map
// console.log(map[map]) map会执行toString的操作
// 

// for (let i in map) { console.log(i) }// map虽然是Map数据类型，同时也是对象，可以使用for in 对对象进行循环遍历
// for (let i of map.values()) { console.log(i)} // for of 主要针对于遍历器：values() keys() entries() 
// 当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。会不断的调用Iterator接口的next方法获取值，
// 进而实现了遍历、而方法本身不会返回，固定的数组，方法只是提供了一层接口，供for...of 循环进行遍历，for of 每次循环
// 都会调iterator 的next 方法获取以遍历的内容。values() keys() entries() 方法的调用临时重置了遍历器接口。
// http://es6.ruanyifeng.com/#docs/iterator

var it = makeIterator(['a', 'b']);

function makeIterator(arr) {
	var index = 0;

	return {
		[Symbol.iterator]() {
			return {
				next() {
					return index < arr.length ? 
					{ value: arr[index ++], done: false } :
					{ value: undefined, done: true }
				}
			}
		}
	}
}


// for (let i of it )console.log(i);

let arrIterator = arr[Symbol.iterator]
