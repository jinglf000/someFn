try {
  s = q + 1;
} catch (e) {
  //console.log(e);
}

new Promise(resolve => {
  resolve(x + 2);
}).catch(s => {
  console.log(s);
});

try {
  setTimeout(() => {
    mm + 12;
  }, 0);
} catch (e) {
  console.log(e);
}
console.log(12);

function go() {
  console.log('go');
}

go(console.log('12'));
