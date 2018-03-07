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


console.log(bmw.constructor === Car); // true 同时通过__proto__链，bwm的constructor为Car
// 其等价于一下实现

/** 
 * class 扩展的实现
 */
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

/**
 * class 继承的prototype的实现 
 */
function classAchive() {
  // 一种ES6的class extends的实现
  function Foo(name) {
    this.name = name;
  }

  Foo.prototype.myName = function () {
    return this.name;
  }

  function Bar(name, label) {
    Foo.call(this, name); // 类似于super 把父类的构造函数中的属性赋予子类
    this.label = label;
  }

  Bar.prototype = Object.create(Foo.prototype); // 关联__proto__
  Bar.prototype.constructor = Bar; // 重新恢复constructor
  Bar.prototype.myLabel = function () {
    return this.label;
  }
  // 想要关联两个对象,可以通过Object.create 或者 Object.setPrototypeOf(source, target)(后面的为ES6的方法)
  var a = new Bar('a', 'obj a');
}

// Proxy 在 ES6 中有一个被称为“代理”（Proxy）的高端功能，它实现的就是“方法无法找到”时的行为。
// 代理超出了本书的讨论范围，但是在本系列之后的书中会介绍。javascript 设计模式类似于委托 设计模式
// bmw实例的方法是由类的构造函数所决定的，而在bmw对象上查找属性或者方法引用时，会首先在对象本身上进行查找
// 如果找不到的话，引擎就会在[[prototype]]关联对象上进行查找，同理，果在后者中也没有找到需要的引用就会继续查找它的
// [[Prototype]] ，以此类推。这一系列对象的链接被称为“原型链”。原理是其：会现在bwm对象本身查找属性，其次是bmw.__proto__
// 在后来就是bmw.__proto__.__proto__ ... 其中 bmw.__proto__ === bmw.prototype
// JavaScript 中这个机制的本质就是对象之间的关联关系。
