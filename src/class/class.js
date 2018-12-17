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
  sayHello: function () {
    console.log('sayHello');
  },
  sayName() {
    console.log('sayName');
  }
}
