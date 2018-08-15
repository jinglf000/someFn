/**
 * 1234567898765432 1234567898765432 1234567898765432 1234567898765432
 * 规律的数字，第n位
 */

/**
 * 获取有序数字的第n位
 * @param  {[Number]} n 要返回的位数
 * @return {[String]}   位数对应的字符
 */
function getN(n) {
	const str = '1234567898765432';
	const num = n % 16 ;
	return str[num];
}

/**
 * 获取数组序列
 * @param {Number} n 位数
 * @return {String} 规定的字符串
 */
function getLines(n) {
	let str = '';
	let cur = 0;
	let flag = 1;
	let i = 0;
	// for(let i = 1; i <= n; i ++) {
	// 	if (cur >= 9) {
	// 		flag = -1;
	// 	} else if (cur <= 1) {
	// 		flag = 1;
	// 	}
	// 	cur = cur + flag;
	// 	str += cur;
	// }
	while(i <= n) {
		if (cur >= 9) {
			flag = -1;
		} else if (cur <= 1) {
			flag = 1;
		}
		cur = cur + flag;
		str += cur;
		i ++;
	}
	return str;
}
let num = 85;
// console.log(getLines(num));
// console.log(getN(num));
console.log(2592000 / (3600 * 24))
