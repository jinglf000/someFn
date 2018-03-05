/**
 * 类
 * @author jinglf000
 * ###### Sun Mar 4 21:45:56 CST 2018
 */

/**
 * 运输类，包含运输类的方法和属性
 */
class Vehicle {
  constructor(type) {
    this.type = type;
  }

  run() {
    console.log('A Vehicle instance is an mechine , that can run');
  }

  static info() {
    console.log(' 这是 Vehicle的静态方法');
  }
}

Vehicle.version = '这是Vehicle的version属性';

/**
 * Car 类继承自Vehicle，定义汽车类
 */
class Car extends Vehicle {
  constructor(type, brand) {
    super(type);
    this.brand = brand;
  }
  // 定义静态方法
  static comfortable() {
    console.log('the car comfortable is middle');
  }

  speed() {
    console.log('Car speed between 0Km/h ~ 180Km/h');
  }

  capacity() {
    console.log('Car capacity is 2m2 ~ 6m2');
  }
}

Car.needOil = true;

var bmw = new Car('coupe', 'bwm');
var dazhong = new Car('coup', 'dazhong');
// console.log(Object.getPrototypeOf(bmw) === Car); // false
// console.log(Object.getPrototypeOf(bmw) === Vehicle); // false呼应了ES6继承的实质

// 这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。
// 所以在子类的constructor中一定要调用super

// es6的class是原有的prototype原型继承的语法糖，因此class中定义的方法，对应了其原型上的方法

console.log(bmw);

// 第一层继承，Car作为构造函数继承；Car子类的原型（prototype）对象是父类原型（prototype）对象的实例
// 子类实例继承了子类的原型的方法，同时也继承了父类原型的方法
console.log(bmw.__proto__ === Car.prototype); // true
console.log(bmw.__proto__.__proto__ === Vehicle.prototype); // true

// 第二层继承，Car作为对象，子类的(__proto__)是父类，如果Car对象是造出来的话，Vehicle为原型
// 子类作为对象使用时，起原型就为父类，即子类可以使用父类的静态方法和属性
console.log(Car.__proto__ === Vehicle); // true

// 其等价于一下实现

function classExtendsInstance() {
  class A {}
  class B {}

  // 实例的继承
  Object.setPrototypeOf(B.prototype, A.prototype); // B.prototype.__proto__ === A.prototype

  // 对象的继承，B继承A的静态属性
  Object.setPrototypeOf(B, A); // B.__proto__ === A

  const b = new B();

  //const x = Object.create(A);
  // x.__proto__ === A
}
