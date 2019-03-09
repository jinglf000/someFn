var nes = new Promise((resolve, reject) => {
  setTimeout(() => {
    return resolve(222);
  }, 100);
}).then(a => {
  // console.log(a);
  return Promise.reject(11);
}); // resolved 222
// console.log(nes);
var pro = new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      resolve(q);
    } catch (e) {
      // console.log(e);
      reject(e);
    }
  }, 200);
}).catch(e => {
  // console.log(e);
}); // err

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
