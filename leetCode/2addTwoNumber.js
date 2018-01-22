function addTwoNumbers(l1, l2) {
	const val1 = parseInt(l1.reverse().join(''), 10);
	const val2 = parseInt(l2.reverse().join(''), 10);
	return (val1 + val2).toString().split('').reverse();
}

const xxx = addTwoNumbers([2,4,3], [5,6,4]);
console.log(xxx);
// console.log(12);