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
