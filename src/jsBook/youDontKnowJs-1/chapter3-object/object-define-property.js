/**
 * 对象属性的特性，属性描述符
 * @author jinglf000
 * ###### Fri Mar 2 16:29:07 CST 2018
 */

var obj = {
  a: 2,
  oo: {
    name: '小林子',
    age: 24
  }
};

// console.log(typeof Object.getOwnPropertyDescriptor(obj, 'oo'));
// 获取对象属性对应的特性，属性描述。只对对象本身的属性有效，原型上的属性无效，
// 原型上对应的应是：原型对象 ---> 原型对象的属性

var obj2 = {};

Object.defineProperty(obj2, 's', {
  value: 6,
  writable: false,
  configurable: true,
  enumerable: true
});

// console.log(obj2);
('use strict'); // 严格模式下，在浏览器里对只读属性进行赋值会报错 typeError

obj2.s = 8;

console.log(obj2);

// 不管是不是处于严格模式，尝试修改一个不可配置的属性描述符都会出错。
// 注意：如你所见，把 configurable 修改成false 是单向操作，无法撤销！
Object.defineProperty(obj2, 's', {}); // 同样还可以使用，defineProperty修改属性特性
