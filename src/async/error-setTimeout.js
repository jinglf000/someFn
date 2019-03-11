// setTimeout捕获错误

new Promise((resolve, reject) => {
  resolve(q * 3);
}).catch(err => {
  console.log(err);
});
// catch 能捕获错误吗？

new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(q * 3);
  }, 0);
}).catch(err => {
  console.log(err);
});
// catch 能捕获错误吗？ 2
