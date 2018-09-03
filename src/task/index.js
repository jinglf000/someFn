/**
 * 测试node eventLoop and browser eventLoop
 * browser EventLoop 为H5的标准，由浏览器Timer实现，不同浏览器的实现方式不一样，但是最终的结果是一样的
 * 都是按照H5的标准来的。
 * node eventLoop 是由 node的核心libuv库来实现的。
 */




/**
 * sleep some time,sync code
 * @param {Number} time need sleep time
 */
function sleep (time) {
  let startTime = new Date();
  while (new Date() - startTime < time) {}
  console.log('<---Next Loop--->');
}

setTimeout(() => {
  console.log('timeout 1');
  setTimeout(() => {
    console.log('timerout 3');
    sleep(1000);
  });

  new Promise((resolve) => {
    console.log('timeout1_promise');
    resolve();
  }).then(() => {
    console.log('timeout1_then');
  });

  sleep(1000);
});


setTimeout(() => {
  console.log('timeout 2');

  setTimeout(() => {
   console.log( 'timeout 4');
   sleep(1000);
  });

  new Promise(resolve => {
    console.log('timeout2_promise');
    resolve();
  }).then(() => {
    console.log('timeout2_then');
  })
  sleep(1000);
});

