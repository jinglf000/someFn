/**
 * 你不知道的javascript代码笔记
 * @author jinlf000
 * ###### Fri Mar 2 15:18:08 CST 2018
 */

var str = 'name';
var yes = {
  tming: '12'
}

var obj = {
  age: 12,
  yes,
  say: function () {
    console.log('say hello~');
  },
  * _say() {
    console.log('_say Hello~');
  },
  async __say() {
    console.log('__say hello');
  },
  [str]: '这是obj的name属性呀',
  [true]: '最后obj也会有一个true的属性值',
  [0]: '同样也会有一个零的属性值',
  [{}]: '他也会有一个[object Object]的属性值',
  undefined: undefined,
  ttrruuee: true,
  null: null
}

// test1 测试1
function  test1() {
    console.log(obj);
    console.log(obj[{}.toString()]);
    console.log(obj['[object Object]']);
    /**
     * 对象的属性无论是用计算值得方式还是通过，字面量的方式，最终都是字符串
     */
}

// json 序列化不对undefined和function值进行序列化
// JSON.parse(JSON.stringify(obj)); 对象深克隆的一种方法，undefined和function无法克隆
// 
function test2 () {
  obj.__proto__.yesProto = 'yesProto0-0-0-0-0-0';
  var obj_copy = JSON.parse(JSON.stringify(obj));
  return  obj_copy.__proto__ === obj.__proto__;
}

// console.log(test2());// true



