/*
 试着写出数字的打印顺序
 */

// 返回Promise的函数
function asyncFn(name) {
  return new Promise((resolve, reject) => {
    console.log(3);
    if (typeof name === 'string') {
      setTimeout(() => {
        resolve({
          world: 'new World',
          name
        });
        console.log(4);
      }, 1000);
    } else {
      reject('error');
    }
  });
}

/*
 * async function 例子
 */
async function test() {
  let qq1;
  try {
    console.log(5);
    qq1 = await asyncFn('12');
    console.log(6);
    console.log(qq1, 'try 内部的函数');
    const qq2 = await asyncFn(qq1);
    console.log(7);
    console.log(qq2);
  } catch (err) {
    console.log('\n',err, '发生了错误');
  }
  console.log(qq1);
  console.log(8);
}
console.log(1);
test();
console.log(2);
