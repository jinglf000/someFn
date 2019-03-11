var nes = new Promise((resolve, reject) => {
  setTimeout(() => {
    return resolve(222);
  }, 100);
}).then(a => {
  return Promise.reject(11);
});

var pro = new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      resolve(q);
    } catch (e) {
      reject(e);
    }
  }, 200);
}).catch(e => {});

function fnAll(arr) {
  return new Promise((resolve, reject) => {
    var arrs = [];
    var j = 0;
    for (let i = 0; i < arr.length; i++) {
      var ss = arr[i]
        .then(e => {
          // console.log(e);
          arrs[i] = e;
          j++;
          if (j == arr.length) {
            resolve(arrs);
          }
        })
        .catch(e => {
          reject(e);
        });
    }
    // console.log(arrs);
  });
}

fnAll([nes, pro])
  .then(([n, p]) => {
    console.log(n, p);
  })
  .catch(e => {
    console.log(e);
  });
