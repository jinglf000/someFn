/**
 * async await from
 * https://github.com/frontarm/async-javascript-cheatsheet
 * @author jinglf000
 */

// Promise.all(); // 并发所有都完成后，才完成

// Promise.race();// 以最先完成的状态为准

// Promise.finally();// fulfilled or reject

// Promise.reject();// return rejected promise

// Promise.resolve();// reutrn fulfilled promise

const fn = async (flag) => {
  if (flag) {
    return Promise.resolve('resolved');
  } else {
    return Promise.reject('rejected');
  }
}
(async () => {
  const data = await fn();
  console.log(data);
})()

console.log(fn(true));
// 返回的Promise为pending，
// 因为在fn调用返回结果的时候，即便是 Promise.resolve 或者 Promise.reject 都是异步操作
//
