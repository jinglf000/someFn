let num = 0;


/**
 * node 中使用 process.nextTick 时会在本次执行栈stack结束之后执行，如果有嵌套循环
 * 也会执行，这也就意味着nextTick的回调发生在下一次的eventLoop之前执行，
 */
function goProcess() {
  process.nextTick(() => {
    console.log(num);
    if (num ++ < 10) {
      goProcess();
    }
  });
}
// test process and setTimeout
function processAndTimeout() {
  setTimeout(() => {
    console.log('timeout 1');
  }, 0);
  goProcess();
}

/*
 * setImmediate 会在当前的任务队列尾部添加
 *
 */
// test timeout and immediate
function timeoutAndImmediate() {
  setImmediate(() => {
    console.log(1);
    setImmediate(() => {
      console.log(2);
    });

  });

  setTimeout(() => {
    console.log(3);
  });

}

// timeoutAndImmediate();

function test() {
  setTimeout(() => {
    console.log ('setTimeout');
    process.nextTick(() => {
      console.log('nextTick1');
    });
  });

  console.log('main 1');

  function say() {
    console.log('hello!');
    process.nextTick(() => {
      console.log('nextTick2');
    });
  }

  new Promise((resolve) => {
    process.nextTick(() => {
      console.log('nextTick3');
    });
    console.log('Promise 1 ');
    resolve('promise then');
  }).then((data) => {
    console.log(data);
  });

  console.log('main 2');

  process.nextTick(() => {
    console.log('nextTick 4')
  });

  say();
}


test();
// mian 1
// Promise 1
// main 2
// hello
// nextTick3
// nextTick 4
// nextTick2
// promise then
// setTimeout
// nextTick1
