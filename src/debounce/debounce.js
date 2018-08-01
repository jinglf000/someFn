/**
 * 事件去抖，通过重置定时器，为最后的操作延时固定的时间
 * 简单实现；
 */

 function debounce(fn, wait) {
  let timeout;

  return function () {
    let ctx;
    let args;
    ctx = this;
    args = arguments;

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn.apply(ctx, args);
    }, wait);
    return timeout;
  }
 }


 function log () {
   console.log('LOG ~~~~ LOG 日志');
 }

 setInterval(debounce(log, 500), 200);
