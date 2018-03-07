/**
 * ES6 的类
 * @author jinglf000
 * ###### Mon Mar 5 17:50:14 CST 2018
 */

/**
 * class 类定义和原型的相互关联
 */
function classPrototypeFn() {
  class A {
    constructor(name) {
      this.name = name;
    }

    say() {
      console.log('this is class A instances function');
    }

    static hello() {
      console.log('this is a static function');
    }
  }

  const a = new A('小 a');
  console.group('classPrototypeFn');
  console.log(a.__proto__ === A.prototype); // true
  console.log(a.__proto__.constructor === A); // true
  console.log(typeof A); // function
  A.prototype.addFn = function() {
    console.log('this is a function add from A.prototype');
  };
  console.log(a.addFn === A.prototype.addFn); // true
  console.log(a instanceof A); // true
  console.log(Object.keys(a)); // ['name']
  console.log(a.hello); // undefined
  console.log(A.hello); // function hello

  for (let i in a) {
    console.log('a |-->', i);
  } // name addFn 通过class定义的原型方法时不可遍历的（默认），而通过 prototype是可以的
  console.log(Object.getOwnPropertyDescriptor(a, 'name'));
  console.groupEnd('classPrototypeFn');
}
// classPrototypeFn();
