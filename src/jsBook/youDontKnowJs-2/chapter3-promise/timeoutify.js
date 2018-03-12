/**
 * timeoutify
 * @author jinglf000
 * ###### Mon Mar 12 10:49:29 CST 2018
 */

const axios = require('axios');

/**
 * 超时控制函数
 * @param {Function} fn 回调函数
 * @param {Number} delay 延时
 */
function timeoutify(fn, delay) {
  let time = setTimeout(() => {
    time = null;
    fn(new Error('time outer'));
  }, delay);

  return function(response) {
    if (time) {
      fn(response);
    }
  };
}

/**
 * 回调函数
 * @param {Object} response 异步的返回参数
 */
function handle(response) {
  console.log(response);
}
// axios.get('http://www.baidu.com').then(timeoutify(handle, 6));

function syncAwaitSomeTime(time) {
  const now = Date.now();
  let i = 0;
  while (Date.now() - now < time) {
    console.log(i++);
  }
  // 执行while里面的代码（包括while里的判断）需要 0.316ms
}

console.time('syncAwaitTime');

syncAwaitSomeTime(50);

console.timeEnd('syncAwaitTime');

var fn = new Promise(() => {});
