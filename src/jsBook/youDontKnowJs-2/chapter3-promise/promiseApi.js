/**
 * Promise Api
 * @author jinglf000
 * ###### Tue Mar 13 09:30:15 CST 2018
 */

const axios = require('axios');

// axios.defaults.proxy = {
//   host: '127.0.0.1',
//   port: 8888
// };

Promise.all(axios.get('http://www.baidu.com'))
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });

axios.get('https://www.google.com.hk').then(res => {
  console.log(res);
});

if (!Promise.first) {
  Promise.first = function(prs) {
    return new Promise((resolve, reject) => {
      prs.forEach(item => {
        Promise.resolve(item).then(data => {
          resolve(data);
        });
      });
    });
  };
}

if (!Promise.last) {
  Promise.last = function(prs) {
    let i = 0;
    return new Promise((resolve, reject) => {
      prs.forEach(item => {
        Promise.resolve(item).then(data => {
          i++;
          if (i == prs.length) {
            resolve(data);
          }
        });
      });
    });
  };
}
