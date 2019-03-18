/**
 * class 应用
 */

class Person {
  sayHello() {
    console.log('sayHello');
  }
  sayName() {
    console.log('sayName');
  }
}

const p = {
  sayHello: function() {
    console.log('sayHello');
  },
  sayName() {
    console.log('sayName');
  }
};

console.log(typeof Person); // 之所有是function 是沿用js原来的设计方式
// console.log(Person()); // 之所有不能够直接调用，则是因为新语法限制，class 只能new class 来调用
// 为了能够让ECMAscript 能够胜任大型项目，后续的语法不会再有原来js那个松散的特性了；会更严格；

function hello() {} // y原有的函数定义赋予了函数，对象、函数、类三种功能；而后续的class 则只有类这种功能；

console.log(new hello());
