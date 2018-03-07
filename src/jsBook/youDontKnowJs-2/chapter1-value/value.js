/**
 * javascript 中的值
 * @author jinglf000
 * ###### Wed Mar 7 10:39:04 CST 2018
 */

// 类数组对象
var obj = {
  0: 'javascript',
  1: 'hello',
  2: 'world',
  3: 'nihao',
  length: 4
};

var arr = [].slice.call(obj);
// var arr = Array.from(obj);

var arrUpper = arr.map(item => item[0].toUpperCase() + item.substr(1));

console.log(arrUpper.join(' '));

var str = 'fop';

var str_ = Array.prototype.map
  .call(str, (item, index) => {
    return index === str.length - 1 ? item : `${item}-`;
  })
  .join('');
console.log(str_);
