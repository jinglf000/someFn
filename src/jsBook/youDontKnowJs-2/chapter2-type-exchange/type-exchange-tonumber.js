/**
 * toNumber 类型转换
 * @author jinglf000
 * ###### Thu Mar 8 11:03:48 CST 2018
 */
// 类型转换分为 显式类型转换和隐式类型转换

var obj = {
  name: 'zhoulin'
};

function test1() {
  obj.valueOf = function() {
    console.log('类型转换时，调用了obj的 valueOf方法');
    return '545566';
  };

  obj.toString = function() {
    console.log('类型转换时，调用了obj 的toString方法');
    return '23';
  };

  console.log(Number(obj)); // 显式转换Obj 为数字
  //类型转换时，调用了obj的 valueOf方法
  // 转换为 545566
}

function test2() {
  obj.valueOf = function() {
    console.log('类型转换时，调用了obj的 valueOf方法');
    return { haha: 'jaj' };
  };
  obj.toString = function() {
    console.log('类型转换时，调用了obj 的toString方法');
    return '23';
  };
  console.log(Number(obj));
  // 类型转换时，调用了obj的 valueOf方法
  // 类型转换时，调用了obj 的toString方法
  // 23
}

function test3() {
  obj = [2, 3, 4];
  obj.valueOf = function() {
    console.log('类型转换时，调用了obj的 valueOf方法');
    return { haha: 'jaj' };
  };
  obj.toString = function() {
    console.log('类型转换时，调用了obj 的toString方法');
    return '23';
  };
  console.log(obj - 6);
  // 隐式类型转换同样，也是调用了valueOf 方法和toString方法
  // 类型转换时，调用了obj的 valueOf方法
  // 类型转换时，调用了obj 的toString方法
  // 17
}
test3();

[1, 2, 3, 4].reduce((prev, item, index) => {
  console.log(prev, item, index);
});
