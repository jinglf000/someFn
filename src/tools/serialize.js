function serialize(obj) {
  var str = '';
  for (i in obj) {
    if (obj.hasOwnProperty(i)) {
      str += '&' + i + '=' + encodeURI(obj[i]);
    }
  }
  return str.substring(str.indexOf('&') + 1);
}

var obj = {
  name: '周雨林',
  age: '18',
  sex: 'girl'
};

obj.__proto__.job = 'FontEnd';

console.log(serialize(obj));
