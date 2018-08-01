/**
 * underscore throttle实现分析
 * 适用于 mouseon scrollmove 等情况
 * 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      传入函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始边界上的调用，传入{leading: false}。
 *                                如果想忽略结尾边界上的调用，传入{trailing: false}
 * @return {function}             返回客户调用函数
 */
throttle = function(func, wait, options) {
  var context, args, result;
  var timeout = null;
  // 上次执行时间点，options选项配置处理
  var previous = 0;
  if (!options) options = {};
  // 延迟执行函数
  // 真正的执行器
  var later = function() {
    // 若设定了开始边界不执行选项，上次执行时间始终为0
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    // 手动设置为null 去除引用，回收内存
    if (!timeout) context = args = null;
  };
  // 返回的要执行的函数
  return function() {
    var now = Date.now();
    // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
    if (!previous && options.leading === false) previous = now;
    // 延迟执行时间间隔
    var remaining = wait - (now - previous);
    // 执行环境控制，包括this 和 arguments 参数
    context = this;
    args = arguments;
    // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
    // remaining大于时间窗口wait，表示客户端系统时间被调整过
    // 首次执行控制,setTimeout 设置时无法首次执行
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    //如果延迟执行不存在，且没有设定结尾边界不执行选项
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

function log () {
  console.log('延迟执行', Date.now());
}

var timer = setInterval(throttle(log, 500), 20);
//
console.log(1532502088200 - 1532502088144);
