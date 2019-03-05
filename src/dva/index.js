/**
 * dva 框架中
 * effect ==》 call put select 实现
 */
// call

// state
let state = {
  x: 'loading'
};

// reducers
const reducers = {
  q(state, { payload }) {
    return {
      ...state,
      ...payload
    };
  }
};

// effects 实现

/**
 * call的实现 实际执行函数
 * @param {Function} fn 函数 fn返回promise
 * @param {Object} params 函数需要的参数
 */
function callFn(fn, params) {
  return fn(params);
}

/**
 * put
 * dispatch的执行函数
 * @param {Reducer} param0 消息
 */
function putFn({ type, payload }) {
  state = reducers[type](state, { payload });
  return state;
}

/**
 * select 实现
 * @param {Function} fn 函数
 */
const selectFn = fn => fn(state);

// 异步延迟 promise
const delay = time =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve('done');
    }, time);
  });

/**
 * effect 中的函数
 */
function* helloWorld({ call, put, select }) {
  const q = yield select(s => s);
  console.log(q);
  const x = yield call(delay, 20);
  console.log(x);
  const y = yield put({ type: 'q', payload: { x } });
  console.log(y);
}

// go
const genera = helloWorld({ call: callFn, put: putFn, select: selectFn }); // 输入生成generator

// execute

// 执行器
function go(ge) {
  const result = ge.next();
  inner(result);

  function inner(res) {
    if (res.done) return;
    if (res.value instanceof Promise) {
      res.value.then(res => {
        inner(genera.next(res));
      });
    } else {
      inner(genera.next(res.value));
    }
  }
}
go(genera);

// 测试 state的请更改情况
setTimeout(() => {
  console.log(state);
}, 500);
