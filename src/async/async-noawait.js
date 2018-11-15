/**
 * async-noawait
 * @author jinglf000
 * ###### Fri Mar 2 10:42:35 CST 2018
 */

const noawait = async function () {
  const m = await 123;
  console.log('noawait');
}

function testOne() {
  console.log(1);
  new Promise((resolve, reject) => {
    console.log(2);
    resolve();
  }).then((res) => {
    console.log(3);
  });
  console.log(4);
  console.log(noawait());
  console.log(5);
}
// testOne();

function testTwo() {
  console.log(1);
  Promise.resolve('promise.resolve').then((res) => {console.log(res)});
  console.log(2);
}

testTwo();

/**
 * promise.resolve() 或者等价于此 new Promise((resolve, reject) => { resolve()}) 其执行在
 * setTimeout(() => {}, 0); 之前
 *
 */
function example() {
  const xx = async function () {};// xx() 返回值为 Promise{{resolved}}；
  const yy = async function () {
    const val = await 123; // await 会把其后的操作当成异步来执行，类似于Promise.resolve()
    return val; // 返回的val为，该函数返回的promise.then((res) => {}) res的值
    // 如果程序发生了错误 Promise则变为 rejected
    // Promise的catch能够捕获Promise中的错误，一旦发生错误，Promise的状态会变为rejected,
    // 同样catch也能捕获，正常的Promise的状态为rejected状态；
  };// yy() 返回值为 Promise{{peding}}；
  new Promise((resolve, reject) => { resolve(125)}).then((res) => {});
  // promie.then().then().then().catch();
  // then返回的也是Promise，then的回调中的return 类似于Promise.resolved(val);
  // 如果第一个then，reject了，后面两个then都不会执行了；
  // async 函数中，只有await后面的语句为异步的，其余的均为同步代码
}


