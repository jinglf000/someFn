/**
 * 节流throttle
 * 以固定的频率触发事件，对于高频次触发的事件节流
 */

/**
 *
 */
function throttle(cb, wait) {

  let timer = null;
  let i = 0;
  function fn() {
    console.log(i ++);
    if (!timer) {
      timer = setTimeout(() => {
        cb.apply(null, arguments);
        timer = null;
      }, wait);
    }
  }
  return fn;
}

const arr = [];

function log (e) {
  const now = Date.now();
  arr.push(now);
  console.log(e, now);
}


window.addEventListener('scroll', throttle(log, 500));

var res = arr.map((item, index, arr) => {
  return  (index + 1 >= arr.length ? 0 : arr[index + 1]) - item
});
