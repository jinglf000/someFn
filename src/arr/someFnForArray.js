/* ** 和数组相关的一些算法 去重和排序** */

var arr = [1, '1', 2, 1, '1', 2, '2'];

// 1. xunhuan
function arrFn1 (arr) {
	var res = [];

	for (var i = 0, arrLen = arr.length; i < arrLen ; i ++ ) {
		var cur = arr[i];
		for (var j = 0, resLen = res.length; j < resLen; j ++) {
			if (cur === res[j]) {
				break;
			}
		}

		if (j === resLen) {
			res.push(cur);
		}

	}
	return res;
}


// console.log(arrFn1(arr));

// 2. indexOf

function arrFn2 (arr) {
	var res = [];
	for (var i = 0, arrLen = arr.length; i < arrLen; i ++) {
		var cur = arr[i];
		if (res.indexOf(cur) < 0) {
			res.push(cur);
		}
	}
	return res;
}

console.log(arrFn2(arr));

// 3. es6 Set
function arrFn3(arr) {
	// return Array.from(new Set(arr));
	// return [...new Set(arr)];
}