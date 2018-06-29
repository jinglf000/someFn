const async = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

const async2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 1010);
});

async.then((res) => {
  console.log(res);
  return 'async1'
}).finally((q) => {
  console.log(q);
});

async2.then((res) => {
  console.log(res);
  return 'async2'
}).finally((q) => {
  console.log(q);
});
