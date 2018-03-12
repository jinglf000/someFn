/**
 * Promise
 * @author jinglf000
 * ###### Mon Mar 12 13:54:36 CST 2018
 */

const p3 = new Promise((resolve, reject) => {
  resolve('B');
});

const p1 = new Promise((resolve, reject) => {
  // p3的Promise 被异步的展开
  resolve(p3);
});

const p2 = new Promise((resolve, reject) => {
  resolve('A');
});

p1.then(res => {
  console.log(res);
});

p2.then(res => {
  console.log(res);
});

// A B
// 如果使用多个参数调用 resovle(..) 或者 reject(..) ，第一个参数之后的所有参数都会被默默忽略。

// 因为new Promise((res,rej) => {}).then(function fn1() {}, function fn2() {})
// then 返回的也是 Promise 以但在then对应的函数里，出现了运行错误，会在then后面的
// catch() {}; 或者后面的then(function ffn1() {},function ffn2(){}) ffn2中被捕获

const p5 = Promise.resolve('12');
const p5_ = Promise.reject('13');

const p6 = Promise.resolve(p5);
const p6_ = Promise.resolve(p5_);

console.log(p5 === p6); // true
console.log(p5_ === p6_); // true; 但是直接调用 Promise.reject 会有异常抛出

new Promise((resolve, reject) => {
  resolve(13);
})
  .then(
    res => {
      console.log(res);
      foo.a();
      return Promise.resolve(' ERROR RRRRR');
    },
    res => {}
  )
  .catch(err => {
    console.log('CATCH', err);
    return 'CATCH error';
  }) // catch 返回的仍然是Promise
  .then(res => {
    console.log(res);
  });
