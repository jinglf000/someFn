
// var   it = makeIterator(['a', 'b', 'c']);

// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

// function  makeIterator(array) {
// 	var nextIndex = 0;
// 	return { 
// 		next: function () {
// 			return nextIndex < array.length ? 
// 				{ value: array[nextIndex ++], done: false}:
// 				{value: undefined, done: true}
// 		}
// 	}
// }


var obj = {
	[Symbol.iterator] : function () {
		return {
			next: function () {
				return {
					value: 1,
					done: true
				};
			}
		}
	}
};

console.log(obj);
