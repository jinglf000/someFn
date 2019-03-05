/**
 * yield 函数
 * @author jinglf000
 * 通过yield 函数生成对应的遍历器，可以使用for of 进行便利
 * async await 使用同步的方式写异步代码；
 * 通过不断的调用 fn.next 获取新的值，
 */

/**
 * yield 异步实现
 */
function* asyncFn() {
  console.log('yield 表达式~~~~  ');
  const data = yield getData();
  console.log(data);
}

/**
 * 异步getData
 */
function getData() {
  console.log('执行了getData ============= ');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('async getData from setTimeout');
    }, 1000);
  });
}

const fn = asyncFn();
const g = fn.next();
// const g = 1;

console.log(g, 'ggggg');

g.value.then((data) => {
  console.log('执行了 g.value.then =========== ');
  console.log(fn.next(data));
});
