/*
 试着写出数字的打印顺序
 */

console.log(1);

const  async = new Promise((resolve, reject) => {
	console.log(2);
	resolve(false);
	console.log(3)
	setTimeout(() => {
		console.log(4);
		reject(true);
	}, 200);
});

async.then((res) => {
	console.log(res);
	console.log(5);
}).catch((err) => {
	console.log(err);
	console.log(6);
});

console.log(7);

setTimeout(() => {
	console.log(8);
});

